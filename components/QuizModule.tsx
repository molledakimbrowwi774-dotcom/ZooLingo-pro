import React, { useState, useRef, useEffect } from 'react';
import { FlashcardData, WordData } from '../types';
import { getRandomGlobalWords } from '../utils/dictionary';
import { ArrowPathIcon, CheckCircleIcon, XCircleIcon, FaceSmileIcon, FaceFrownIcon, FireIcon } from '@heroicons/react/24/solid';
import { LionCool, OwlDr, RabbitGirl } from './AnimalIcons';
// @ts-ignore
import confetti from 'canvas-confetti';

interface QuizModuleProps {
  savedVocab: FlashcardData[];
  onAddMistake: (word: WordData) => void;
  // New props for Mistake Blitz mode
  customSource?: FlashcardData[]; 
  onRemoveFromMistakes?: (id: string) => void;
  modeName?: string; // e.g. "Mistake Blitz" or "Pop Quiz"
}

interface Question {
  target: WordData;
  options: WordData[];
  correctIndex: number;
  mode: 'EN_TO_ZH' | 'ZH_TO_EN';
}

const QuizModule: React.FC<QuizModuleProps> = ({ 
  savedVocab, 
  onAddMistake, 
  customSource,
  onRemoveFromMistakes,
  modeName = "Pop Quiz"
}) => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'finished'>('intro');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Auto-start if custom source provided (Mistake Blitz mode)
  useEffect(() => {
    if (customSource && customSource.length > 0 && gameState === 'intro') {
        // Optional: auto-start or just let user click start with specific text
    }
  }, [customSource]);

  const playSound = (type: 'correct' | 'wrong') => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    if (type === 'correct') {
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.5);
    } else {
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(150, ctx.currentTime);
      oscillator.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.3);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#38BDF8', '#818CF8', '#34D399', '#F472B6'] // Updated confetti colors
    });
  };

  const generateQuiz = () => {
    let targets: WordData[] = [];
    const isMistakeMode = !!customSource;

    // 1. Determine Target Pool
    if (isMistakeMode && customSource) {
        // Use all mistakes (shuffled) up to 20
        targets = [...customSource].sort(() => Math.random() - 0.5).slice(0, 20);
    } else {
        // Standard Mode
        targets = [...savedVocab];
        if (targets.length < 20) {
            const needed = 20 - targets.length;
            const fillers = getRandomGlobalWords(needed);
            targets = [...targets, ...fillers];
        }
        // Limit to 10 questions for standard mode
        targets = targets.sort(() => Math.random() - 0.5).slice(0, 10);
    }

    if (targets.length === 0) return; // Should not happen

    // 2. Generate Questions
    const newQuestions: Question[] = [];
    
    // For distractors, we need a pool. 
    // If in mistake mode, try to use other mistakes as distractors, or fall back to global
    const distractorPool = isMistakeMode 
        ? (customSource!.length > 5 ? customSource! : getRandomGlobalWords(20)) 
        : (savedVocab.length > 5 ? savedVocab : getRandomGlobalWords(20));

    // Ensure distractor pool has enough items
    const fallbackPool = getRandomGlobalWords(20);

    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      const distractors: WordData[] = [];
      const usedIds = new Set([target.id]);
      
      let attempts = 0;
      while (distractors.length < 3 && attempts < 50) {
        attempts++;
        // Try distractor pool first, then fallback
        const poolToUse = Math.random() > 0.5 ? distractorPool : fallbackPool;
        const rand = poolToUse[Math.floor(Math.random() * poolToUse.length)];
        
        // Avoid duplicate words (checking english text)
        if (rand.english !== target.english && !distractors.some(d => d.english === rand.english)) {
            distractors.push(rand);
        }
      }

      // Random Mode
      const mode = Math.random() > 0.5 ? 'EN_TO_ZH' : 'ZH_TO_EN';

      // Assemble Options
      const options = [...distractors];
      const correctPos = Math.floor(Math.random() * 4);
      options.splice(correctPos, 0, target);

      newQuestions.push({ target, options, correctIndex: correctPos, mode });
    }

    setQuestions(newQuestions);
    setGameState('playing');
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setFeedback(null);
  };

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; 

    const currentQ = questions[currentIndex];
    const correct = index === currentQ.correctIndex;

    setSelectedOption(index);
    
    if (correct) {
      setScore(s => s + 1);
      playSound('correct');
      setFeedback('correct');
      triggerConfetti();
      
      // MISTAKE BLITZ LOGIC: If we are in custom source mode, getting it right removes it!
      if (customSource && onRemoveFromMistakes) {
          onRemoveFromMistakes(currentQ.target.id);
      }
    } else {
      playSound('wrong');
      setFeedback('wrong');
      onAddMistake(currentQ.target);
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(c => c + 1);
        setSelectedOption(null);
      } else {
        setGameState('finished');
      }
    }, 1500);
  };

  // --- RENDER HELPERS ---

  if (gameState === 'intro') {
    const isMistakeMode = !!customSource;
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fadeIn">
        <div className={`w-40 h-40 mb-6 rounded-full flex items-center justify-center p-4 shadow-inner ${isMistakeMode ? 'bg-rose-100' : 'bg-sky-100'}`}>
          {isMistakeMode ? (
              <FireIcon className="w-24 h-24 text-rose-500 animate-pulse" />
          ) : (
              <OwlDr className="w-full h-full drop-shadow-md" />
          )}
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-2">{modeName}</h2>
        <p className="text-slate-500 mb-8 max-w-xs mx-auto">
          {isMistakeMode 
            ? `Ready to crush ${customSource?.length} mistakes? Get them right to clear them!` 
            : "Test your memory. We'll use your saved words first, then mix in some new ones!"}
        </p>
        <button
          onClick={generateQuiz}
          className={`${isMistakeMode ? 'bg-rose-500 hover:bg-rose-600' : 'bg-sky-500 hover:bg-sky-600'} text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-sky-200 transform transition-all active:scale-95 text-lg flex items-center gap-2`}
        >
          {isMistakeMode ? <FireIcon className="w-6 h-6" /> : <CheckCircleIcon className="w-6 h-6" />}
          {isMistakeMode ? "Start Blitz" : "Start 10 Questions"}
        </button>
      </div>
    );
  }

  if (gameState === 'finished') {
    const total = questions.length;
    const isGoodScore = score >= (total * 0.7);
    if (isGoodScore) setTimeout(triggerConfetti, 300);

    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fadeIn">
        <div className={`w-40 h-40 mb-6 rounded-full flex items-center justify-center p-4 shadow-inner ${isGoodScore ? 'bg-violet-100' : 'bg-slate-100'}`}>
          {isGoodScore ? (
            <LionCool className="w-full h-full animate-bounce" />
          ) : (
            <RabbitGirl className="w-full h-full" />
          )}
        </div>
        <h2 className="text-4xl font-black text-slate-800 mb-2">{score} / {total}</h2>
        <p className="text-lg font-bold text-slate-600 mb-8">
          {isGoodScore ? 'Amazing Job! 🌟' : 'Keep Practicing! 💪'}
        </p>
        <button
          onClick={() => setGameState('intro')}
          className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-sky-200 transform transition-all active:scale-95 flex items-center gap-2"
        >
          <ArrowPathIcon className="w-5 h-5" />
          Play Again
        </button>
      </div>
    );
  }

  // PLAYING STATE
  const q = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;
  const isMistakeMode = !!customSource;

  return (
    <div className="max-w-md mx-auto h-full flex flex-col animate-fadeIn relative">
      
      {/* FEEDBACK OVERLAYS */}
      {feedback === 'correct' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="animate-pop-in bg-green-500/90 backdrop-blur-sm text-white rounded-3xl p-8 flex flex-col items-center shadow-2xl scale-110">
            <FaceSmileIcon className="w-24 h-24 mb-2 text-yellow-300 drop-shadow-md" />
            <span className="text-4xl font-black tracking-wider drop-shadow-md">
                {isMistakeMode ? "Cleared! 🔥" : "Great!"}
            </span>
          </div>
        </div>
      )}

      {feedback === 'wrong' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="animate-shake bg-rose-500/90 backdrop-blur-sm text-white rounded-3xl p-8 flex flex-col items-center shadow-2xl">
            <FaceFrownIcon className="w-24 h-24 mb-2 text-white drop-shadow-md" />
            <span className="text-3xl font-black tracking-wider drop-shadow-md">Oops!</span>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6">
        <div 
          className={`${isMistakeMode ? 'bg-rose-500' : 'bg-sky-500'} h-2.5 rounded-full transition-all duration-300`} 
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div className="text-center mb-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Question {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-sky-100 p-8 mb-8 text-center border-b-4 border-sky-100 flex items-center justify-center min-h-[160px]">
        <h3 className="text-3xl font-black text-slate-800 break-words">
          {q.mode === 'EN_TO_ZH' ? q.target.english : q.target.chinese}
        </h3>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 gap-3">
        {q.options.map((opt, idx) => {
          let btnClass = "bg-white border-2 border-slate-100 hover:border-sky-200 text-slate-700"; // Default
          
          if (selectedOption !== null) {
            if (idx === q.correctIndex) {
              btnClass = "bg-green-500 border-green-600 text-white shadow-md transform scale-105"; 
            } else if (idx === selectedOption && idx !== q.correctIndex) {
              btnClass = "bg-rose-500 border-rose-600 text-white opacity-80"; 
            } else {
              btnClass = "bg-slate-50 text-slate-400 opacity-50"; 
            }
          }

          return (
            <button
              key={idx}
              disabled={selectedOption !== null}
              onClick={() => handleOptionClick(idx)}
              className={`p-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-sm ${btnClass}`}
            >
              {q.mode === 'EN_TO_ZH' ? opt.chinese : opt.english}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizModule;
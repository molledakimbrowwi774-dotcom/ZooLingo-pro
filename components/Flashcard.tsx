import React, { useState, useEffect } from 'react';
import { FlashcardData } from '../types';
import { SpeakerWaveIcon, HeartIcon, MicrophoneIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { AnimalIcons } from './AnimalIcons';

interface FlashcardProps {
  data: FlashcardData;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ data, isSaved, onToggleSave }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [matchStatus, setMatchStatus] = useState<'idle' | 'success' | 'fail'>('idle');

  // Reset states when data changes
  useEffect(() => {
    setMatchStatus('idle');
    setIsListening(false);
    setIsFlipped(false);
  }, [data.id]);

  const playAudio = (text: string, accent: 'US' | 'UK') => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;

    if (accent === 'US') {
      utterance.lang = 'en-US';
      selectedVoice = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || voices.find(v => v.lang === 'en-US');
    } else {
      utterance.lang = 'en-GB';
      selectedVoice = voices.find(v => v.lang === 'en-GB' && v.name.includes('Google')) || voices.find(v => v.lang === 'en-GB');
    }

    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = 0.9; 
    window.speechSynthesis.speak(utterance);
  };

  // --- SPEECH RECOGNITION LOGIC ---
  const handleListen = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Browser does not support speech recognition.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    setMatchStatus('idle');

    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const target = data.english.toLowerCase();
      
      // Simple fuzzy match check
      if (transcript.includes(target) || target.includes(transcript)) {
        setMatchStatus('success');
        // Play a happy sound effect purely via code if wanted, or just rely on visual
      } else {
        setMatchStatus('fail');
        console.log(`Heard: ${transcript}, Expected: ${target}`);
      }
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech error", event.error);
      setIsListening(false);
      setMatchStatus('fail');
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const handleFlip = () => {
    // Don't flip if interacting with buttons
    setIsFlipped(!isFlipped);
  };

  const IconComponent = AnimalIcons[data.iconId] || AnimalIcons['lion_cool'];

  // Dynamic Styles based on pronunciation result
  let borderClass = "border-white";
  let ringClass = "";
  
  if (matchStatus === 'success') {
    borderClass = "border-green-400";
    ringClass = "ring-4 ring-green-200";
  } else if (matchStatus === 'fail') {
    borderClass = "border-red-400";
    ringClass = "animate-shake"; // Reuse the shake animation from CSS
  } else if (isListening) {
    borderClass = "border-blue-400";
    ringClass = "ring-4 ring-blue-200 animate-pulse";
  }

  return (
    <div 
      className="group h-96 w-full [perspective:1000px] cursor-pointer"
      onClick={handleFlip}
    >
      <div className={`relative h-full w-full transition-all duration-500 card-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRONT SIDE */}
        <div className={`absolute inset-0 h-full w-full rounded-3xl shadow-xl card-back-hidden flex flex-col items-center justify-center border-4 overflow-hidden ${data.bgColor} ${borderClass} ${ringClass} transition-all duration-300`}>
          
          <div className="relative w-48 h-48 mb-4 flex items-center justify-center p-2">
             <IconComponent className="w-full h-full drop-shadow-md" />
          </div>

          <div className="font-bold text-gray-600 text-lg uppercase tracking-wider bg-white/50 px-4 py-1 rounded-full backdrop-blur-sm z-10 mb-4">
             {matchStatus === 'success' ? 'Perfect! 🎉' : 'Tap to Flip'}
          </div>

          {/* Pronunciation Button (Front only) */}
          <button
            onClick={handleListen}
            className={`absolute bottom-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 z-20 ${
               isListening ? 'bg-blue-500 text-white' : 
               matchStatus === 'success' ? 'bg-green-500 text-white' :
               matchStatus === 'fail' ? 'bg-red-500 text-white' :
               'bg-white text-blue-500 hover:bg-blue-50'
            }`}
          >
             <MicrophoneIcon className={`w-8 h-8 ${isListening ? 'animate-pulse' : ''}`} />
          </button>

          <div className="absolute top-4 right-4 text-white/80 font-bold text-6xl opacity-20 select-none">?</div>
        </div>

        {/* BACK SIDE */}
        <div className={`absolute inset-0 h-full w-full rounded-3xl shadow-xl card-back-hidden rotate-y-180 bg-white border-4 border-slate-200 flex flex-col p-4 overflow-y-auto overflow-x-hidden`}
             onClick={(e) => e.stopPropagation()} 
        >
          {/* Header: Type and Save */}
          <div className="flex justify-between items-start mb-1">
             <span className="text-xs font-bold uppercase text-sky-500 bg-sky-50 px-2 py-1 rounded-md">
                {data.type}
             </span>
             <button 
                onClick={() => onToggleSave(data.id)}
                className="p-1 rounded-full hover:bg-pink-50 transition-colors"
             >
                {isSaved ? <HeartIcon className="w-6 h-6 text-pink-500" /> : <HeartOutline className="w-6 h-6 text-slate-300" />}
             </button>
          </div>

          {/* Main Word */}
          <div className="text-center mb-2">
            <h3 className="text-2xl font-extrabold text-slate-800 break-words leading-tight">{data.english}</h3>
            <p className="text-lg text-slate-500 font-medium mt-1">{data.chinese}</p>
          </div>

          {/* Pronunciation */}
          <div className="bg-slate-50 rounded-xl p-2 mb-2 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-blue-500 w-4">US</span>
                <span className="text-xs font-mono text-slate-600">/{data.us_ipa}/</span>
              </div>
              <button 
                onClick={() => playAudio(data.english, 'US')}
                className="p-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 active:scale-95 transition-transform"
              >
                <SpeakerWaveIcon className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-red-500 w-4">UK</span>
                <span className="text-xs font-mono text-slate-600">/{data.uk_ipa}/</span>
              </div>
              <button 
                onClick={() => playAudio(data.english, 'UK')}
                className="p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 active:scale-95 transition-transform"
              >
                <SpeakerWaveIcon className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Examples */}
          <div className="mt-auto space-y-2">
             {data.examples.map((ex, idx) => (
               <div key={idx} className="bg-sky-50 p-2 rounded-lg border border-sky-100">
                  <div className="flex justify-between items-start">
                    <p className="text-xs text-slate-700 font-medium leading-snug">{ex.en}</p>
                    <button 
                      onClick={() => playAudio(ex.en, 'US')}
                      className="ml-1 text-sky-400 hover:text-sky-600 shrink-0"
                    >
                      <SpeakerWaveIcon className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{ex.zh}</p>
               </div>
             ))}
          </div>
          
          <button 
            onClick={handleFlip} 
            className="mt-2 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg text-xs font-bold"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
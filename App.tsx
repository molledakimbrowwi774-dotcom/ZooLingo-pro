import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Flashcard from './components/Flashcard';
import VocabularyItem from './components/VocabularyItem';
import QuizModule from './components/QuizModule';
import { generateVocabulary } from './services/geminiService';
import { FlashcardData, Tab, WordData } from './types';
import { getRandomElement, PASTEL_COLORS, ANIMAL_ICON_IDS } from './utils/uiUtils';
import { getScenarioSuggestions } from './utils/dictionary';
import { MagnifyingGlassIcon, ArrowPathIcon, FaceFrownIcon, ExclamationTriangleIcon, HeartIcon, FireIcon } from '@heroicons/react/24/outline';
import { LionDirector, GiraffeReporter, MonkeyMechanic } from './components/AnimalIcons';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('learn');
  const [sceneInput, setSceneInput] = useState('');
  const [suggestions, setSuggestions] = useState<{ key: string, label: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentScene, setCurrentScene] = useState('');
  
  // State for the generated cards
  const [generatedCards, setGeneratedCards] = useState<FlashcardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for saved vocabulary (persisted in localStorage)
  const [savedVocab, setSavedVocab] = useState<FlashcardData[]>([]);
  // State for mistake vocabulary (persisted in localStorage)
  const [mistakeVocab, setMistakeVocab] = useState<FlashcardData[]>([]);

  // QUIZ STATE
  const [quizMode, setQuizMode] = useState<'normal' | 'mistake'>('normal');

  // Load data on mount
  useEffect(() => {
    const saved = localStorage.getItem('zoolingo_vocab');
    if (saved) setSavedVocab(JSON.parse(saved));
    
    const mistakes = localStorage.getItem('zoolingo_mistakes');
    if (mistakes) setMistakeVocab(JSON.parse(mistakes));
  }, []);

  // Persist data
  useEffect(() => {
    localStorage.setItem('zoolingo_vocab', JSON.stringify(savedVocab));
  }, [savedVocab]);

  useEffect(() => {
    localStorage.setItem('zoolingo_mistakes', JSON.stringify(mistakeVocab));
  }, [mistakeVocab]);

  // Handle Search Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSceneInput(val);
    
    if (val.trim().length > 0) {
      const sugs = getScenarioSuggestions(val);
      setSuggestions(sugs);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (key: string, label: string) => {
    // Show the friendly label (e.g., "🏥 健康 / Health") in input, but generate using key
    setSceneInput(label.split('/')[0].trim()); 
    setShowSuggestions(false);
    handleGenerate(key); // Use the internal key to search
  };

  const handleGenerate = async (sceneToUse: string = sceneInput) => {
    if (!sceneToUse.trim()) return;
    
    // Close suggestions
    setShowSuggestions(false);

    setIsLoading(true);
    setError(null);
    setCurrentScene(sceneToUse);
    // Switch to Learn tab if not already
    setActiveTab('learn');

    try {
      const words: WordData[] = await generateVocabulary(sceneToUse);
      
      // Enhance words with UI data (icons, colors)
      const flashcards: FlashcardData[] = words.map((word) => {
        const iconId = getRandomElement(ANIMAL_ICON_IDS);
        return {
          ...word,
          iconId,
          bgColor: getRandomElement(PASTEL_COLORS),
          isFlipped: false
        };
      });

      setGeneratedCards(flashcards);
    } catch (err) {
      setError("Oops! My animal friends couldn't find words for that. Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleSave = (card: FlashcardData) => {
    const isAlreadySaved = savedVocab.some(item => item.english === card.english);
    if (isAlreadySaved) {
      setSavedVocab(prev => prev.filter(item => item.english !== card.english));
    } else {
      setSavedVocab(prev => [card, ...prev]);
    }
  };

  const handleAddMistake = (word: WordData) => {
    setMistakeVocab(prev => {
      // Prevent duplicates in mistake notebook based on English text
      if (prev.some(item => item.english === word.english)) return prev;

      // Ensure it has flashcard properties if it came from raw dictionary
      const isFlashcard = (w: any): w is FlashcardData => w.iconId !== undefined;
      
      let newMistake: FlashcardData;
      if (isFlashcard(word)) {
        newMistake = word;
      } else {
        newMistake = {
          ...word,
          iconId: getRandomElement(ANIMAL_ICON_IDS),
          bgColor: getRandomElement(PASTEL_COLORS),
          isFlipped: false
        };
      }
      
      return [newMistake, ...prev];
    });
  };

  const handleRemoveFromVocab = (id: string) => {
    setSavedVocab(prev => prev.filter(item => item.id !== id));
  };

  const handleRemoveFromMistakes = (id: string) => {
    setMistakeVocab(prev => prev.filter(item => item.id !== id));
  };

  // Switch to Quiz tab and enable Mistake Mode
  const startMistakeBlitz = () => {
    setQuizMode('mistake');
    setActiveTab('quiz');
  };

  // Logic for the "Home/Back" button
  const handleGoHome = () => {
    setActiveTab('learn');
    setGeneratedCards([]);
    setCurrentScene('');
    setSceneInput('');
    setSuggestions([]);
    setIsLoading(false);
    setError(null);
  };

  const isCardSaved = (id: string) => savedVocab.some(item => item.id === id);

  // Determine if Home button should be shown
  const showHomeButton = activeTab === 'vocab' || activeTab === 'quiz' || (activeTab === 'learn' && generatedCards.length > 0);

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={(tab) => {
        // Reset quiz mode to normal when manually switching tabs
        if(tab === 'quiz') setQuizMode('normal');
        setActiveTab(tab);
      }}
      showHomeButton={showHomeButton}
      onGoHome={handleGoHome}
    >
      
      {/* --- LEARN TAB CONTENT --- */}
      {activeTab === 'learn' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* ZOO HERO SECTION - Only show when no cards generated */}
          {generatedCards.length === 0 && !isLoading && (
            <div className="relative mb-6 text-center">
              {/* Characters Container */}
              <div className="flex justify-center items-end gap-2 -mb-6 relative z-10">
                 <div className="w-20 h-20 animate-float-delayed transform translate-y-2">
                    <GiraffeReporter className="w-full h-full drop-shadow-lg" />
                 </div>
                 <div className="w-32 h-32 animate-float relative z-20">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md whitespace-nowrap border-2 border-sky-200">
                        <span className="text-xs font-bold text-sky-600">雅思 7.0+ 词汇库 🦁</span>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r-2 border-b-2 border-sky-200"></div>
                    </div>
                    <LionDirector className="w-full h-full drop-shadow-2xl" />
                 </div>
                 <div className="w-20 h-20 animate-float-delayed transform translate-y-2">
                    <MonkeyMechanic className="w-full h-full drop-shadow-lg" />
                 </div>
              </div>

              {/* Input Card */}
              <div className="bg-white/90 backdrop-blur-sm p-6 pt-10 rounded-[2rem] shadow-xl border-4 border-sky-100 relative z-0 mt-4">
                <h2 className="text-2xl font-black text-slate-700 mb-1">Welcome to ZooLingo!</h2>
                <p className="text-slate-500 mb-6 text-sm">狮子园长为你准备了 65 个高级场景。</p>

                <label className="block text-slate-400 text-xs font-bold mb-2 ml-1 text-left uppercase tracking-wider">
                  想去哪里探险？ (输入中文场景)
                </label>
                <div className="flex gap-2 relative z-20">
                  <input
                    type="text"
                    value={sceneInput}
                    onChange={handleInputChange}
                    onFocus={() => { if(suggestions.length > 0) setShowSuggestions(true); }}
                    onBlur={() => { setTimeout(() => setShowSuggestions(false), 200); }} 
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    placeholder="例如：医院、科技、面试..."
                    className="flex-1 bg-slate-50 border-2 border-slate-200 text-slate-700 text-lg rounded-2xl focus:ring-4 focus:ring-sky-100 focus:border-sky-300 block w-full p-4 outline-none transition-all placeholder-slate-300"
                    autoComplete="off"
                  />
                  <button
                    onClick={() => handleGenerate()}
                    disabled={isLoading || !sceneInput}
                    className="bg-sky-400 hover:bg-sky-500 disabled:opacity-50 text-white font-bold rounded-2xl px-6 transition-colors shadow-lg shadow-sky-200 flex items-center justify-center transform active:scale-95"
                  >
                    <MagnifyingGlassIcon className="w-8 h-8" />
                  </button>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute left-6 right-6 top-[calc(100%-10px)] bg-white border-2 border-sky-50 rounded-b-2xl shadow-xl z-30 overflow-hidden pt-4 max-h-60 overflow-y-auto">
                    <ul>
                      {suggestions.map((sug) => (
                        <li 
                          key={sug.key}
                          onClick={() => handleSuggestionClick(sug.key, sug.label)}
                          className="px-4 py-3 hover:bg-sky-50 cursor-pointer text-slate-600 font-medium border-b border-slate-50 last:border-0 flex items-center justify-between"
                        >
                          <span>{sug.label}</span>
                          <ArrowPathIcon className="w-4 h-4 text-sky-300" />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                   <span 
                     onClick={() => handleGenerate('environment')}
                     className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full border border-green-200 font-bold cursor-pointer hover:bg-green-200 transition-colors"
                   >
                     🌳 环境 Environment
                   </span>
                   <span 
                     onClick={() => handleGenerate('technology')}
                     className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full border border-blue-200 font-bold cursor-pointer hover:bg-blue-200 transition-colors"
                   >
                     💻 科技 Technology
                   </span>
                   <span 
                     onClick={() => handleGenerate('education')}
                     className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full border border-purple-200 font-bold cursor-pointer hover:bg-purple-200 transition-colors"
                   >
                     🎓 教育 Education
                   </span>
                </div>
              </div>
            </div>
          )}

          {/* Results Area */}
          <div>
            {isLoading && (
               <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <div className="w-32 h-32 mb-4 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-sky-100 rounded-full animate-ping opacity-30"></div>
                    <LionDirector className="w-full h-full animate-bounce" />
                  </div>
                  <p className="text-lg font-bold text-sky-400">正在查阅档案...</p>
                  <p className="text-xs text-sky-300">Fetching Band 7.0 Vocabulary</p>
               </div>
            )}

            {!isLoading && error && (
               <div className="flex flex-col items-center justify-center py-20 text-rose-400">
                  <FaceFrownIcon className="w-16 h-16 mb-2" />
                  <p className="text-center px-6">{error}</p>
               </div>
            )}

            {!isLoading && !error && generatedCards.length > 0 && (
              <>
                <div className="flex justify-between items-center mb-6 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white">
                  <h2 className="text-2xl font-black text-slate-700">
                    <span className="text-sky-400 mr-2">#</span>
                    {currentScene}
                  </h2>
                  <button
                    onClick={() => handleGenerate(currentScene)}
                    className="flex items-center gap-2 text-sm font-bold text-sky-600 bg-sky-100 px-4 py-2 rounded-full hover:bg-sky-200 shadow-sm transition-all"
                  >
                    <ArrowPathIcon className="w-4 h-4" />
                    换一批 (Refresh)
                  </button>
                </div>

                {/* 3x3 Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {generatedCards.map((card) => (
                    <Flashcard
                      key={card.id}
                      data={card}
                      isSaved={isCardSaved(card.id)}
                      onToggleSave={() => handleToggleSave(card)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* --- VOCABULARY TAB CONTENT --- */}
      {activeTab === 'vocab' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="bg-white p-6 rounded-3xl shadow-lg shadow-violet-100 border-b-4 border-violet-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 opacity-10 transform translate-x-8 -translate-y-8">
                <LionDirector className="w-full h-full" />
             </div>
             <h2 className="text-3xl font-black text-slate-800 text-center tracking-tight">Vocabulary Notebook</h2>
             <p className="text-center text-slate-400 text-xs mt-1">Review your collection</p>
          </div>

          {/* SECTION 1: MISTAKES (Priority) */}
          {mistakeVocab.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2 px-2">
                <div className="flex items-center gap-2">
                    <ExclamationTriangleIcon className="w-6 h-6 text-rose-500" />
                    <h3 className="text-xl font-bold text-slate-700">Practice Needed ({mistakeVocab.length})</h3>
                </div>
                {/* MISTAKE BLITZ BUTTON */}
                <button 
                    onClick={startMistakeBlitz}
                    className="flex items-center gap-1 bg-rose-100 hover:bg-rose-200 text-rose-600 px-4 py-2 rounded-full font-bold text-sm transition-colors animate-pulse shadow-sm"
                >
                    <FireIcon className="w-5 h-5" />
                    Mistake Blitz
                </button>
              </div>
              <div className="space-y-4">
                {mistakeVocab.map((card) => (
                  <VocabularyItem
                    key={`mistake-${card.id}`}
                    data={card}
                    onRemove={handleRemoveFromMistakes}
                  />
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: SAVED (Favorites) */}
          {savedVocab.length > 0 && (
            <div className="space-y-4">
               <div className="flex items-center gap-2 mb-2 px-2 mt-8">
                <HeartIcon className="w-6 h-6 text-pink-500" />
                <h3 className="text-xl font-bold text-slate-700">My Collection ({savedVocab.length})</h3>
              </div>
              <div className="space-y-4">
                {savedVocab.map((card) => (
                  <VocabularyItem
                    key={card.id}
                    data={card}
                    onRemove={handleRemoveFromVocab}
                  />
                ))}
              </div>
            </div>
          )}

          {savedVocab.length === 0 && mistakeVocab.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 text-center">
              <div className="w-40 h-40 mb-4 opacity-50">
                 <MonkeyMechanic className="w-full h-full" />
              </div>
              <p className="text-xl font-bold">暂无生词</p>
              <p className="text-sm mt-2 text-slate-400">开始学习，积累你的词汇量吧！</p>
              <button 
                onClick={() => setActiveTab('learn')}
                className="mt-6 bg-sky-400 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-sky-200 hover:bg-sky-500 transition-transform active:scale-95"
              >
                Go to Zoo
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- QUIZ TAB CONTENT --- */}
      {activeTab === 'quiz' && (
        <QuizModule 
          savedVocab={savedVocab} 
          onAddMistake={handleAddMistake}
          // Props for Mistake Mode
          customSource={quizMode === 'mistake' ? mistakeVocab : undefined}
          onRemoveFromMistakes={handleRemoveFromMistakes}
          modeName={quizMode === 'mistake' ? "Mistake Blitz 🔥" : "Pop Quiz"}
        />
      )}

    </Layout>
  );
};

export default App;
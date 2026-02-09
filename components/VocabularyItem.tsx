
import React from 'react';
import { FlashcardData } from '../types';
import { SpeakerWaveIcon, TrashIcon } from '@heroicons/react/24/solid';

interface VocabularyItemProps {
  data: FlashcardData;
  onRemove: (id: string) => void;
}

const VocabularyItem: React.FC<VocabularyItemProps> = ({ data, onRemove }) => {
  
  const playAudio = (text: string, accent: 'US' | 'UK') => {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    let voice = null;

    if (accent === 'US') {
      utterance.lang = 'en-US';
      voice = voices.find(v => v.lang === 'en-US' && v.name.includes('Google')) || voices.find(v => v.lang === 'en-US');
    } else {
      utterance.lang = 'en-GB';
      voice = voices.find(v => v.lang === 'en-GB' && v.name.includes('Google')) || voices.find(v => v.lang === 'en-GB');
    }

    if (voice) utterance.voice = voice;
    utterance.rate = 0.9;
    utterance.volume = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col sm:flex-row transition-all hover:shadow-md`}>
      {/* Accent Bar */}
      <div className={`h-2 sm:h-auto sm:w-3 ${data.bgColor.replace('100', '400')}`} />

      <div className="p-5 flex-1">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-extrabold text-gray-800">{data.english}</h3>
            <p className="text-gray-500 font-medium">{data.chinese}</p>
          </div>
          <button 
            onClick={() => onRemove(data.id)}
            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Remove from vocabulary"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Pronunciation & Audio */}
        <div className="flex flex-wrap gap-4 mb-4">
          <button 
            onClick={() => playAudio(data.english, 'US')}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <SpeakerWaveIcon className="w-4 h-4" />
            <span className="text-xs font-bold">US</span>
            <span className="text-xs font-mono">/{data.us_ipa}/</span>
          </button>
          
          <button 
            onClick={() => playAudio(data.english, 'UK')}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <SpeakerWaveIcon className="w-4 h-4" />
            <span className="text-xs font-bold">UK</span>
            <span className="text-xs font-mono">/{data.uk_ipa}/</span>
          </button>
        </div>

        {/* Examples - Displayed directly */}
        <div className="space-y-2 bg-gray-50 p-3 rounded-xl">
          {data.examples.map((ex, idx) => (
            <div key={idx} className="text-sm">
              <div className="flex justify-between items-start">
                  <p className="text-gray-800 font-medium mb-0.5">"{ex.en}"</p>
                  <button 
                    onClick={() => playAudio(ex.en, 'US')}
                    className="ml-2 text-gray-400 hover:text-blue-500 transition-colors"
                    title="Play Example"
                  >
                    <SpeakerWaveIcon className="w-3 h-3" />
                  </button>
              </div>
              <p className="text-gray-500 text-xs">{ex.zh}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VocabularyItem;

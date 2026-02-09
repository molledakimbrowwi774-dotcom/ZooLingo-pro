
export interface ExampleSentence {
  en: string;
  zh: string;
}

export interface WordData {
  id: string; // Unique ID for React keys and saving
  english: string;
  chinese: string;
  type: 'Word' | 'Phrase';
  us_ipa: string;
  uk_ipa: string;
  examples: ExampleSentence[];
}

export interface FlashcardData extends WordData {
  iconId: string;
  bgColor: string;
  isFlipped: boolean;
}

export type Tab = 'learn' | 'vocab' | 'quiz';

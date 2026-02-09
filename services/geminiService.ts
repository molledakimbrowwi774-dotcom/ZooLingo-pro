import { WordData } from "../types";
import { searchLocalDictionary, getRandomGlobalWords } from "../utils/dictionary";

// Simple ID generator
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// PURE OFFLINE GENERATOR
export const generateVocabulary = async (scene: string): Promise<WordData[]> => {
  console.log("Generating offline content for:", scene);

  // Simulate a short "thinking" delay for better UX
  await new Promise(resolve => setTimeout(resolve, 800));

  const TARGET_COUNT = 9; // Updated to 9 for a nice 3x3 grid
  let finalWords: WordData[] = [];

  // 1. Try Local Search
  let matches = searchLocalDictionary(scene) || [];
  
  // Shuffle matches immediately
  matches = matches.sort(() => Math.random() - 0.5);

  finalWords = [...matches];

  // 2. Fallback / Fill Logic
  // If we have fewer than TARGET_COUNT, fill with high-level global words.
  if (finalWords.length < TARGET_COUNT) {
    const needed = TARGET_COUNT - finalWords.length;
    // Fetch more than needed to account for potential duplicates
    const fillers = getRandomGlobalWords(needed * 4);
    
    let addedCount = 0;
    for (const filler of fillers) {
      if (addedCount >= needed) break;
      
      const isDuplicate = finalWords.some(w => w.english.toLowerCase() === filler.english.toLowerCase());
      
      if (!isDuplicate) {
        finalWords.push(filler);
        addedCount++;
      }
    }
  }

  // 3. Cap at TARGET_COUNT (9)
  finalWords = finalWords.slice(0, TARGET_COUNT);

  // 4. Final Shuffle
  finalWords = finalWords.sort(() => Math.random() - 0.5);
  
  return finalWords.map(item => ({ ...item, id: generateId() }));
};

export const PASTEL_COLORS = [
  'bg-red-100',
  'bg-orange-100',
  'bg-amber-100',
  'bg-yellow-100',
  'bg-lime-100',
  'bg-green-100',
  'bg-emerald-100',
  'bg-teal-100',
  'bg-cyan-100',
  'bg-sky-100',
  'bg-blue-100',
  'bg-indigo-100',
  'bg-violet-100',
  'bg-purple-100',
  'bg-fuchsia-100',
  'bg-pink-100',
  'bg-rose-100',
];

export const ANIMAL_ICON_IDS = [
  'lion_cool',
  'owl_dr',
  'rabbit_girl',
  'fox_gentleman',
  'bear_chef',
  'cat_nurse',
  'panda_student',
  'dog_pilot',
  'koala_clerk',
  'elephant_teacher',
];

export const getRandomElement = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const getCardCoverId = (index: number): string => {
  const safeIndex = index % ANIMAL_ICON_IDS.length;
  return ANIMAL_ICON_IDS[safeIndex];
};

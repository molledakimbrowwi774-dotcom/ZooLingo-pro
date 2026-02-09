import React from 'react';

interface IconProps {
  className?: string;
}

// --- NEW CHARACTERS ---

export const LionDirector: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#FEF3C7" />
    {/* Mane */}
    <circle cx="50" cy="45" r="32" fill="#D97706" />
    {/* Suit Jacket */}
    <path d="M25 90C25 90 30 70 50 75C70 70 75 90 75 90H25Z" fill="#1E3A8A" />
    {/* Shirt */}
    <path d="M42 75L50 85L58 75H42Z" fill="#FFFFFF" />
    {/* Tie */}
    <path d="M50 85L45 78H55L50 85V90" stroke="#DC2626" strokeWidth="4" />
    {/* Face */}
    <circle cx="50" cy="45" r="20" fill="#FCD34D" />
    {/* Glasses */}
    <circle cx="43" cy="43" r="5" stroke="#1F2937" strokeWidth="2" fill="none" />
    <circle cx="57" cy="43" r="5" stroke="#1F2937" strokeWidth="2" fill="none" />
    <line x1="48" y1="43" x2="52" y2="43" stroke="#1F2937" strokeWidth="2" />
    {/* Nose */}
    <path d="M47 52L50 55L53 52H47Z" fill="#000" />
    {/* Mouth */}
    <path d="M50 55V58" stroke="#000" strokeWidth="1" />
    <path d="M45 58Q50 61 55 58" stroke="#000" strokeWidth="1" fill="none" />
  </svg>
);

export const GiraffeReporter: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#FFF7ED" />
    {/* Neck */}
    <rect x="42" y="50" width="16" height="40" fill="#FBBF24" />
    <circle cx="45" cy="60" r="2" fill="#B45309" />
    <circle cx="52" cy="70" r="3" fill="#B45309" />
    {/* Scarf */}
    <path d="M35 85L40 75H60L65 85H35Z" fill="#EF4444" />
    <path d="M45 75V90" stroke="#B91C1C" strokeWidth="2" />
    {/* Head */}
    <ellipse cx="50" cy="45" rx="12" ry="18" fill="#FBBF24" />
    {/* Horns */}
    <line x1="45" y1="28" x2="43" y2="20" stroke="#FBBF24" strokeWidth="2" />
    <circle cx="43" cy="19" r="2" fill="#B45309" />
    <line x1="55" y1="28" x2="57" y2="20" stroke="#FBBF24" strokeWidth="2" />
    <circle cx="57" cy="19" r="2" fill="#B45309" />
    {/* Microphone */}
    <rect x="65" y="50" width="10" height="20" fill="#374151" rx="2" />
    <circle cx="70" cy="50" r="8" fill="#9CA3AF" />
    <line x1="60" y1="60" x2="65" y2="60" stroke="#374151" strokeWidth="2" />
  </svg>
);

export const MonkeyMechanic: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#F0F9FF" />
    {/* Ears */}
    <circle cx="30" cy="50" r="6" fill="#78350F" />
    <circle cx="70" cy="50" r="6" fill="#78350F" />
    {/* Head */}
    <circle cx="50" cy="50" r="20" fill="#92400E" />
    {/* Face */}
    <ellipse cx="50" cy="55" rx="15" ry="12" fill="#FDE68A" />
    {/* Hat */}
    <path d="M30 40H70V30H50L30 40Z" fill="#DC2626" />
    {/* Overalls */}
    <path d="M35 90V75H65V90" fill="#2563EB" />
    {/* Wrench */}
    <rect x="65" y="60" width="20" height="6" fill="#9CA3AF" transform="rotate(-45 65 60)" />
  </svg>
);

// --- ORIGINAL ICONS (KEPT FOR COMPATIBILITY) ---
export const LionCool: React.FC<IconProps> = ({ className }) => (
  <LionDirector className={className} />
);
export const OwlDr: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#E5E7EB" /><path d="M30 90C30 70 35 40 50 40C65 40 70 70 70 90H30Z" fill="#9CA3AF" /><path d="M35 90V60C35 60 40 55 50 55C60 55 65 60 65 60V90H35Z" fill="#FFFFFF" /><circle cx="50" cy="35" r="22" fill="#9CA3AF" /><circle cx="42" cy="32" r="8" fill="#FFF" /><circle cx="58" cy="32" r="8" fill="#FFF" /><circle cx="42" cy="32" r="3" fill="#000" /><circle cx="58" cy="32" r="3" fill="#000" /><circle cx="58" cy="32" r="10" stroke="#F59E0B" strokeWidth="2" fill="none" /><path d="M50 40L47 45H53L50 40Z" fill="#F59E0B" /></svg>
);
export const RabbitGirl: React.FC<IconProps> = ({ className }) => (
   <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#FCE7F3" /><path d="M40 40C35 20 35 5 45 10C50 15 45 35 45 35" fill="#FFF" stroke="#E5E7EB" /><path d="M60 40C65 20 65 5 55 10C50 15 55 35 55 35" fill="#FFF" stroke="#E5E7EB" /><circle cx="50" cy="50" r="25" fill="#FFF" /><path d="M30 90L40 70H60L70 90H30Z" fill="#EC4899" /><path d="M40 25L50 30L60 25L50 20L40 25Z" fill="#EC4899" /><circle cx="43" cy="48" r="2" fill="#000" /><circle cx="57" cy="48" r="2" fill="#000" /><path d="M48 53Q50 55 52 53" stroke="#000" strokeWidth="1" /></svg>
);
export const FoxGentleman: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#FFEDD5" /><path d="M30 35L40 60L50 70L60 60L70 35L50 45L30 35Z" fill="#EA580C" /><path d="M40 60L50 70L60 60" fill="#FFF" /><rect x="35" y="20" width="30" height="20" fill="#1F2937" /><path d="M50 70L45 80L50 90L55 80L50 70Z" fill="#3B82F6" /><circle cx="43" cy="55" r="2" fill="#000" /><circle cx="57" cy="55" r="2" fill="#000" /></svg>
);
export const BearChef: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#FEF3C7" /><circle cx="35" cy="40" r="8" fill="#78350F" /><circle cx="65" cy="40" r="8" fill="#78350F" /><circle cx="50" cy="50" r="25" fill="#92400E" /><ellipse cx="50" cy="55" rx="10" ry="8" fill="#FDE68A" /><path d="M35 30C35 20 45 10 50 10C55 10 65 20 65 30H35Z" fill="#FFF" stroke="#D1D5DB" /><path d="M35 90V75H65V90H35Z" fill="#EF4444" /></svg>
);
export const CatNurse: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#ECFEFF" /><path d="M30 35L35 65Q50 75 65 65L70 35L50 45L30 35Z" fill="#E5E7EB" /><path d="M35 30L40 15H60L65 30H35Z" fill="#FFF" stroke="#D1D5DB" /><path d="M45 22H55M50 17V27" stroke="#EF4444" strokeWidth="2" /><path d="M35 65Q50 75 65 65L65 75Q50 85 35 75Z" fill="#F472B6" /><circle cx="42" cy="50" r="2" fill="#000" /><circle cx="58" cy="50" r="2" fill="#000" /></svg>
);
export const PandaStudent: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#F0FDF4" /><circle cx="30" cy="35" r="8" fill="#000" /><circle cx="70" cy="35" r="8" fill="#000" /><circle cx="50" cy="50" r="25" fill="#FFF" /><ellipse cx="40" cy="48" rx="6" ry="8" fill="#000" transform="rotate(-30 40 48)" /><ellipse cx="60" cy="48" rx="6" ry="8" fill="#000" transform="rotate(30 60 48)" /><path d="M35 35H65L60 25H40L35 35Z" fill="#3B82F6" /></svg>
);
export const DogPilot: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#EFF6FF" /><path d="M30 40C20 50 20 70 35 60" fill="#D97706" /><path d="M70 40C80 50 80 70 65 60" fill="#D97706" /><circle cx="50" cy="50" r="22" fill="#FBBF24" /><circle cx="42" cy="40" r="8" fill="#93C5FD" stroke="#374151" strokeWidth="2" /><circle cx="58" cy="40" r="8" fill="#93C5FD" stroke="#374151" strokeWidth="2" /><path d="M30 90V70C30 70 40 80 50 80C60 80 70 70 70 70V90H30Z" fill="#78350F" /></svg>
);
export const KoalaClerk: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#F3F4F6" /><circle cx="25" cy="40" r="10" fill="#9CA3AF" /><circle cx="75" cy="40" r="10" fill="#9CA3AF" /><circle cx="50" cy="50" r="25" fill="#D1D5DB" /><ellipse cx="50" cy="50" rx="5" ry="8" fill="#374151" /><path d="M30 90V75H70V90H30Z" fill="#FFF" /></svg>
);
export const ElephantTeacher: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="#EEF2FF" /><circle cx="25" cy="45" r="15" fill="#9CA3AF" /><circle cx="75" cy="45" r="15" fill="#9CA3AF" /><circle cx="50" cy="45" r="25" fill="#CBD5E1" /><path d="M45 55Q50 80 55 55" fill="#CBD5E1" /><rect x="35" y="40" width="12" height="8" rx="2" stroke="#000" strokeWidth="2" fill="none" /><rect x="53" y="40" width="12" height="8" rx="2" stroke="#000" strokeWidth="2" fill="none" /></svg>
);

export const AnimalIcons: Record<string, React.FC<IconProps>> = {
  lion_cool: LionDirector, // Replaced
  lion_director: LionDirector,
  giraffe_reporter: GiraffeReporter,
  monkey_mechanic: MonkeyMechanic,
  owl_dr: OwlDr,
  rabbit_girl: RabbitGirl,
  fox_gentleman: FoxGentleman,
  bear_chef: BearChef,
  cat_nurse: CatNurse,
  panda_student: PandaStudent,
  dog_pilot: DogPilot,
  koala_clerk: KoalaClerk,
  elephant_teacher: ElephantTeacher,
};
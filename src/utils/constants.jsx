import { Hash, Music, Code, Camera, BookOpen, Gamepad2, Palette, Users, Settings } from 'lucide-react';

// Admin credentials
export const adminCredentials = {
  userId: 'admin123',
  password: 'admin@2025'
};

// Available icons for clubs
export const availableIcons = {
  Hash: Hash,
  Music: Music,
  Code: Code,
  Camera: Camera,
  BookOpen: BookOpen,
  Gamepad2: Gamepad2,
  Palette: Palette,
  Users: Users,
  Settings: Settings
};

// Available colors for clubs
export const availableColors = [
  'bg-purple-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-red-500',
  'bg-amber-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-cyan-500',
  'bg-orange-500',
  'bg-teal-500'
];

// Common emojis for chat
export const commonEmojis = [
  '😊', '😂', '❤️', '👍', '👎', '🔥', '💯', '🎉', 
  '👀', '😭', '🤔', '💪', '🙌', '✨', '🚀', '💡', '🎯', '⚡'
];

// Profanity words (keeping your existing structure)
export const profanityWords = {
  english: [
    'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'cunt', 'whore', 'slut', 'motherfucker',
    'dickhead', 'prick', 'cock', 'dumb', 'goddamn', 'bullshit', 'looser', 'Idiot'
  ],
  hindi: [
    'bhosdi', 'bhosadi', 'randi', 'chut', 'choot', 'lavda', 'loda', 'gandu', 'gaandu',
    'madarchod', 'madarchodh', 'behenchod', 'bhenchod', 'kutta', 'kutte', 'suar',
    'harami', 'haramkhor', 'kamina', 'kamini', 'sala', 'saala', 'saali',
    'mc', 'bc', 'mkc', 'bkl', 'bhosdike', 'bhosadike', 'chutiya', 'chutiye'
  ],
  tamil: [
    'ommale', 'DMK', 'AIADMK', 'ADMK', 'TVK', 'NTK', 'VSK', 'othu',
    'vesi', 'vesee', 'payal', 'payale', 'nai', 'naai', 'panni', 'panri',
    'poda', 'podi', 'maire', 'myre', 'kunna', 'kundi', 'thevadiya', 'thevidiya',
    'nakki', 'oombu', 'umbu', 'vada', 'vadaa', 'kena', 'ketta', 'thayoli'
  ],
  telugu: [
    'boothu', 'puku', 'pooku', 'dengu', 'dengey', 'lanja', 'lanjakodaka',
    'lanjakoduku', 'gadida', 'kukka', 'pandi', 'pandhi', 'denguddi',
    'kodaka', 'koduku', 'bomma', 'sulli', 'sulla', 'potta', 'gorre'
  ],
  kannada: [
    'booru', 'buru', 'tunni', 'tunne', 'sulle', 'sulla', 'nayi', 'naai',
    'handi', 'handhi', 'gadhe', 'gadde', 'maire', 'myre', 'bekku',
    'yavde', 'yavda', 'thika', 'thike', 'thunni', 'potte'
  ],
  malayalam: [
    'poor', 'poore', 'kunna', 'konna', 'thayoli', 'tayoli', 'patti',
    'patty', 'panni', 'pannie', 'kazhuda', 'kazhuta', 'maire', 'myre',
    'poyi', 'povada', 'kundan', 'kundhan', 'myran', 'myron', 'thendi'
  ]
};
// Initial clubs data
export const initialClubs = [
  {
    id: 1,
    name: 'Music Club',
    description: 'Share your beats, covers, and musical discoveries',
    icon: 'Music',
    members: 124,
    color: 'bg-purple-500',
    lastActivity: '2 min ago',
    createdBy: 'admin',
    createdAt: new Date('2025-08-15T10:00:00'),
    isActive: true
  },
  {
    id: 2,
    name: 'Hack Club',
    description: 'Code together, build amazing projects',
    icon: 'Code',
    members: 89,
    color: 'bg-green-500',
    lastActivity: '5 min ago',
    createdBy: 'admin',
    createdAt: new Date('2025-08-15T11:00:00'),
    isActive: true
  }
];

// Sample messages for clubs
export const clubMessages = {
  1: [
    {
      id: 1,
      sender: 'Alex Rivera',
      content: 'Just dropped my new lo-fi track! Check it out 🎵',
      timestamp: new Date('2025-08-16T14:25:00'),
      isCurrentUser: false,
      avatar: 'AR'
    },
    {
      id: 2,
      sender: 'Sarah Kim',
      content: 'Love the vibe! The piano melody is so smooth',
      timestamp: new Date('2025-08-16T14:27:00'),
      isCurrentUser: false,
      avatar: 'SK'
    }
  ],
  2: [
    {
      id: 1,
      sender: 'Jordan Chen',
      content: 'Working on a React Native app for habit tracking. Anyone want to collaborate?',
      timestamp: new Date('2025-08-16T14:20:00'),
      isCurrentUser: false,
      avatar: 'JC'
    }
  ]
};
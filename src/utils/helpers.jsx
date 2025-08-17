// Format timestamp to readable time
export const formatTime = (timestamp) => {
  return timestamp.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

// Get avatar color based on sender name
export const getAvatarColor = (sender) => {
  const colors = [
    'bg-purple-500', 
    'bg-blue-500', 
    'bg-green-500', 
    'bg-pink-500', 
    'bg-indigo-500', 
    'bg-amber-500'
  ];
  return colors[sender.length % colors.length];
};

// Generate random response for chat simulation
export const getRandomResponse = () => {
  const responses = [
    'Great point!',
    'Thanks for sharing!',
    'I totally agree 💯',
    'Interesting perspective!',
    'Love this discussion!'
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};
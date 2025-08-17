import { useState } from 'react';
import { profanityWords } from '../utils/constants';

export const useProfanityFilter = () => {
  const [userWarnings, setUserWarnings] = useState(0);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [timeoutEnd, setTimeoutEnd] = useState(null);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const checkForProfanity = (message) => {
    const lowerMessage = message.toLowerCase();
    
    for (const language in profanityWords) {
      for (const word of profanityWords[language]) {
        const lowerWord = word.toLowerCase();
        if (lowerMessage.includes(lowerWord)) {
          return true;
        }
        
        const wordBoundaryRegex = new RegExp(`\\b${lowerWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (wordBoundaryRegex.test(lowerMessage)) {
          return true;
        }
      }
    }
    
    const hatePatterns = [
      /\b(kill\s*(yourself|urself|u)|kys|go\s*die)\b/i,
      /\b(fuck\s*(off|you|this)|fucking\s*(idiot|moron))\b/i,
      /\b(rape|molest|terrorist)\b/i
    ];
    
    return hatePatterns.some(pattern => pattern.test(lowerMessage));
  };

  const handleWarningSystem = () => {
    const newWarningCount = userWarnings + 1;
    setUserWarnings(newWarningCount);
    
    if (newWarningCount === 1) {
      setWarningMessage('⚠️ Warning 1/2: Please keep the conversation respectful. Hate speech and profanity are not allowed.');
      setShowWarningModal(true);
    } else if (newWarningCount === 2) {
      setWarningMessage('⚠️ Final Warning 2/2: This is your last warning. Any further inappropriate messages will result in a timeout.');
      setShowWarningModal(true);
    } else if (newWarningCount >= 3) {
      const timeoutDuration = 10 * 60 * 1000;
      const endTime = new Date(Date.now() + timeoutDuration);
      setTimeoutEnd(endTime);
      setIsTimedOut(true);
      setWarningMessage('🚫 You have been timed out for 10 minutes due to repeated inappropriate messages. Please reflect on maintaining respectful communication.');
      setShowWarningModal(true);
      
      setTimeout(() => {
        setIsTimedOut(false);
        setTimeoutEnd(null);
        setUserWarnings(0);
      }, timeoutDuration);
    }
  };

  const getRemainingTimeoutTime = () => {
    if (!timeoutEnd) return '';
    const now = new Date();
    const remaining = timeoutEnd - now;
    if (remaining <= 0) return '';
    
    const minutes = Math.floor(remaining / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    userWarnings,
    isTimedOut,
    showWarningModal,
    setShowWarningModal,
    warningMessage,
    checkForProfanity,
    handleWarningSystem,
    getRemainingTimeoutTime
  };
};
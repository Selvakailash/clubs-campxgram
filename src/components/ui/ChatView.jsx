import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, ArrowLeft, Users, Hash } from 'lucide-react';
import { availableIcons, commonEmojis } from '../../utils/constants';
import { formatTime, getAvatarColor } from '../../utils/helpers';
import { WarningModal } from './Modal';

const ChatView = ({
  selectedClub,
  messages,
  onBackToClubs,
  onSendMessage,
  isTyping,
  currentUser,
  // Profanity filter props
  userWarnings,
  isTimedOut,
  showWarningModal,
  setShowWarningModal,
  warningMessage,
  getRemainingTimeoutTime
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    if (isTimedOut) {
      setShowWarningModal(true);
      return;
    }
    
    onSendMessage(newMessage, setNewMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileMessage = `📎 Shared a file: ${file.name}`;
      onSendMessage(fileMessage, setNewMessage);
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const IconComponent = availableIcons[selectedClub.icon];

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onBackToClubs}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-400" />
          </button>
          
          <div className={`${selectedClub.color} p-2 rounded-lg`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          
          <div>
            <h2 className="font-semibold text-white flex items-center">
              <Hash className="w-4 h-4 mr-1 text-gray-500" />
              {selectedClub.name}
            </h2>
            <p className="text-sm text-gray-400">{selectedClub.members} members</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-full transition-colors">
            <Users className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className={`${selectedClub.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Welcome to {selectedClub.name}!</h3>
            <p className="text-gray-400">{selectedClub.description}</p>
            <p className="text-gray-500 text-sm mt-2">Start a conversation with your club members</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs lg:max-w-md ${message.isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                {!message.isCurrentUser && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${getAvatarColor(message.sender)} flex-shrink-0`}>
                    {message.avatar}
                  </div>
                )}
                
                <div className="flex flex-col">
                  {!message.isCurrentUser && (
                    <span className="text-xs text-gray-500 mb-1 px-2">{message.sender}</span>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.isCurrentUser
                        ? 'bg-purple-600 text-white rounded-br-sm'
                        : 'bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isCurrentUser ? 'text-purple-200' : 'text-gray-500'}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end space-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium bg-gray-600">
                CM
              </div>
              <div className="bg-gray-800 text-gray-100 border border-gray-700 rounded-2xl rounded-bl-sm px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Area */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4 relative">
        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-20 left-6 bg-gray-800 border border-gray-600 rounded-lg shadow-lg p-4 z-10">
            <div className="grid grid-cols-6 gap-2 w-64">
              {commonEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiClick(emoji)}
                  className="text-2xl hover:bg-gray-700 rounded p-2 transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="*/*"
          />
          
          <button 
            onClick={handleFileSelect}
            className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-full transition-colors"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isTimedOut ? `Timed out - ${getRemainingTimeoutTime()} remaining` : `Message #${selectedClub.name.toLowerCase().replace(' ', '-')}`}
              disabled={isTimedOut}
              className={`w-full px-4 py-3 border border-gray-600 rounded-3xl focus:outline-none focus:ring-2 focus:border-transparent resize-none text-white placeholder-gray-400 ${
                isTimedOut 
                  ? 'bg-red-900/20 focus:ring-red-500 cursor-not-allowed' 
                  : 'bg-gray-700 focus:ring-purple-500'
              }`}
              rows="1"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            {userWarnings > 0 && !isTimedOut && (
              <div className="absolute -top-8 left-0 text-xs text-yellow-400">
                ⚠️ Warnings: {userWarnings}/2
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-full transition-colors"
          >
            <Smile className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isTimedOut}
            className={`p-2 rounded-full transition-colors ${
              newMessage.trim() && !isTimedOut
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Warning Modal */}
      <WarningModal
        isOpen={showWarningModal}
        onClose={() => setShowWarningModal(false)}
        warningMessage={warningMessage}
        userWarnings={userWarnings}
        getRemainingTimeoutTime={getRemainingTimeoutTime}
      />
    </div>
  );
};

export default ChatView;
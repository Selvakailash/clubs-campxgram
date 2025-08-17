import React from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { availableIcons, availableColors } from '../../utils/constants';

// Generic Modal Wrapper
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Create Club Modal
export const CreateClubModal = ({ 
  isOpen, 
  onClose, 
  newClub, 
  setNewClub, 
  onCreateClub 
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Create New Club">
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Club Name
        </label>
        <input
          type="text"
          value={newClub.name}
          onChange={(e) => setNewClub({...newClub, name: e.target.value})}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter club name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={newClub.description}
          onChange={(e) => setNewClub({...newClub, description: e.target.value})}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Describe your club"
          rows="3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Icon
        </label>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(availableIcons).map(([iconName, IconComponent]) => (
            <button
              key={iconName}
              onClick={() => setNewClub({...newClub, icon: iconName})}
              className={`p-3 rounded-lg border transition-colors flex items-center justify-center ${
                newClub.icon === iconName
                  ? 'border-purple-500 bg-purple-500/20 text-purple-400'
                  : 'border-gray-600 text-gray-400 hover:border-gray-500'
              }`}
            >
              <IconComponent className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => setNewClub({...newClub, color})}
              className={`w-8 h-8 rounded-full ${color} border-2 transition-colors ${
                newClub.color === color ? 'border-white' : 'border-transparent'
              }`}
            />
          ))}
        </div>
      </div>
    </div>

    <div className="flex space-x-3 mt-6">
      <button
        onClick={onClose}
        className="flex-1 px-4 py-2 text-gray-400 hover:text-gray-300 border border-gray-600 rounded-lg transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={onCreateClub}
        disabled={!newClub.name.trim() || !newClub.description.trim()}
        className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        <Save className="w-4 h-4" />
        <span>Create Club</span>
      </button>
    </div>
  </Modal>
);

// Delete Club Confirmation Modal
export const DeleteClubModal = ({ 
  isOpen, 
  onClose, 
  club, 
  onConfirmDelete 
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Delete Club">
    <div className="mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`${club?.color} p-3 rounded-lg`}>
          {club && React.createElement(availableIcons[club.icon], { className: "w-6 h-6 text-white" })}
        </div>
        <div>
          <h4 className="font-semibold text-white">{club?.name}</h4>
          <p className="text-sm text-gray-400">{club?.members} members</p>
        </div>
      </div>
      
      <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Trash2 className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="text-red-300 font-medium mb-1">Permanent Deletion</h5>
            <p className="text-red-400 text-sm">
              This action cannot be undone. The club, all its messages, and member data will be permanently deleted.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="flex space-x-3">
      <button
        onClick={onClose}
        className="flex-1 px-4 py-2 text-gray-400 hover:text-gray-300 border border-gray-600 rounded-lg transition-colors"
      >
        Cancel
      </button>
      <button
        onClick={onConfirmDelete}
        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        <Trash2 className="w-4 h-4" />
        <span>Delete Club</span>
      </button>
    </div>
  </Modal>
);

// Warning Modal
export const WarningModal = ({ 
  isOpen, 
  onClose, 
  warningMessage, 
  userWarnings, 
  getRemainingTimeoutTime 
}) => (
  <Modal isOpen={isOpen} onClose={() => {}} title="">
    <div className="text-center">
      <div className="text-4xl mb-4">
        {userWarnings >= 3 ? '🚫' : '⚠️'}
      </div>
      <h3 className="text-lg font-semibold text-white mb-3">
        {userWarnings >= 3 ? 'Account Timed Out' : 'Content Warning'}
      </h3>
      <p className="text-gray-300 mb-6 text-sm leading-relaxed">
        {warningMessage}
      </p>
      {userWarnings >= 3 && (
        <div className="bg-red-900/30 border border-red-500 rounded p-3 mb-4">
          <p className="text-red-300 text-sm">
            Time remaining: {getRemainingTimeoutTime()}
          </p>
        </div>
      )}
      <button
        onClick={onClose}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        I Understand
      </button>
    </div>
  </Modal>
);
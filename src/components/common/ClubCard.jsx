import React from 'react';
import { Users, Ban, Power, Trash2 } from 'lucide-react';
import { availableIcons } from '../../utils/constants';

const ClubCard = ({ 
  club, 
  isJoined = false, 
  isAdmin = false, 
  onJoinClub, 
  onSelectClub, 
  onDeleteClub,
  onToggleStatus 
}) => {
  const IconComponent = availableIcons[club.icon];

  if (isAdmin) {
    return (
      <div
        className={`bg-gray-800 border rounded-xl p-6 transition-all duration-200 relative ${
          club.isActive 
            ? 'border-gray-700 hover:bg-gray-750' 
            : 'border-red-500/30 bg-gray-800/50'
        }`}
      >
        {!club.isActive && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Disabled
          </div>
        )}
        
        <div className="flex items-start justify-between mb-4">
          <div className={`${club.color} p-3 rounded-lg ${!club.isActive ? 'opacity-50' : ''}`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-gray-500">{club.lastActivity}</span>
          </div>
        </div>
        
        <h3 className={`text-lg font-semibold mb-2 ${club.isActive ? 'text-white' : 'text-gray-500'}`}>
          {club.name}
        </h3>
        <p className={`text-sm mb-4 line-clamp-2 ${club.isActive ? 'text-gray-400' : 'text-gray-600'}`}>
          {club.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>{club.members} members</span>
          </div>
          <button 
            onClick={() => onSelectClub(club)}
            disabled={!club.isActive}
            className={`font-medium text-sm ${
              club.isActive 
                ? 'text-purple-400 hover:text-purple-300' 
                : 'text-gray-600 cursor-not-allowed'
            }`}
          >
            View Chat →
          </button>
        </div>
        
        {/* Admin Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleStatus(club.id)}
              className={`p-2 rounded-lg transition-colors ${
                club.isActive
                  ? 'text-orange-400 hover:bg-orange-500/20 hover:text-orange-300'
                  : 'text-green-400 hover:bg-green-500/20 hover:text-green-300'
              }`}
              title={club.isActive ? 'Disable Club' : 'Enable Club'}
            >
              {club.isActive ? <Ban className="w-4 h-4" /> : <Power className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => onDeleteClub(club)}
              className="p-2 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-colors"
              title="Delete Club"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="text-xs text-gray-600">
            Created {club.createdAt.toLocaleDateString()}
          </div>
        </div>
      </div>
    );
  }

  // Student view
  return (
    <div
      className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:bg-gray-750 hover:border-purple-500/50 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`${club.color} p-3 rounded-lg`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <span className="text-xs text-gray-500">{club.lastActivity}</span>
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2">{club.name}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{club.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>{club.members} members</span>
        </div>
        <button 
          onClick={() => onJoinClub(club)}
          className={`font-medium text-sm px-4 py-2 rounded-lg transition-colors ${
            isJoined
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'text-purple-400 hover:text-purple-300 border border-purple-500 hover:bg-purple-500/10'
          }`}
        >
          {isJoined ? 'Joined ✓' : 'Join Club'}
        </button>
      </div>
    </div>
  );
};

export default ClubCard;
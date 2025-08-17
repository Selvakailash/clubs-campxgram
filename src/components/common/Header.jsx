import React from 'react';
import { Shield, Users, LogOut, Plus } from 'lucide-react';

const Header = ({ 
  userRole, 
  currentUser, 
  onLogout, 
  onCreateClub = null, 
  title = "Club Chat System" 
}) => {
  return (
    <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-600 p-2 rounded-lg">
            {userRole === 'admin' ? (
              <Shield className="w-6 h-6 text-white" />
            ) : (
              <Users className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <p className="text-sm text-gray-400">Welcome, {currentUser}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {userRole === 'admin' && onCreateClub && (
            <button
              onClick={onCreateClub}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Create Club</span>
            </button>
          )}
          
          <button
            onClick={onLogout}
            className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
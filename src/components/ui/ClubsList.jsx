import React from 'react';
import Header from '../common/Header';
import ClubCard from '../common/ClubCard';

const ClubsList = ({
  currentUser,
  clubs,
  joinedClubs,
  onJoinClub,
  onLogout
}) => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        userRole="student"
        currentUser={currentUser}
        onLogout={onLogout}
        title="Available Clubs"
      />

      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Join Clubs</h2>
          <p className="text-gray-400">Connect with like-minded students in various clubs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.filter(club => club.isActive).map((club) => (
            <ClubCard
              key={club.id}
              club={club}
              isJoined={joinedClubs.includes(club.id)}
              onJoinClub={onJoinClub}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubsList;
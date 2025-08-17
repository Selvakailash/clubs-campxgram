import React from 'react';
import Header from '../common/Header';
import ClubCard from '../common/ClubCard';
import { CreateClubModal, DeleteClubModal } from './Modal';

const AdminDashboard = ({
  currentUser,
  clubs,
  showCreateClubModal,
  setShowCreateClubModal,
  newClub,
  setNewClub,
  showDeleteModal,
  clubToDelete,
  onCreateClub,
  onDeleteClub,
  onConfirmDeleteClub,
  onToggleClubStatus,
  onClubSelect,
  onLogout
}) => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        userRole="admin"
        currentUser={currentUser}
        onLogout={onLogout}
        onCreateClub={() => setShowCreateClubModal(true)}
        title="Admin Dashboard"
      />

      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Club Management</h2>
          <p className="text-gray-400">Manage and create clubs for students</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
              isAdmin={true}
              onSelectClub={onClubSelect}
              onDeleteClub={onDeleteClub}
              onToggleStatus={onToggleClubStatus}
            />
          ))}
        </div>
      </div>

      <CreateClubModal
        isOpen={showCreateClubModal}
        onClose={() => setShowCreateClubModal(false)}
        newClub={newClub}
        setNewClub={setNewClub}
        onCreateClub={onCreateClub}
      />
      
      <DeleteClubModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        club={clubToDelete}
        onConfirmDelete={onConfirmDeleteClub}
      />
    </div>
  );
};

export default AdminDashboard;
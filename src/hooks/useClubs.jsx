import { useState, useEffect } from 'react';
import { initialClubs } from '../data/mockData';

export const useClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [joinedClubs, setJoinedClubs] = useState([]);
  const [showCreateClubModal, setShowCreateClubModal] = useState(false);
  const [newClub, setNewClub] = useState({
    name: '',
    description: '',
    icon: 'Hash',
    color: 'bg-purple-500'
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clubToDelete, setClubToDelete] = useState(null);

  // Initialize clubs on component mount
  useEffect(() => {
    if (clubs.length === 0) {
      setClubs(initialClubs);
    }
  }, [clubs.length]);

  const handleCreateClub = (currentUser) => {
    if (!newClub.name.trim() || !newClub.description.trim()) {
      return false;
    }

    const club = {
      id: clubs.length + 1,
      name: newClub.name,
      description: newClub.description,
      icon: newClub.icon,
      members: 0,
      color: newClub.color,
      lastActivity: 'Just created',
      createdBy: currentUser,
      createdAt: new Date(),
      isActive: true
    };

    setClubs([...clubs, club]);
    setShowCreateClubModal(false);
    setNewClub({
      name: '',
      description: '',
      icon: 'Hash',
      color: 'bg-purple-500'
    });
    return true;
  };

  const handleJoinClub = (club) => {
    // Only allow joining active clubs
    if (!club.isActive) {
      return false;
    }
    
    if (!joinedClubs.includes(club.id)) {
      setJoinedClubs([...joinedClubs, club.id]);
      // Update member count
      setClubs(clubs.map(c => 
        c.id === club.id ? { ...c, members: c.members + 1 } : c
      ));
    }
    return true;
  };

  const handleDeleteClub = (club) => {
    setClubToDelete(club);
    setShowDeleteModal(true);
  };

  const confirmDeleteClub = () => {
    setClubs(clubs.filter(club => club.id !== clubToDelete.id));
    setShowDeleteModal(false);
    setClubToDelete(null);
    // Remove from joined clubs if students had joined
    setJoinedClubs(joinedClubs.filter(id => id !== clubToDelete.id));
  };

  const toggleClubStatus = (clubId) => {
    setClubs(clubs.map(club => 
      club.id === clubId 
        ? { ...club, isActive: !club.isActive }
        : club
    ));
  };

  return {
    clubs,
    joinedClubs,
    showCreateClubModal,
    setShowCreateClubModal,
    newClub,
    setNewClub,
    showDeleteModal,
    setShowDeleteModal,
    clubToDelete,
    handleCreateClub,
    handleJoinClub,
    handleDeleteClub,
    confirmDeleteClub,
    toggleClubStatus
  };
};
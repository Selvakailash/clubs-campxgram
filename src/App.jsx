import React, { useState, useEffect } from 'react';
import LoginPage from './components/ui/LoginPage';
import AdminDashboard from './components/ui/AdminDashboard';
import ClubsList from './components/ui/ClubsList';
import ChatView from './components/ui/ChatView';
import { useAuth } from './hooks/useAuth';
import { useClubs } from './hooks/useClubs';
import { useProfanityFilter } from './hooks/useProfanityFilter';
import { clubMessages } from './data/mockData';
import { getRandomResponse } from './utils/helpers';

const ClubChatSystem = () => {
  const [currentView, setCurrentView] = useState('login');
  const [selectedClub, setSelectedClub] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Custom hooks
  const auth = useAuth();
  const clubs = useClubs();
  const profanityFilter = useProfanityFilter();

  // Handle login
  const handleLogin = () => {
    const result = auth.handleLogin();
    if (result.success) {
      setCurrentView(result.view);
    }
  };

  // Handle logout
  const handleLogout = () => {
    auth.handleLogout();
    setCurrentView('login');
    setSelectedClub(null);
    setMessages([]);
  };

  // Club selection
  const handleClubSelect = (club) => {
    setSelectedClub(club);
    setMessages(clubMessages[club.id] || []);
    setCurrentView('chat');
  };

  // Back to clubs/dashboard
  const handleBackToClubs = () => {
    setCurrentView(auth.userRole === 'admin' ? 'adminDashboard' : 'clubs');
    setSelectedClub(null);
    setMessages([]);
  };

  // Join club (for students)
  const handleJoinClub = (club) => {
    if (clubs.handleJoinClub(club)) {
      handleClubSelect(club);
    }
  };

  // Create club (for admin)
  const handleCreateClub = () => {
    clubs.handleCreateClub(auth.currentUser);
  };

  // Send message in chat
  const handleSendMessage = (messageContent, setNewMessage) => {
    if (profanityFilter.isTimedOut) {
      profanityFilter.setShowWarningModal(true);
      return;
    }
    
    if (profanityFilter.checkForProfanity(messageContent)) {
      profanityFilter.handleWarningSystem();
      setNewMessage('');
      return;
    }

    const message = {
      id: messages.length + 1,
      sender: auth.currentUser,
      content: messageContent,
      timestamp: new Date(),
      isCurrentUser: true,
      avatar: 'ME'
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulate typing and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response = {
        id: messages.length + 2,
        sender: 'Club Member',
        content: getRandomResponse(),
        timestamp: new Date(),
        isCurrentUser: false,
        avatar: 'CM'
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginPage
            loginForm={auth.loginForm}
            setLoginForm={auth.setLoginForm}
            loginError={auth.loginError}
            onLogin={handleLogin}
          />
        );

      case 'adminDashboard':
        return (
          <AdminDashboard
            currentUser={auth.currentUser}
            clubs={clubs.clubs}
            showCreateClubModal={clubs.showCreateClubModal}
            setShowCreateClubModal={clubs.setShowCreateClubModal}
            newClub={clubs.newClub}
            setNewClub={clubs.setNewClub}
            showDeleteModal={clubs.showDeleteModal}
            clubToDelete={clubs.clubToDelete}
            onCreateClub={handleCreateClub}
            onDeleteClub={clubs.handleDeleteClub}
            onConfirmDeleteClub={clubs.confirmDeleteClub}
            onToggleClubStatus={clubs.toggleClubStatus}
            onClubSelect={handleClubSelect}
            onLogout={handleLogout}
          />
        );

      case 'clubs':
        return (
          <ClubsList
            currentUser={auth.currentUser}
            clubs={clubs.clubs}
            joinedClubs={clubs.joinedClubs}
            onJoinClub={handleJoinClub}
            onLogout={handleLogout}
          />
        );

      case 'chat':
        return (
          <ChatView
            selectedClub={selectedClub}
            messages={messages}
            onBackToClubs={handleBackToClubs}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            currentUser={auth.currentUser}
            userWarnings={profanityFilter.userWarnings}
            isTimedOut={profanityFilter.isTimedOut}
            showWarningModal={profanityFilter.showWarningModal}
            setShowWarningModal={profanityFilter.setShowWarningModal}
            warningMessage={profanityFilter.warningMessage}
            getRemainingTimeoutTime={profanityFilter.getRemainingTimeoutTime}
          />
        );

      default:
        return null;
    }
  };

  return renderCurrentView();
};

export default ClubChatSystem;
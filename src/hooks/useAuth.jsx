import { useState } from 'react';
import { adminCredentials } from '../utils/constants';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loginForm, setLoginForm] = useState({
    userId: '',
    password: '',
    role: 'student'
  });
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    setLoginError('');
    
    if (loginForm.role === 'admin') {
      if (loginForm.userId === adminCredentials.userId && loginForm.password === adminCredentials.password) {
        setCurrentUser('Admin');
        setUserRole('admin');
        return { success: true, view: 'adminDashboard' };
      } else {
        setLoginError('Invalid admin credentials');
        return { success: false };
      }
    } else {
      // For student login, just check if fields are filled
      if (loginForm.userId && loginForm.password) {
        setCurrentUser(loginForm.userId);
        setUserRole('student');
        return { success: true, view: 'clubs' };
      } else {
        setLoginError('Please fill in all fields');
        return { success: false };
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserRole(null);
    setLoginForm({ userId: '', password: '', role: 'student' });
    setLoginError('');
  };

  return {
    currentUser,
    userRole,
    loginForm,
    setLoginForm,
    loginError,
    handleLogin,
    handleLogout
  };
};
import React, { useState } from 'react';
import { Users, User, Shield, UserCheck, Eye, EyeOff } from 'lucide-react';

const LoginPage = ({ loginForm, setLoginForm, loginError, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">campXgram Clubs</h1>
            <p className="text-gray-400">Login to join Clubs</p>
          </div>

          <div className="mb-6">
            <div className="flex rounded-lg bg-gray-700 p-1 mb-4">
              <button
                onClick={() => setLoginForm({...loginForm, role: 'student'})}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                  loginForm.role === 'student' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Student</span>
              </button>
              <button
                onClick={() => setLoginForm({...loginForm, role: 'admin'})}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                  loginForm.role === 'admin' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {loginForm.role === 'admin' ? 'Admin ID' : 'Student ID'}
                </label>
                <input
                  type="text"
                  value={loginForm.userId}
                  onChange={(e) => setLoginForm({...loginForm, userId: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={loginForm.role === 'admin' ? 'Enter admin ID' : 'Enter your student ID'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {loginError && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-500 rounded-lg">
                <p className="text-red-300 text-sm">{loginError}</p>
              </div>
            )}

            {loginForm.role === 'admin' && (
              <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500 rounded-lg">
                <p className="text-blue-300 text-xs">
                  Demo credentials - ID: admin123, Password: admin@2025
                </p>
              </div>
            )}
          </div>

          <button
            onClick={onLogin}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <UserCheck className="w-5 h-5" />
            <span>Login as {loginForm.role === 'admin' ? 'Admin' : 'Student'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
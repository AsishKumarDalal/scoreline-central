import React, { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Dashboard from '../components/Dashboard';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <>
      {authMode === 'login' ? (
        <Login onSwitchToSignup={() => setAuthMode('signup')} />
      ) : (
        <Signup onSwitchToLogin={() => setAuthMode('login')} />
      )}
    </>
  );
};

export default Index;

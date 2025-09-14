import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
// Create the context
const AuthContext = createContext(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Mock authentication - replace with real API call
    if (email && password) {
      // const mockUser = {
      //   id: '1',
      //   name: 'John Doe',
      //   email: email,
      //   position: 'Forward',
      //   team: 'Eagles FC'
      // };
      const response=await axios.post("http://localhost:3000/login",{
        email,
        password
      })

      setUser(response.data.response.email);
      return true;
    }
    return false;
  };

  const signup = async (userData) => {
    // Mock signup - replace with real API call
    const {  email, password, fullName } = userData;
    if (email && password && fullName) {
      // const newUser = {
      //   id: Date.now().toString(),
      //   name,
      //   email,
       
      // };
      const response= await axios.post("http://localhost:3000/register",{
        email,
        password,
        fullName
      })
      
      setUser(response.data.email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

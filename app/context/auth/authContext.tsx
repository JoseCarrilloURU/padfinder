import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name?: string;
  email?: string;
  age?: number;
  genre?: string;
  id?: string;
  person_id?: string;
  tokenForgout?: string;
  tokenChange?: string;
}

interface AuthContextProps {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const loadAuthData = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedUser = await AsyncStorage.getItem('userData');
      if (storedToken) {
        setTokenState(storedToken);
      }
      if (storedUser) {
        setUserState(JSON.parse(storedUser));
      }
    };
    loadAuthData();
  }, []);

  const setToken = async (newToken: string | null) => {
    if (newToken) {
      await AsyncStorage.setItem('userToken', newToken);
    } else {
      await AsyncStorage.removeItem('userToken');
    }
    setTokenState(newToken);
  };

  const setUser = async (newUser: User | null) => {
    if (newUser) {
      await AsyncStorage.setItem('userData', JSON.stringify(newUser));
    } else {
      await AsyncStorage.removeItem('userData');
    }
    setUserState(newUser);
  };

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('Error useAuth debe utilizarse dentro de un AuthProvider');
  }
  return context;
};

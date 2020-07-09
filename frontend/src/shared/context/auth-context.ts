import { createContext } from 'react';

export const AuthContext = createContext<{
  isLoggedIn: boolean;
  userId: any;
  token: any;
  login: (uid: any, token: any, expirationDate: any) => void;
  logout: () => void;
}>({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: (uid: any, token: any, expirationDate: any) => {},
  logout: () => {}
}); 

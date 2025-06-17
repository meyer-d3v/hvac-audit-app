import React, { createContext, ReactNode, useContext, useState } from 'react';

interface UserProviderProps {
    children: ReactNode,
}

interface User {
    name: string,
    email: string,
    number: string,
}

type UserContextType = {
    user : User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

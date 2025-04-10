import  { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  name: string;
  email: string;
  avatar?: string; // optional nếu muốn dùng avatar
};

type AppContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

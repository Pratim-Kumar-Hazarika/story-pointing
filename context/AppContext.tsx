import React, { createContext, useState, ReactNode, useContext } from "react";

interface AppContextInterface {
  user: {
    name: string;
    age: number;
  };
  createRoom: {
    username: string;
    roomCode: string;
  };
  joinRoom: {
    username: string;
    roomCode: string;
  };
  setUser: (user: { name: string; age: number }) => void;
  setRoom: (createRoom: { username: string; roomCode: string }) => void;
  setCreateRoom: (joinRoom: { username: string; roomCode: string }) => void;
  setJoinRoom: (joinRoom: { username: string; roomCode: string }) => void;
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AppContextInterface["user"]>({
    name: "",
    age: 0,
  });

  // State for the room creation
  const [createRoom, setCreateRoom] = useState<
    AppContextInterface["createRoom"]
  >({
    username: "",
    roomCode: "",
  });

  const [joinRoom, setJoinRoom] = useState<AppContextInterface["joinRoom"]>({
    username: "",
    roomCode: "",
  });

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        createRoom,
        setRoom: setCreateRoom,
        joinRoom,
        setCreateRoom,
        setJoinRoom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

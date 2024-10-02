import React, { createContext, useState, ReactNode, useContext } from "react";

interface AppContextInterface {
  user: {
    name: string;
    isModerator: boolean;
  };
  createRoom: {
    roomCode: string;
  };
  joinRoom: {
    roomCode: string;
  };
  setUser: (user: { name: string; isModerator: boolean }) => void;
  setRoom: (createRoom: { roomCode: string }) => void;
  setCreateRoom: (joinRoom: { roomCode: string }) => void;
  setJoinRoom: (joinRoom: { roomCode: string }) => void;
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AppContextInterface["user"]>({
    name: "",
    isModerator: false,
  });

  // State for the room creation
  const [createRoom, setCreateRoom] = useState<
    AppContextInterface["createRoom"]
  >({
    roomCode: "",
  });

  const [joinRoom, setJoinRoom] = useState<AppContextInterface["joinRoom"]>({
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

import { WebsocketManager } from "@/utils/WebsocketManager";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

//Reveal Votes
interface RevealVotesData {
  chartData: Array<{
    point: string;
    voters: Array<{
      name: string;
      id: string;
    }>;
  }>;
  title: string;
}
type User = {
  name: string;
  id: string;
};

interface AppContextInterface {
  user: {
    name: string;
    isModerator: boolean;
  };
  totalParticipants: User[];
  voted: User[];
  pending: User[];
  createRoom: {
    roomCode: string;
  };
  joinRoom: {
    roomCode: string;
  };
  started: boolean;
  activeCardNumber: number | null;
  revealVotes: RevealVotesData | null;
  setActiveCardNumber: (activeCardNumber: number | null) => void;
  setUser: (user: { name: string; isModerator: boolean }) => void;
  setRoom: (createRoom: { roomCode: string }) => void;
  setCreateRoom: (joinRoom: { roomCode: string }) => void;
  setJoinRoom: (joinRoom: { roomCode: string }) => void;
  setStarted: (started: boolean) => void;
  setRevealVotes: (data: RevealVotesData | null) => void;
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [activeCardNumber, setActiveCardNumber] =
    useState<AppContextInterface["activeCardNumber"]>(null);
  const [user, setUser] = useState<AppContextInterface["user"]>({
    name: "",
    isModerator: false,
  });
  const [started, setStarted] = useState<AppContextInterface["started"]>(false);
  const [totalParticipants, setTotalParticipants] = useState<
    AppContextInterface["totalParticipants"]
  >([]);
  const [voted, setVoted] = useState<AppContextInterface["voted"]>([]);
  const [pending, setPending] = useState<AppContextInterface["pending"]>([]);
  // State for the room creation
  const [createRoom, setCreateRoom] = useState<
    AppContextInterface["createRoom"]
  >({
    roomCode: "",
  });

  const [joinRoom, setJoinRoom] = useState<AppContextInterface["joinRoom"]>({
    roomCode: "",
  });

  // State for revealVotes
  const [revealVotes, setRevealVotes] = useState<RevealVotesData | null>(null);

  useEffect(() => {
    WebsocketManager.getInstance();
  }, []);

  ///Reveal Votes
  useEffect(() => {
    WebsocketManager.getInstance().registerCallBack(
      "revealVotes",
      (data: any) => {
        console.log("App context", data);
        setRevealVotes(data);
      },
      "revealVotes-1",
    );
    return () => {
      WebsocketManager.getInstance().deRegisterCallback(
        "revealVotes",
        "revealVotes-1",
      );
    };
  }, []);

  ///Total Participants,voted,pending
  useEffect(() => {
    WebsocketManager.getInstance().registerCallBack(
      "totalParticipants",
      (data: { total: User[]; voted: User[]; pending: User[] }) => {
        if (data.total) {
          setTotalParticipants(data.total);
        }
        if (data.voted) {
          setVoted(data.voted);
        }
        if (data.pending) {
          setPending(data.pending);
        }
      },
      "totalParticipants-1",
    );
    return () => {
      WebsocketManager.getInstance().deRegisterCallback(
        "totalParticipants",
        "totalParticipants-1",
      );
    };
  }, []);
  console.log("foi2enfn23nf32f", totalParticipants);
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
        activeCardNumber,
        setActiveCardNumber,
        started,
        setStarted,
        revealVotes, // Add revealVotes to the context
        setRevealVotes, // Add setter for revealVotes to the context
        totalParticipants,

        voted,
        pending,
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

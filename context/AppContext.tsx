import { useToast } from "@/hooks/use-toast";
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
  startEstimation: {
    started: boolean;
    title: string;
  };
  activeCardNumber: number | null;
  revealVotes: RevealVotesData | null;
  setActiveCardNumber: (activeCardNumber: number | null) => void;
  setUser: (user: { name: string; isModerator: boolean }) => void;
  setRoom: (createRoom: { roomCode: string }) => void;
  setCreateRoom: (joinRoom: { roomCode: string }) => void;
  setJoinRoom: (joinRoom: { roomCode: string }) => void;
  setRevealVotes: (data: RevealVotesData | null) => void;
}

const AppContext = createContext<AppContextInterface | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { toast } = useToast();
  const [activeCardNumber, setActiveCardNumber] =
    useState<AppContextInterface["activeCardNumber"]>(null);
  const [user, setUser] = useState<AppContextInterface["user"]>({
    name: "",
    isModerator: false,
  });
  const [startEstimation, setStartedEstimation] = useState<
    AppContextInterface["startEstimation"]
  >({
    title: "",
    started: false,
  });
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

  //Start Estimation
  useEffect(() => {
    WebsocketManager.getInstance().registerCallBack(
      "startEstimation",
      (data: { title: string }) => {
        if (data.title) {
          setStartedEstimation({
            title: data.title,
            started: true,
          });
        }
      },
      "startEstimation-1",
    );
    return () => {
      WebsocketManager.getInstance().deRegisterCallback(
        "startEstimation",
        "startEstimation-1",
      );
    };
  }, []);

  //End/Restimate
  useEffect(() => {
    WebsocketManager.getInstance().registerCallBack(
      "newEstimation",
      (data: { title: string; voted: User[]; pending: User[] }) => {
        setStartedEstimation({
          title: "",
          started: false,
        });
        if (data.voted) {
          setVoted(data.voted);
        }
        if (data.pending) {
          setPending(data.pending);
        }
      },
      "newEstimation-1",
    );
    return () => {
      WebsocketManager.getInstance().deRegisterCallback(
        "newEstimation",
        "newEstimation-1",
      );
    };
  }, []);

  //Reset Votes
  useEffect(() => {
    WebsocketManager.getInstance().registerCallBack(
      "resetVotes",
      (data: { voted: User[]; pending: User[] }) => {
        setActiveCardNumber(null);
        if (data.voted) {
          setVoted(data.voted);
        }
        if (data.pending) {
          setPending(data.pending);
        }
      },
      "resetVotes-1",
    );
    return () => {
      WebsocketManager.getInstance().deRegisterCallback(
        "resetVotes",
        "resetVotes-1",
      );
    };
  }, []);
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
        startEstimation,
        revealVotes,
        setRevealVotes,
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

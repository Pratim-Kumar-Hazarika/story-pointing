import { useToast } from "@/hooks/use-toast";
import { WebsocketManager } from "@/utils/WebsocketManager";
import { useRouter } from "next/navigation";

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
  isRoomActive: boolean;
  liveData: {
    ongoingSessions: number;
    totalPlayers: number;
  };
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
  rejoinDetails: {
    time: null | string;
  };
  reconnectDetails: {
    active: boolean; //Room
    isModerator: boolean;
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
  const router = useRouter();
  const [activeCardNumber, setActiveCardNumber] =
    useState<AppContextInterface["activeCardNumber"]>(null);
  const [user, setUser] = useState<AppContextInterface["user"]>({
    name: "",
    isModerator: false,
  });
  const [liveData, setLiveData] = useState<AppContextInterface["liveData"]>({
    ongoingSessions: 0,
    totalPlayers: 0,
  });
  const [rejoinDetails, setRejoinDetails] = useState<
    AppContextInterface["rejoinDetails"]
  >({
    time: "",
  });
  const [reconnectDetails, setReconnectDetails] = useState<
    AppContextInterface["reconnectDetails"]
  >({
    active: false,
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
  const [isRoomActive, setIsRoomActive] =
    useState<AppContextInterface["isRoomActive"]>(false);
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
        setRevealVotes(null);
        setStartedEstimation({
          title: "",
          started: false,
        });
        setActiveCardNumber(null);
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
        setRevealVotes(null);
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

  ///Ongoing Estimation
  useEffect(() => {
    WebsocketManager.getInstance().registerCallBack(
      "onGoingEstimation",
      (data: {
        voted: User[];
        pending: User[];
        title: string;
        time: string;
        chartData: any;
      }) => {
        if (data.title) {
          setStartedEstimation({
            title: data.title,
            started: true,
          });
        }
        setRejoinDetails({
          time: data.time,
        });
        if (data.voted.length >= 1) {
          setVoted(data.voted);
        }
        if (data.pending.length >= 1) {
          setPending(data.pending);
        }
        if (data.chartData.length >= 1) {
          setRevealVotes({
            chartData: data.chartData,
            title: data.title,
          });
        }
      },
      "onGoingEstimation-1",
    );
    return () => {
      WebsocketManager.getInstance().deRegisterCallback(
        "onGoingEstimation",
        "onGoingEstimation-1",
      );
    };
  }, []);

  //Reconnect...
  useEffect(() => {
    WebsocketManager.getInstance().registerCallBack(
      "reconnect",
      (data: { active: Boolean; isModerator: boolean }) => {
        if (data.active) {
          setReconnectDetails({
            active: true,
            isModerator: data.isModerator,
          });
        }
        if (data.active === false) {
          localStorage.removeItem("roomCode");
        }
      },
      "reconnect-1",
    );
    return () => {
      WebsocketManager.getInstance().deRegisterCallback(
        "reconnect",
        "reconnect-1",
      );
    };
  }, []);

  useEffect(() => {
    WebsocketManager.getInstance().registerCallBack(
      "noActiveRooms",
      (data: { rooms: null | Boolean; message: string; roomCode: string }) => {
        if (data.rooms === null) {
          toast({
            description: data.message,
          });
          setIsRoomActive(false);
        }
        if (data.rooms === true && data.roomCode) {
          setJoinRoom({
            roomCode: data.roomCode,
          });
          setIsRoomActive(true);
          toast({
            description: `Hey ${user.name} 👋 thanks for joining the session 🚀`,
          });
          router.replace(window.location.pathname);
        }
      },
      "noActiveRooms-1",
    );
    return () => {
      WebsocketManager.getInstance().deRegisterCallback(
        "noActiveRooms",
        "noActiveRooms-1",
      );
    };
  }, []);

  useEffect(() => {
    WebsocketManager.getInstance().registerCallBack(
      "liveData",
      (data: { ongoingSessions: number; totalPlayers: number }) => {
        setLiveData((prev) => ({
          ongoingSessions: data.ongoingSessions,
          totalPlayers: data.totalPlayers,
        }));
      },
      "liveData-1",
    );
    return () => {
      WebsocketManager.getInstance().deRegisterCallback(
        "liveData",
        "liveData-1",
      );
    };
  }, []);
  return (
    <AppContext.Provider
      value={{
        liveData,
        isRoomActive,
        rejoinDetails,
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
        reconnectDetails,
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

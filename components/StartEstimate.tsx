import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/context/AppContext";
import { WebsocketManager } from "@/utils/WebsocketManager";
import dayjs from "dayjs";
import { useMediaQuery } from "react-responsive";
function StartEstimate() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const isSmallScreen = useMediaQuery({ maxWidth: 920 });
  const isExtraSmallScreen = useMediaQuery({ maxWidth: 570 });
  const isExtraExtraSmallScreen = useMediaQuery({ maxWidth: 450 });
  const { createRoom, startEstimation, user, voted, pending, rejoinDetails } =
    useAppContext();
  function startClickHandler() {
    const startEstimationPayload = {
      method: "SENDMESSAGE",
      data: {
        channelId: createRoom.roomCode,
        title: title,
      },
    };
    WebsocketManager.getInstance().sendMessage(startEstimationPayload);
    setIsStarted(true);
    toast({
      description: "Estimation started ⏰",
    });
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isStarted) {
      intervalId = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isStarted]);

  // Format elapsed time to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  function resetVotesHandler() {
    const resetVotesPayload = {
      method: "SENDMESSAGE",
      data: {
        channelId: createRoom.roomCode,
        reset: true,
      },
    };
    WebsocketManager.getInstance().sendMessage(resetVotesPayload);
    toast({
      description: "Votes resetted successfully.",
    });
  }
  function revealVotesHander() {
    if (voted.length === 0) {
      toast({
        description: "No votes to reveal yet.",
      });
      return;
    }
    const revealVotesPayload = {
      method: "SENDMESSAGE",
      data: {
        channelId: createRoom.roomCode,
        reveal: true,
      },
    };
    WebsocketManager.getInstance().sendMessage(revealVotesPayload);
    toast({
      description: "Votes revealed 🚀",
    });
  }

  function endEstimationHandler() {
    const endEstimationPayload = {
      method: "SENDMESSAGE",
      data: {
        channelId: createRoom.roomCode,
        newEstimation: true,
      },
    };
    WebsocketManager.getInstance().sendMessage(endEstimationPayload);
    setTitle("");
    setIsStarted(false);
    setElapsedTime(0);
  }
  useEffect(() => {
    if (user.isModerator && startEstimation.started) {
      if (!isStarted) {
        setIsStarted(true);
        setTitle(startEstimation.title);
      }
    }
  }, [startEstimation.started, startEstimation.title]);

  // Rejoin logic: check if the user is reconnecting
  useEffect(() => {
    if (rejoinDetails && rejoinDetails.time && startEstimation.title) {
      setTitle(startEstimation.title);
      const startTime = dayjs(rejoinDetails.time);
      const now = dayjs();
      const elapsed = now.diff(startTime, "second");
      setElapsedTime(elapsed);
      setIsStarted(true);
    }
  }, [rejoinDetails]);

  return (
    <div className=" ">
      <div
        className={`${isExtraSmallScreen ? " flex flex-col items-center gap-2" : "flex"} gap-4 mt-5 `}
      >
        <div>
          <Input
            className={`border-neutral-800 ${isSmallScreen ? "w-[300px]" : "w-[450px] max-w-[500px]"} ${isExtraSmallScreen && "w-full "}   text-transparent text-opacity-90 text-white from-neutral-400 to-white`}
            id="StoryTitle"
            placeholder="Enter title for estimation"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="bg-clip-text bg-gradient-to-b text-transparent from-neutral-400 to-white text-sm tracking-tight">
            *Enter the title/link/topic for estimating*
          </div>
        </div>
        <Button
          disabled={isStarted || !title} // Disable when estimation starts
          onClick={startClickHandler}
          variant="outline"
          className="border-neutral-800 w-[125px]"
        >
          {isStarted ? `Started (${formatTime(elapsedTime)})` : "Start "}
        </Button>
      </div>

      <div
        className={`flex gap-4 mt-5   justify-around ${isExtraExtraSmallScreen && "grid grid-rows-3 grid-cols-1"}`}
      >
        <Button
          disabled={voted.length === 0}
          onClick={() => resetVotesHandler()}
          variant="outline"
          className="border-neutral-800"
        >
          Reset Votes
        </Button>
        <Button
          onClick={() => revealVotesHander()}
          variant="outline"
          className="border-neutral-800"
        >
          Reveal Votes
        </Button>
        <Button
          onClick={() => endEstimationHandler()}
          variant="outline"
          className="border-neutral-800  min-w-max"
          disabled={!isStarted} // Enable only if estimation has started
        >
          End Estimation
        </Button>
      </div>
    </div>
  );
}

export default StartEstimate;

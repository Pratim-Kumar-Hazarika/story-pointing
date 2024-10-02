import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/context/AppContext";
import { WebsocketManager } from "@/utils/WebsocketManager";

function StartEstimate() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { createRoom } = useAppContext();

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
      description: "Votes resetted 🏳️",
    });
  }
  function revealVotesHander() {
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
  return (
    <div>
      <div className="flex gap-4 mt-5 ">
        <Input
          className="border-neutral-800 w-[450px] max-w-[500px]"
          id="StoryTitle"
          placeholder="Enter title for estimation"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          disabled={isStarted || !title} // Disable when estimation starts
          onClick={startClickHandler}
          variant="outline"
          className="border-neutral-800 w-[125px]"
        >
          {isStarted
            ? `Started (${formatTime(elapsedTime)})`
            : "Start Estimation"}
        </Button>
      </div>
      <div className="bg-clip-text bg-gradient-to-b text-transparent from-neutral-400 to-white text-sm tracking-tight">
        *Enter the title/link/topic for estimating*
      </div>

      <div className="flex gap-4 mt-5   justify-around">
        <Button
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

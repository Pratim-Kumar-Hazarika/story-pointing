import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/context/AppContext";
import dayjs from "dayjs";

function ShowTitle() {
  const { startEstimation, rejoinDetails } = useAppContext();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  function startClickHandler() {
    setIsStarted(true);
    toast({
      description: "Estimation started ⏰",
    });
  }
  useEffect(() => {
    if (startEstimation.title && startEstimation.started) {
      startClickHandler();
    }
    if (!startEstimation.title && !startEstimation.started) {
      newEstimationHandler();
    }
  }, [startEstimation.started, startEstimation.title]);

  function newEstimationHandler() {
    setTitle("");
    setIsStarted(false);
    setElapsedTime(0);
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

  // Format elapsed time to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-center  w-full gap-4 mt-5 ">
      <Input
        className="border-neutral-800 w-[600px] max-w-[600px]   text-transparent text-opacity-90 text-white from-neutral-400 to-white"
        id="StoryTitle"
        placeholder="Title will appear here 🔖"
        type="text"
        value={startEstimation.title}
        readOnly
      />
      <div className="flex items-center justify-center">
        <Button
          disabled={isStarted || !title} // Disable when estimation starts
          onClick={startClickHandler}
          variant="outline"
          className="border-neutral-800 w-[125px]"
        >
          {isStarted
            ? `Started (${formatTime(elapsedTime)})`
            : "Not Started ⏰"}
        </Button>
      </div>
    </div>
  );
}

export default ShowTitle;

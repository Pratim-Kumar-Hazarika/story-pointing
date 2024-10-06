import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { useMediaQuery } from "react-responsive";

function ShareLink() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("roomCode");
  const [buttonText, setButtonText] = useState("Copy");
  const { createRoom, joinRoom } = useAppContext();
  const isSmallScreen = useMediaQuery({ maxWidth: 920 });
  const isExtraSmallScreen = useMediaQuery({ maxWidth: 570 });
  const link = `${window.location.origin}?roomCode=${createRoom.roomCode || joinRoom.roomCode}`;
  function copyClickHandler() {
    navigator.clipboard.writeText(link).then(() => {
      toast({
        description: "Ctrl+V the link with your team to join the room 🚀",
      });
      setButtonText("Copied");
      setTimeout(() => {
        setButtonText("Copy");
      }, 3000);
    });
  }

  return (
    <div>
      <div
        className={`${isExtraSmallScreen ? " flex flex-col items-center gap-2" : "flex"} gap-4 mt-5 `}
      >
        <div>
          <Input
            className={`border-neutral-800 ${isSmallScreen ? "w-[300px]" : "w-[450px] max-w-[500px]"} ${isExtraSmallScreen && "w-full "}   text-transparent text-opacity-90 text-white from-neutral-400 to-white`}
            id="StoryTitle"
            placeholder="Enter title for estimation"
            type="text"
            value={link}
            readOnly
          />
          <div className="bg-clip-text bg-gradient-to-b text-transparent from-neutral-400 to-white text-sm tracking-tight">
            Share this link with your team to join the room
          </div>
        </div>
        <Button
          onClick={copyClickHandler}
          variant="outline"
          className="border-neutral-800 w-[125px]"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default ShareLink;

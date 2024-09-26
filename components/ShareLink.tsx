import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

function ShareLink() {
  const { toast } = useToast();
  const [buttonText, setButtonText] = useState("Copy");

  function copyClickHandler() {
    const link = window.location.href;
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
    <div className="mt-10 ">
      <div className="flex gap-4 mt-2">
        <Input
          className="border-neutral-800 w-[450px] max-w-[500px] text-transparent text-opacity-90 text-white from-neutral-400 to-white"
          id="StoryTitle"
          placeholder="Enter title for estimation"
          type="text"
          value={window.location.href}
          readOnly
        />
        <Button
          onClick={copyClickHandler}
          variant="outline"
          className="border-neutral-800 w-[125px]"
        >
          {buttonText}
        </Button>
      </div>
      <div className="bg-clip-text bg-gradient-to-b text-transparent from-neutral-400 to-white text-sm tracking-tight">
        Share this link with your team to join the room
      </div>
    </div>
  );
}

export default ShareLink;

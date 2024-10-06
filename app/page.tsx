"use client";
import React, { Suspense } from "react";
import Join from "@/components/join/Join";
import Voting from "@/components/voting/Voting";
import { useAppContext } from "@/context/AppContext";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const { createRoom, joinRoom } = useAppContext();
  const isSmallScreen = useMediaQuery({ maxWidth: 856 });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {createRoom.roomCode || joinRoom.roomCode ? <Voting /> : <Join />}
    </Suspense>
  );
}

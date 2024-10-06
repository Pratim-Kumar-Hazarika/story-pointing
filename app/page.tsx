"use client";
import React, { Suspense } from "react";
import Join from "@/components/join/Join";
import Voting from "@/components/voting/Voting";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const { createRoom, joinRoom } = useAppContext();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {createRoom.roomCode || joinRoom.roomCode ? <Voting /> : <Join />}
    </Suspense>
  );
}

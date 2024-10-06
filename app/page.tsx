"use client";
import Join from "@/components/join/Join";
import Voting from "@/components/voting/Voting";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
  const { createRoom, joinRoom } = useAppContext();
  return (
    <>{createRoom.roomCode || joinRoom.roomCode ? <Voting /> : <Join />}</>
  );
}

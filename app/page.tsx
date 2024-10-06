"use client";
import Join from "@/components/join/Join";
import Voting from "@/components/voting/Voting";
import { useAppContext } from "@/context/AppContext";
import { useMediaQuery } from "react-responsive";
export default function Home() {
  const { createRoom, joinRoom } = useAppContext();
  const isSmallScreen = useMediaQuery({ maxWidth: 800 });

  return (
    <>{createRoom.roomCode || joinRoom.roomCode ? <Voting /> : <Join />}</>
  );
}

"use client";
import React, { Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { JoinRoom } from "@/components/JoinRoom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CreateRoom } from "@/components/CreateRoom";
import { useSearchParams } from "next/navigation";
import { Rejoin } from "../Rejoin";
import { useAppContext } from "@/context/AppContext";
import { useMediaQuery } from "react-responsive";
import { AccordionDemo } from "../AccordianFaq";
type Tabs = "Create Room" | "Join Room" | "Rejoin Room";
function Join() {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("roomCode");
  const [localRoomCode, setLocalRoom] = useState("");
  const { reconnectDetails } = useAppContext();
  const [active, setActive] = useState<Tabs>("Create Room");
  const isSmallScreen = useMediaQuery({ maxWidth: 770 });
  useEffect(() => {
    if (roomCode) {
      setActive("Join Room");
    }
  }, [roomCode, localRoomCode]);
  useEffect(() => {
    if (reconnectDetails.active) {
      setActive("Rejoin Room");
    }
  }, [reconnectDetails]);
  useEffect(() => {
    const roomCode = localStorage.getItem("roomCode");
    if (roomCode) {
      setLocalRoom(roomCode);
    }
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className={`container relative    h-screen flex-col items-center justify-center grid max-w-none ${isSmallScreen ? "grid-cols-1 " : "grid-cols-2 "} `}
      >
        <div className="relative  min-h-full flex-col bg-muted p-10 text-white dark:-r lg:flex">
          <div
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4)), url(/tryestimate.png)",
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
              opacity: 0.8,
            }}
            className="absolute inset-0 bg-neutral-900"
          />

          <div className="relative z-20 flex items-center text-lg font-medium">
            <h2 className="bg-clip-text  text-transparent text-center bg-gradient-to-b  from-neutral-400 to-white text-4xl  font-sans   relative z-20 font-bold tracking-tight">
              Estimate
            </h2>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Empowering Teams with Accurate, Real-Time Story
                Pointing.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
        {/* <div className="  items-center flex flex-col  justify-center  ">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div
              className={cn(
                "flex flex-row px-4   items-center justify-center space-x-2  ",
              )}
            >
              {[
                "Create Room",
                reconnectDetails.active ? "Rejoin Room" : "Join Room",
              ].map((tab, idx) => (
                <button
                  key={`${tab}-${idx}`}
                  onClick={() => {
                    setActive(tab as Tabs);
                  }}
                  className={cn(
                    "relative px-4 py-2 rounded-full",
                    { "bg-zinc-800": active === tab },
                    active === tab ? "" : "",
                  )}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {active === tab && (
                    <motion.div
                      layoutId="clickedbutton"
                      transition={{
                        type: "spring",
                        bounce: 0.3,
                        duration: 0.6,
                      }}
                      className={cn(
                        "absolute inset-0 bg-zinc-800 rounded-full ",
                      )}
                    />
                  )}
                  <span className="relative block text-white text-sm">
                    {tab}
                  </span>
                </button>
              ))}
            </div>
            <div className="    flex items-center justify-center ">
              {active === "Join Room" && !reconnectDetails.active && (
                <JoinRoom />
              )}
              {active === "Rejoin Room" && reconnectDetails.active && (
                <Rejoin />
              )}
              {active === "Create Room" && <CreateRoom />}
            </div>
          </div>
        </div> */}
        <div className=" flex flex-col items-center justify-center  ">
          <h2 className="bg-clip-text  bg-gradient-to-b  py-4  text-transparent  from-neutral-400 to-white text-3xl  font-bold tracking-tight">
            Frequenty Asked Questions
          </h2>
          <AccordionDemo />
          <div className="mt-7">
            <h2 className="bg-clip-text text-center  bg-gradient-to-b  py-4  text-transparent  from-neutral-400 to-white text-3xl  font-bold tracking-tight">
              Current
            </h2>
            <div className=" text-white text-sm leading-7 bg-gradient-to-b text-transparent from-neutral-400 to-white tracking-tight bg-clip-text">
              <div className="flex justify-between gap-5">
                <div className="">Ongoing Sessions </div>
                <div className="bg-clip-text text-center  slow-pulse   bg-gradient-to-b   text-transparent  from-neutral-400  to-green-400  font-bold tracking-tight">
                  100{" "}
                </div>
              </div>
              <div className="flex justify-between gap-5">
                <div className="">Total Players </div>
                <div className="bg-clip-text text-center slow-pulse bg-gradient-to-b   text-transparent  from-neutral-400  to-green-400 font-bold tracking-tight">
                  100{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7">
            <h2 className="bg-clip-text text-center  bg-gradient-to-b  py-4  text-transparent  from-neutral-400 to-white text-3xl  font-bold tracking-tight">
              History
            </h2>
            <div className=" text-white text-sm leading-7 bg-gradient-to-b text-transparent from-neutral-400 to-white tracking-tight bg-clip-text">
              <div className="flex justify-between gap-5">
                <div className="">Total Sessions </div>
                <div className="bg-clip-text text-center     bg-gradient-to-b   text-transparent  from-neutral-400  to-white  font-bold tracking-tight">
                  100{" "}
                </div>
              </div>
              <div className="flex justify-between gap-5">
                <div className="">Total Players </div>
                <div className="bg-clip-text text-center  bg-gradient-to-b   text-transparent  from-neutral-400  to-white font-bold tracking-tight">
                  100{" "}
                </div>
              </div>
              <div className="flex justify-between gap-5">
                <div className="">Total Votes </div>
                <div className="bg-clip-text text-center  bg-gradient-to-b   text-transparent  from-neutral-400  to-white font-bold tracking-tight">
                  100{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Join;

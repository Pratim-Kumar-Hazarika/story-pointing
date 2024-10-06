"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { JoinRoom } from "@/components/JoinRoom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CreateRoom } from "@/components/CreateRoom";
import { useSearchParams } from "next/navigation";
type Tabs = "Create Room" | "Join Room";
function Join() {
  const searchParams = useSearchParams();
  const roomCode = searchParams.get("roomCode");
  const [active, setActive] = useState<Tabs>("Join Room");
  useEffect(() => {
    if (roomCode) {
      setActive("Join Room");
    }
  }, [roomCode]);
  return (
    <>
      <div className="md:hidden  ">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden   h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
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
        <div className="lg:p-8  ">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div
              className={cn(
                "flex flex-row px-4  items-center justify-center space-x-2  ",
              )}
            >
              {["Create Room", "Join Room"].map((tab, idx) => (
                <button
                  key={tab}
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
            <div className="w-[500px] ">
              {active === "Join Room" ? <JoinRoom /> : <CreateRoom />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Join;

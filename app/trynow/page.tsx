"use client";
import { ChartDemo } from "@/components/ChartDemo";
import { JoinRoom } from "@/components/JoinRoom";
import LeftSideBar from "@/components/LeftSideBar";
import { PricingCards } from "@/components/PricingCard";
import { StickyScrollRevealDemo } from "@/components/StickyScrollDemo";
import VotesTable from "@/components/Table";
import { VoteCards } from "@/components/VoteCards";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import React, { useState } from "react";

function Page() {
  const [showVotes, setShowVotes] = useState(true);
  const { revealVotes } = useAppContext();
  return (
    <div className="relative min-h-screen flex flex-col  ">
      <div className=" flex justify-between w-full py-3 px-4 text-white ">
        <h2 className="bg-clip-text text-center bg-gradient-to-b   text-transparent  from-neutral-400 to-white text-3xl  font-bold tracking-tight">
          Estimate
        </h2>
      </div>

      <div className="   flex  px-4  gap-5 mt-[30px] relative">
        <LeftSideBar />
        <div className=" flex flex-col  gap-4">
          {revealVotes === null ? (
            <VoteCards />
          ) : (
            <>
              {" "}
              <ChartDemo />
              <VotesTable />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;

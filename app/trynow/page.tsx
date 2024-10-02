"use client";
import { ChartDemo } from "@/components/ChartDemo";
import { JoinRoom } from "@/components/JoinRoom";
import LeftSideBar from "@/components/LeftSideBar";
import { PricingCards } from "@/components/PricingCard";
import { StickyScrollRevealDemo } from "@/components/StickyScrollDemo";
import VotesTable from "@/components/Table";
import { VoteCards } from "@/components/VoteCards";
import Link from "next/link";
import React, { useState } from "react";

function Page() {
  const [showVotes, setShowVotes] = useState(true);
  return (
    <div className="relative min-h-screen flex flex-col  ">
      <div className=" flex justify-between w-full py-3 px-4 text-white ">
        <h2 className="bg-clip-text text-center bg-gradient-to-b   text-transparent  from-neutral-400 to-white text-3xl  font-bold tracking-tight">
          Estimate
        </h2>
        {/* <div className="flex gap-4 px-5  font-medium">
          {" "}
          <div className="flex items-end justify-end gap-4 z-[100]   text-sm  font-medium text-neutral-400    ">
            <div
              onClick={() => setShowVotes((prev) => !prev)}
              className="  cursor-pointer   flex items-center justify-center "
            >
              {!showVotes ? " Show Votes" : "Show Chart"}
            </div>
            <Link href={"/signin"}>
              <div className="      cursor-pointer flex items-center justify-center  ">
                Sign In
              </div>
            </Link>
          </div>
        </div> */}
      </div>

      <div className="   flex  px-4  gap-5 mt-[30px] relative">
        <LeftSideBar />
        <div className=" flex flex-col  gap-4">
          {showVotes ? (
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

"use client";
import { ChartDemo } from "@/components/ChartDemo";
import LeftSideBar from "@/components/LeftSideBar";
import VotesTable from "@/components/Table";
import { VoteCards } from "@/components/VoteCards";
import { useAppContext } from "@/context/AppContext";
import React, { useState } from "react";

function Page() {
  const { revealVotes } = useAppContext();
  return (
    <div className="relative min-h-screen flex flex-col  border  border-white">
      <div className=" flex justify-between w-full py-3 px-4 text-white ">
        <h2 className="bg-clip-text text-center bg-gradient-to-b   text-transparent  from-neutral-400 to-white text-3xl  font-bold tracking-tight">
          Estimate
        </h2>
      </div>

      <div className="   flex  px-4  gap-5 mt-[30px] relative">
        <LeftSideBar />
        <div className=" flex flex-col  gap-4">
          {revealVotes === null ? (
            <>
              <ChartDemo />
              <VotesTable />
            </>
          ) : (
            <> {/* <VoteCards /> */}</>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;

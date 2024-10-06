import { useAppContext } from "@/context/AppContext";
import React from "react";
import LeftSideBar from "../LeftSideBar";
import { VoteCards } from "../VoteCards";
import { ChartDemo } from "../ChartDemo";
import VotesTable from "../Table";
import { useMediaQuery } from "react-responsive";

function Voting() {
  const { revealVotes } = useAppContext();
  const isSmallScreen = useMediaQuery({ maxWidth: 920 });
  return (
    <div className="       px-2 ">
      <h2 className="bg-clip-text  bg-gradient-to-b  py-4  text-transparent  from-neutral-400 to-white text-3xl  font-bold tracking-tight">
        Estimate
      </h2>

      <div className=" w-full custom-scrollbar overflow-x-hidden overflow-y-scroll  h-[calc(90vh_-_10px)]">
        <div
          className={`${isSmallScreen ? " flex flex-col gap-4" : "flex   gap-4"}`}
        >
          <LeftSideBar />
          {revealVotes === null ? (
            <VoteCards />
          ) : (
            <div className="flex flex-col gap-5">
              <ChartDemo />
              <VotesTable />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Voting;

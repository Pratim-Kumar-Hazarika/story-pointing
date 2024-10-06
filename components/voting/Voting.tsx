import { useAppContext } from "@/context/AppContext";
import React from "react";
import LeftSideBar from "../LeftSideBar";
import { VoteCards } from "../VoteCards";
import { ChartDemo } from "../ChartDemo";
import VotesTable from "../Table";
import { useResponsive } from "@/hooks/useResponsive";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

function Voting() {
  const { revealVotes } = useAppContext();
  const { isSmallScreen } = useResponsive();
  console.log(isSmallScreen);
  return (
    <div className="relative min-h-screen flex flex-col  ">
      <div className=" flex justify-between w-full py-3 px-4 text-white ">
        <h2 className="bg-clip-text text-center bg-gradient-to-b   text-transparent  from-neutral-400 to-white text-3xl  font-bold tracking-tight">
          Estimate
        </h2>
      </div>

      <div
        className={`   flex ${isSmallScreen ? " flex-col" : ""}  px-4  gap-5 mt-[30px] relative`}
      >
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

export default Voting;

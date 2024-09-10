"use client";

import LeftSideBar from "@/components/LeftSideBar";
import { VoteCards } from "@/components/VoteCards";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col  ">
      <div className=" flex justify-between w-full py-3 px-4 text-white ">
        <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b  from-neutral-400 to-white text-3xl  font-bold tracking-tight">
          Estimate
        </h2>
        <div className="flex gap-4 px-5 mt-2 font-medium">
          {" "}
          <div className="   text-sm  flex items-center justify-center">
            Product
          </div>
          <div className="   text-sm  flex items-center justify-center">
            Pricing
          </div>
        </div>
      </div>
      <div className="   flex  px-4  gap-5 mt-[30px] relative">
        <LeftSideBar />
        <div className=" flex flex-col  gap-4">
          <VoteCards />
          {/* <ChartDemo/> 
            <VotesTable/>  */}
        </div>
      </div>
    </div>
  );
}

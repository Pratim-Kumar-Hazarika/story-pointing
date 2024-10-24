import { useAppContext } from "@/context/AppContext";
import React from "react";

function WhyUs() {
  const { liveData } = useAppContext();
  return (
    <div className=" h-[400px]">
      <div className="">
        <h2 className="bg-clip-text  bg-gradient-to-b    text-transparent  from-neutral-400 to-white text-3xl  font-bold tracking-tight">
          &quot;Peek at the data and our impact!&ldquo;
          <span className="  text-white animate-pulse"> ⚡️</span>
        </h2>
        <h2 className="bg-clip-text mt-3  text-center  bg-gradient-to-b   text-transparent  from-neutral-400 to-white text-xl  font-bold tracking-tight">
          Current
        </h2>
        <div className="py-1 text-white text-sm leading-7 bg-gradient-to-b text-transparent from-neutral-400 to-white tracking-tight bg-clip-text">
          <div className="flex justify-between gap-5">
            <div className="  bg-gradient-to-b   text-transparent  from-neutral-400 to-white  tracking-tight bg-clip-text">
              Ongoing Sessions{" "}
            </div>
            <div className="bg-clip-text text-center  slow-pulse   bg-gradient-to-b   text-transparent  from-neutral-400  to-green-400  font-bold tracking-tight">
              {liveData.ongoingSessions}{" "}
            </div>
          </div>
          <div className="flex justify-between gap-5">
            <div className=" bg-gradient-to-b   text-transparent  from-neutral-400 to-white  tracking-tight bg-clip-text">
              Total Players{" "}
            </div>
            <div className="bg-clip-text text-center slow-pulse bg-gradient-to-b   text-transparent  from-neutral-400  to-green-400 font-bold tracking-tight">
              {liveData.totalPlayers}{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="bg-clip-text text-center  bg-gradient-to-b    text-transparent  from-neutral-400 to-white text-xl  font-bold tracking-tight">
          History
        </h2>
        <div className=" text-white text-sm leading-7 bg-gradient-to-b text-transparent from-neutral-400 to-white tracking-tight bg-clip-text">
          <div className="flex justify-between gap-5">
            <div className="bg-gradient-to-b   text-transparent  from-neutral-400 to-white  tracking-tight bg-clip-text">
              Total Sessions{" "}
            </div>
            <div className="bg-clip-text text-center     bg-gradient-to-b   text-transparent  from-neutral-400  to-white  font-bold tracking-tight">
              100{" "}
            </div>
          </div>
          <div className="flex justify-between gap-5">
            <div className="bg-gradient-to-b   text-transparent  from-neutral-400 to-white  tracking-tight bg-clip-text">
              Total Players{" "}
            </div>
            <div className="bg-clip-text text-center  bg-gradient-to-b   text-transparent  from-neutral-400  to-white font-bold tracking-tight">
              100{" "}
            </div>
          </div>
          <div className="flex justify-between gap-5">
            <div className="bg-gradient-to-b   text-transparent  from-neutral-400 to-white  tracking-tight bg-clip-text">
              Total Votes{" "}
            </div>
            <div className="bg-clip-text text-center  bg-gradient-to-b   text-transparent  from-neutral-400  to-white font-bold tracking-tight">
              100{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;

"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ScrollAreaDemo from "./ScrollAreaDemo";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/context/AppContext";
import { useMediaQuery } from "react-responsive";

type User = {
  name: string;
  id: string;
};

function LeftSideBar() {
  const { totalParticipants, pending, voted } = useAppContext();
  const [active, setActive] = useState<any>("Total");
  const isSmallScreen = useMediaQuery({ maxWidth: 920 });
  return (
    <div className="bg-black border border-neutral-800 rounded-md text-white  min-w-max  z-[100] py-0">
      <div className="text-white  bg-black   mt-2  px-4">
        <div className={cn("flex flex-col items-center mb-4")}>
          <button
            onClick={() => setActive("Total")}
            className={cn(
              "relative px-4 py-2 rounded-full ",
              { "bg-zinc-800": active.value === "Total" },
              active === "Total" ? "" : "",
            )}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active === "Total" && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn("absolute inset-0 bg-zinc-800 rounded-full ")}
              />
            )}
            <span className="relative block text-sm text-white">
              Total ({totalParticipants?.length ?? 0})
            </span>
          </button>
        </div>
        <div
          className={cn(
            "flex flex-row px-4  items-center justify-center space-x-2  ",
          )}
        >
          {["Voted", "Pending"].map((tab, idx) => (
            <button
              key={tab}
              onClick={() => {
                setActive(tab);
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
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className={cn("absolute inset-0 bg-zinc-800 rounded-full ")}
                />
              )}
              <span className="relative block text-white text-sm">
                {tab} (
                {tab === "Voted"
                  ? (voted?.length ?? 0)
                  : (pending?.length ?? 0)}
                )
              </span>
            </button>
          ))}
        </div>
        <ScrollAreaDemo
          containerClassName="w-full"
          className={` ${isSmallScreen ? "h-[calc(100vh_-_500px)]" : "h-[calc(100vh_-_200px)]"} `}
        >
          <div className="flex flex-col items-start gap-4 py-7">
            {/* Total Participants */}
            {active === "Total" &&
            totalParticipants?.length &&
            totalParticipants.length >= 1
              ? totalParticipants.map((user, index) => (
                  <User tick={null} type="Total" key={index} name={user.name} />
                ))
              : active === "Total" && (
                  <div className="text-sm w-full text-center">
                    No one joined till now!!
                  </div>
                )}

            {/* Pending Participants */}
            {active === "Pending" && pending?.length && pending.length >= 1
              ? pending?.map((user, index) => (
                  <User
                    tick={false}
                    type="Pending"
                    key={index}
                    name={user.name}
                  />
                ))
              : active === "Pending" && (
                  <div className="text-sm w-full text-center">
                    Voting not started!!
                  </div>
                )}

            {/* Voted Participants */}
            {active === "Voted" && voted?.length && voted.length >= 1
              ? voted?.map((user, index) => (
                  <User tick={true} type="Voted" key={index} name={user.name} />
                ))
              : active === "Voted" && (
                  <div className="text-sm w-full text-center">
                    Voting not started!!
                  </div>
                )}
          </div>
        </ScrollAreaDemo>
      </div>
    </div>
  );
}

function User({
  name,
  tick,
  type,
}: {
  name: string;
  tick?: boolean | null;
  type: "Total" | "Voted" | "Pending";
}) {
  return (
    <div className="font-medium flex    w-full  justify-between   ">
      <div className=" flex  justify-start  line-clamp-1   text-ellipsis truncate text-sm">
        {" "}
        {name}{" "}
      </div>
      {type === "Total" && (
        <div className=" flex  mb-[-1px] justify-end z-50"> 👤</div>
      )}

      {type !== "Total" && (
        <div className="   flex   slow-pulse  justify-end z-50">
          {tick ? <Confirm /> : <Pending />}
        </div>
      )}
    </div>
  );
}

export default LeftSideBar;

export function Confirm() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="23"
      height="23"
      viewBox="0 0 32 32"
    >
      <linearGradient
        id="ONeHyQPNLkwGmj04dE6Soa_2Tv2g4T4Wtu0_gr1"
        x1="16"
        x2="16"
        y1="2.888"
        y2="29.012"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#36eb69"></stop>
        <stop offset="1" stop-color="#1bbd49"></stop>
      </linearGradient>
      <circle
        cx="16"
        cy="16"
        r="13"
        fill="url(#ONeHyQPNLkwGmj04dE6Soa_2Tv2g4T4Wtu0_gr1)"
      ></circle>
      <linearGradient
        id="ONeHyQPNLkwGmj04dE6Sob_2Tv2g4T4Wtu0_gr2"
        x1="16"
        x2="16"
        y1="3"
        y2="29"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-opacity=".02"></stop>
        <stop offset="1" stop-opacity=".15"></stop>
      </linearGradient>
      <path
        fill="url(#ONeHyQPNLkwGmj04dE6Sob_2Tv2g4T4Wtu0_gr2)"
        d="M16,3.25c7.03,0,12.75,5.72,12.75,12.75 S23.03,28.75,16,28.75S3.25,23.03,3.25,16S8.97,3.25,16,3.25 M16,3C8.82,3,3,8.82,3,16s5.82,13,13,13s13-5.82,13-13S23.18,3,16,3 L16,3z"
      ></path>
      <g opacity=".2">
        <linearGradient
          id="ONeHyQPNLkwGmj04dE6Soc_2Tv2g4T4Wtu0_gr3"
          x1="16.502"
          x2="16.502"
          y1="11.26"
          y2="20.743"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-opacity=".1"></stop>
          <stop offset="1" stop-opacity=".7"></stop>
        </linearGradient>
        <path
          fill="url(#ONeHyQPNLkwGmj04dE6Soc_2Tv2g4T4Wtu0_gr3)"
          d="M21.929,11.26 c-0.35,0-0.679,0.136-0.927,0.384L15,17.646l-2.998-2.998c-0.248-0.248-0.577-0.384-0.927-0.384c-0.35,0-0.679,0.136-0.927,0.384 c-0.248,0.248-0.384,0.577-0.384,0.927c0,0.35,0.136,0.679,0.384,0.927l3.809,3.809c0.279,0.279,0.649,0.432,1.043,0.432 c0.394,0,0.764-0.153,1.043-0.432l6.813-6.813c0.248-0.248,0.384-0.577,0.384-0.927c0-0.35-0.136-0.679-0.384-0.927 C22.608,11.396,22.279,11.26,21.929,11.26L21.929,11.26z"
        ></path>
      </g>
      <path
        fill="#fff"
        d="M10.325,14.825L10.325,14.825c0.414-0.414,1.086-0.414,1.5,0L15,18l6.179-6.179	c0.414-0.414,1.086-0.414,1.5,0l0,0c0.414,0.414,0.414,1.086,0,1.5l-6.813,6.813c-0.478,0.478-1.254,0.478-1.732,0l-3.809-3.809	C9.911,15.911,9.911,15.239,10.325,14.825z"
      ></path>
    </svg>
  );
}

export function Pending() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="23"
      height="23"
      viewBox="0 0 48 48"
    >
      <path
        fill="#f44336"
        d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
      ></path>
      <path
        fill="#fff"
        d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
      ></path>
      <path
        fill="#fff"
        d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
      ></path>
    </svg>
  );
}

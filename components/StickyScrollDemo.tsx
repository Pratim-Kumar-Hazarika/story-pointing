"use client";
import React from "react";

import Image from "next/image";
import { StickyScroll } from "./SitckyScroll";
import { HoverBorderGradient } from "./HoverBorderGradient";

const content = [
  {
    title: "Live Estimates",
    description:
      "Get live estimates as team members update their story points in real-time, ensuring accurate, up-to-date projections for better planning and decision-making.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/live.png"
          width={300}
          height={300}
          className="h-full w-full object-cover border-none "
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Story Pointing",
    description:
      "Estimate allows teams to assign and update story points in real-time, ensuring that everyone stays in sync during the planning process. With seamless point submissions and instant updates, team members can quickly adjust estimates without disrupting the workflow",
    content: (
      <div className="h-full w-full  bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
       <Image
          src="/points.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Visualization",
    description:
      "Visualize progress in with updating charts, providing clear and instant insights into team performance as story points are assigned and adjusted.",
    content: (
      <div className="h-full w-full   rounded-md  flex items-center justify-center text-white">
        <Image
          src="/chart.png"
          width={280}
          height={280}
          className="h-full w-full object-cover rounded-md"
          alt="linear board demo"
        />
      </div>
    ),
  },
 
  {
    title: "Structured View",
    description:
      "View data in a structured table format, making it easy to track and compare story points, team progress, and performance metrics at a glance.",
    content: (
      <div className="h-full w-full  rounded-md  flex items-center justify-center text-white">
        <Image
          src="/table.png"
          width={280}
          height={280}
          className="h-full w-full object-cover rounded-md"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Try Us!!",
    description:
      "Experience seamless real-time story pointing, live bar charts, and instant collaboration, designed to streamline your team's planning process and boost productivity",
      content: (
        <div className="h-full w-full  rounded-md  flex items-center justify-center text-white">
          <Image
            src="/table.png"
            width={280}
            height={280}
            className="h-full w-full object-cover rounded-md"
            alt="linear board demo"
          />
        </div>
      ),
  },
];
export function StickyScrollRevealDemo() {
  return (
    <div className="p-10">
         
      <StickyScroll content={content} />
     
    </div>
  );
}

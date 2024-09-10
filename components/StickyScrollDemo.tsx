"use client";
import React from "react";

import Image from "next/image";
import { StickyScroll } from "./SitckyScroll";
import { HoverBorderGradient } from "./HoverBorderGradient";

const content = [
  {
    title: "Live Estimates",
    description: "Real-time story point updates for accurate, instant projections.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/live.png"
          width={300}
          height={300}
          className="h-full w-full object-cover border-none"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Story Pointing",
    description: "Seamless point submission and instant updates for efficient planning.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
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
    description: "Dynamic charts for clear, instant insights into team performance.",
    content: (
      <div className="h-full w-full rounded-md flex items-center justify-center text-white">
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
    description: "Tabular format for easy tracking and comparison of team metrics.",
    content: (
      <div className="h-full w-full rounded-md flex items-center justify-center text-white">
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
    description: "Boost productivity with our intuitive, real-time planning tools.",
    content: (
      <div className="h-full w-full rounded-md flex items-center justify-center text-white">
        <Image
          src="/tryestimate.png"
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

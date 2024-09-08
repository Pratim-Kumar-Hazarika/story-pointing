"use client";
import React from "react";
import { HoverBorderGradient } from "./HoverBorderGradient";


export function Reveal({title}:{title:string}) {
  return (
    <div className=" flex justify-center text-center z-50   ">
      <HoverBorderGradient
      leftSideBar={false}
        containerClassName="rounded-md    "
        as="button"
        className="bg-black  text-white flex items-center space-x-2"
      >
        <span className=" font-medium  text-sm">{title}</span>
      </HoverBorderGradient>
    </div>
  );
}


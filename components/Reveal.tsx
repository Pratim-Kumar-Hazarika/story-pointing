"use client";
import React from "react";
import { HoverBorderGradient } from "./HoverBorderGradient";


export function Reveal() {
  return (
    <div className=" flex justify-center text-center z-50 mt-7  ">
      <HoverBorderGradient
        containerClassName="rounded-md    "
        as="button"
        className="bg-black  text-white flex items-center space-x-2"
      >
        <span className=" font-medium  text-lg">Reveal Estimates</span>
      </HoverBorderGradient>
    </div>
  );
}


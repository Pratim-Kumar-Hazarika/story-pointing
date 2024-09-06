"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useSpring,
  useAnimation,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  const glowControls = useAnimation(); // Animation control for glow

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const glowEffect = async () => {
      while (true) {
        await glowControls.start({ strokeOpacity: 5 }); // Increase opacity
        await glowControls.start({ strokeOpacity: 0.20 }); // Decrease opacity
      }
    };
    glowEffect();
  }, [glowControls]);

  // Set static y1 and y2 values to keep it highlighted without scrolling
  const y1 = useSpring(10, { stiffness: 500, damping: 90 });
  const y2 = useSpring(1000, { stiffness: 500, damping: 90 });

  return (
    <motion.div
      ref={ref}
      className={cn("absolute w-full min-h-screen", className)}
    >
      <div className="absolute z-50 right-[20rem] top-[-30rem] -rotate-45">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight} // Set the SVG height
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{
              duration: 10,
            }}
          ></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            animate={glowControls} // Apply animation control for the glow effect
            transition={{
              duration: 2, // Adjust the glow duration
              ease: "easeInOut",
              loop: Infinity, // Ensure it loops
              repeatType: "loop", // Repeat the animation
            }}
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1} // set static y1 for gradient
              y2={y2} // set static y2 for gradient
            >
              <stop stopColor="#18CCFC" stopOpacity="0"></stop>
              <stop stopColor="#18CCFC"></stop>
              <stop offset="0.325" stopColor="#6344F5"></stop>
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};

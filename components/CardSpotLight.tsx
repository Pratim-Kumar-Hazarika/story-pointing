"use client";

import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React, { MouseEvent as ReactMouseEvent, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CanvasRevealEffect } from "./CanvasRevealEffect";

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#262626",
  className,
  hoverBoolean,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
  hoverBoolean?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () =>{
    if(!hoverBoolean){
      setIsHovering(true);
    }
  }
  const handleMouseLeave = () => {
    if(!hoverBoolean){
      setIsHovering(false);
    }
  }

  // Trigger hover animation based on hoverBoolean prop
  useEffect(() => {
    if (hoverBoolean) {
      setIsHovering(true);
    } 
  }, [hoverBoolean]);

  return (
    <div
      className={cn(
        "group/spotlight p-10 rounded-md relative border border-neutral-800 bg-black dark:border-neutral-800",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        className="cursor-pointer absolute z-0 -inset-px rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 105%
            )
          `,
          opacity: isHovering ? 100 : 0, // Trigger the animation based on hoverBoolean
        }}
      >
        {isHovering && (
          <CanvasRevealEffect
            animationSpeed={10}
            containerClassName="bg-transparent absolute inset-0 pointer-events-none"
            colors={[
              [59, 130, 246],
              [139, 92, 246],
            ]}
            dotSize={2}
          />
        )}
      </motion.div>
      {children}
    </div>
  );
};

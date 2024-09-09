"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from "./HoverBorderGradient";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end end"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Calculate which card should be active based on progress
    const activeIndex = Math.floor(latest * cardLength);
    setActiveCard(activeIndex);
  });

  const backgroundColors = [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <div className="flex justify-center items-center">
      <HoverBorderGradient
        leftSideBar={true}
        containerClassName="rounded-md py-0 z-[100]"
        as="button"
        className="bg-black text-white min-w-max overflow-hidden z-[100] py-0"
      >
        <motion.div
          className="h-[calc(90vh_-_200px)]  custom-scrollbar overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10"
          ref={ref}
        >
          <div className="relative flex items-start px-4">
            <div className="max-w-2xl">
              {content.map((item, index) => (
                <div key={item.title + index} className="my-10">
                  <motion.h2
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.3,
                    }}
                    className="text-2xl font-bold text-slate-100"
                  >
                    {item.title}
                  </motion.h2>
                  <motion.p
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: activeCard === index ? 1 : 0.3,
                    }}
                    className="text-kg text-slate-300 max-w-sm mt-5"
                  >
                    {item.description}
                  </motion.p>
                </div>
              ))}
              <div className="h-40" />
            </div>
          </div>
          <div
             style={{
    backgroundImage: 'url(/chart.png)',
    backgroundSize: 'cover', // Ensures the image covers the div
    backgroundPosition: 'center', // Centers the image in the div
    backgroundRepeat: 'no-repeat', // Ensures the image doesn't repeat
  }}
            className={cn(
              "hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden",
              contentClassName
            )}
          >
            {content[activeCard]?.content ?? null}
          </div>
        </motion.div>
      </HoverBorderGradient>
    </div>
  );
};

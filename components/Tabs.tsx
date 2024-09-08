"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <div className="flex flex-col px-4">
      {/* Active tab */}
      <div
        className={cn(
          "flex flex-col items-center mb-4",
          containerClassName
        )}
      >
        <button
          onClick={() => moveSelectedTabToTop(0)} // Move the first tab to the top
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          className={cn(
            "relative px-4 py-2 rounded-full ",
            tabClassName,
            { "bg-zinc-800": active.value === tabs[0].value },
            active.value === tabs[0].value ? activeTabClassName : ""
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {active.value === tabs[0].value && (
            <motion.div
              layoutId="clickedbutton"
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className={cn(
                "absolute inset-0 bg-zinc-800 rounded-full ",
                activeTabClassName
              )}
            />
          )}
          <span className="relative block text-sm text-white">{tabs[0].title}</span>
        </button>
      </div>

      {/* Other tabs */}
      <div
        className={cn(
          "flex flex-row items-center justify-center space-x-2  ",
          containerClassName
        )}
      >
        {tabs.slice(1).map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              setActive(tab);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn(
              "relative px-4 py-2 rounded-full",
              tabClassName,
              { "bg-zinc-800": active.value === tab.value },
              active.value === tab.value ? activeTabClassName : ""
            )}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-zinc-800 rounded-full ",
                  activeTabClassName
                )}
              />
            )}
            <span className="relative block text-white text-sm">{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-4", contentClassName)}
      />
    </div>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  active,
  hovering,
}: {
  className?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === active.value;
  };

  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};

"use client";

import { useState, useEffect } from "react";
import { Tabs } from "./Tabs";

type TabsDemoProps = {
  totalUsers: number;
};

export function TabsDemo({ totalUsers }: TabsDemoProps) {
  console.log(totalUsers);
  const [tabs, setTabs] = useState([
    {
      title: `Total (${totalUsers})`,
      value: "product",
      content: "",
    },
    {
      title: "Voted (2)",
      value: "services",
      content: "",
    },
    {
      title: "Pending (1)",
      value: "playground",
      content: "",
    },
  ]);

  // Update the tabs when the totalUsers prop changes
  useEffect(() => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.value === "product"
          ? { ...tab, title: `Total (${totalUsers})` }
          : tab,
      ),
    );
  }, [totalUsers]);

  return (
    <div className="relative b flex flex-col w-full items-center mt-3">
      <Tabs tabs={tabs} />
    </div>
  );
}

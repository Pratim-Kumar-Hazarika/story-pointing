"use client";

import Image from "next/image";
import { Tabs } from "./Tabs";


export function TabsDemo() {
  const tabs = [
    {
      title: "Total (1)",
      value: "product",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl  text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Product Tab</p>
          
        </div>
      ),
    },
    {
      title: "Voted(2)",
      value: "services",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl  text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Services tab</p>
          
        </div>
      ),
    },
    {
      title: "Pending (1)",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl  text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Playground tab</p>
         
        </div>
      ),
    },
   
  ];

  return (
    <div className="  relative b flex flex-col  w-full   items-center mt-3">
      <Tabs tabs={tabs} />
    </div>
  );
}


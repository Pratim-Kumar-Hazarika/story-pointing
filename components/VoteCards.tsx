"use client";

import { CardSpotlight } from "./CardSpotLight";
import { HoverBorderGradient } from "./HoverBorderGradient";
import { Reveal } from "./Reveal";
export function VoteCards() {
  return (
    <HoverBorderGradient
      leftSideBar={true}
      containerClassName="rounded-md py-0   z-[100] "
      as="div"
      className="bg-black text-white  z-[100] py-0 h-[calc(100vh_-_101px)]   w-[calc(90vw_-_220px)]"
    >
      <div className="  ml-5    h-full  items-center justify-center flex">
        <div className=" flex flex-col items-center     gap-4">
          <div
            title=" Oxygen gets you high. In a catastrophic emerge catastrophic emerge catastrophic emergecatastrophic emergecatastrophic emerge"
            className="text-lg   text-white  break-all z-50  w-[630px] line-clamp-2"
          >
            User Notifications on Web and Mobile
          </div>
          <div className="grid items-center grid-cols-4 gap-5 z-50 cursor-pointer">
            {[1, 2, 3, 5, 8, 13, 15, 20].map((item) => (
              <div className="expcard" key={item}>
                <CardSpotlight className="h-[85px] w-[85px] flex items-center justify-center">
                  <div className="text-neutral-200 relative  text-4xl z-20">
                    {item}
                  </div>
                </CardSpotlight>
              </div>
            ))}
            <div className="col-span-4 flex flex-row gap-4 items-center justify-center">
              <div className="expcard">
                <CardSpotlight className="h-[85px] w-[85px] flex items-center justify-center">
                  <div className="text-neutral-200 text-4xl relative z-20">
                    24
                  </div>
                </CardSpotlight>
              </div>
              <div className="expcard">
                <CardSpotlight className="  h-[85px] w-[85px] flex items-center justify-center">
                  <div className="text-neutral-200 text-4xl relative z-20">
                    24
                  </div>
                </CardSpotlight>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Reveal title="Reset Estimates" />
            <Reveal title="Reveal Estimates" />
            <Reveal title="New Estimate" />
          </div>
        </div>
      </div>
    </HoverBorderGradient>
  );
}

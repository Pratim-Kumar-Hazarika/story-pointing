'use client';
import { BackGround } from "@/components/Background";
import { CardSpotlight } from "@/components/CardSpotLight";
import {ChartDemo} from "@/components/ChartDemo";
import { ExpandableCardDemo } from "@/components/ExpandableDemo";
import { HoverBorderGradient } from "@/components/HoverBorderGradient";

import LeftSideBar from "@/components/LeftSideBar";
import { Reveal } from "@/components/Reveal";
import  ScrollAreaDemo  from "@/components/ScrollAreaDemo";
import { ShootingStars } from "@/components/ShootingStar";
import  VotesTable  from "@/components/Table";

import { TracingBeam } from "@/components/TracingBeam";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col  ">
      <div className=" flex justify-between w-full py-3 px-4 text-white ">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b  from-neutral-400 to-white text-3xl  font-bold tracking-tight">
       Estimate
      </h2>
        <div className="flex gap-4 px-5 mt-2 font-medium">  <div className="   text-sm  flex items-center justify-center" >Product</div>
        <div className="   text-sm  flex items-center justify-center" >Pricing</div></div>
      </div>
          <div className="   flex  px-4  gap-5 mt-[30px] relative">
          <LeftSideBar />
          <div className=" flex flex-col  gap-4">
 <VoteCards/>
            {/* <ChartDemo/> 
            <VotesTable/>  */}
            </div>
          </div>
    </div>
  );
}

function VoteCards(){
    return (
      <HoverBorderGradient
      leftSideBar={true}
        containerClassName="rounded-md py-0   z-[100] "
        as="button"
        className="bg-black text-white  z-[100] py-0 h-[calc(100vh_-_101px)]   w-[calc(90vw_-_220px)]"
      >
      <div className="  ml-5    h-full  items-center justify-center flex">
         <div className=" flex flex-col items-center     gap-4">
              <div title=" Oxygen gets you high. In a catastrophic emerge catastrophic emerge catastrophic emergecatastrophic emergecatastrophic emerge" className="text-lg   text-white  break-all z-50  w-[630px] line-clamp-2">
                User Notifications on Web and Mobile
              </div>
              <div className="grid items-center grid-cols-4 gap-5 z-50 cursor-pointer">
                {[1, 2, 3, 5, 8, 13, 15, 20].map((item) => (
                  <div className="expcard" key={item}>
                    <CardSpotlight className="h-[85px] w-[85px] flex items-center justify-center">
                      <div className="text-neutral-200 relative  text-4xl z-20">{item}</div>
                    </CardSpotlight>
                  </div>
                ))}
                <div className="col-span-4 flex flex-row gap-4 items-center justify-center">
                  <div className="expcard">
                    <CardSpotlight className="h-[85px] w-[85px] flex items-center justify-center">
                      <div className="text-neutral-200 text-4xl relative z-20">24</div>
                    </CardSpotlight>
                  </div>
                  <div className="expcard">
                    <CardSpotlight className="  h-[85px] w-[85px] flex items-center justify-center">
                      <div className="text-neutral-200 text-4xl relative z-20">24</div>
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
    )
}
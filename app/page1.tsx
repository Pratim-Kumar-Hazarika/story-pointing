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
    <div className="relative min-h-screen flex">
       <div

      className="  absolute z-[51] w-full ml-7  mt-7  flex items-start  justify-start "
    >
        <div className="  z-50">
          <svg width={0} height={0}>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <motion.stop
                  offset="50%"
                  stopColor="#6344F5"
                  animate={{ stopOpacity: [0, 1, 1, 0] }}
                  transition={{ duration: 15, repeat: Infinity }}
                />
                <motion.stop
                  offset="100%"
                  stopColor="#AE48FF"
                  animate={{ stopOpacity: [0, 1, 1, 0] }}
                  transition={{ duration: 15, repeat: Infinity }}
                />
              </linearGradient>
            </defs>
          </svg>
          <h1
            className="bg-clip-text  text-3xl font-bold  z-[100] text-white"
            style={{
              backgroundImage: "url(#gradient)",
            }}
          >
            Estimate
          </h1>
        </div>
      </div>
      
      

      <div className="flex flex-1 flex-col items-center justify-center">
        <TracingBeam>
          <ShootingStars />
          <BackGround>
            <div><LeftSideBar /></div>
            <div>
          <ChartDemo/>
            <ExpandableCardDemo/>
            <VotesTable/>
            </div>
            {/* <div className="flex flex-col gap-5 items-center  mt-20 justify-around">
              <div title=" Oxygen gets you high. In a catastrophic emerge catastrophic emerge catastrophic emergecatastrophic emergecatastrophic emerge" className="text-2xl   text-white  break-all z-50  w-[630px] line-clamp-2">
                Oxygen gets you high. In a catastrophic emerge catastrophic emerge catastrophic emergecatastrophic emergecatastrophic emerge
              </div>
              <div className="grid items-center grid-cols-4 gap-10 z-50 cursor-pointer">
                {[1, 2, 3, 5, 8, 13, 15, 20].map((item) => (
                  <div className="expcard" key={item}>
                    <CardSpotlight className="h-[100px] w-[100px] flex items-center justify-center">
                      <div className="text-neutral-200 relative  text-5xl z-20">{item}</div>
                    </CardSpotlight>
                  </div>
                ))}
                <div className="col-span-4 flex flex-col items-center justify-center">
                  <div className="expcard">
                    <CardSpotlight className="h-[100px] w-[100px] flex items-center justify-center">
                      <div className="text-neutral-200 text-5xl relative z-20">24</div>
                    </CardSpotlight>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Reveal title="Reset Estimates" />
                <Reveal title="Reveal Estimates" />
                
              </div>
            </div> */}
          </BackGround>
        </TracingBeam>
      </div>
    </div>
  );
}

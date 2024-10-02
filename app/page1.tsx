"use client";

import { PricingCards } from "@/components/PricingCard";
import { StickyScrollRevealDemo } from "@/components/StickyScrollDemo";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState("product");
  return (
    <div className="relative">
      <div className="flex items-end justify-end gap-4 z-[100]   text-sm  font-medium text-neutral-400   px-10 mt-5">
        <Link href={"/trynow"}>
          <div className="  cursor-pointer   flex items-center justify-center ">
            Try Now
          </div>
        </Link>
        <Link href={"/signin"}>
          <div className="  cursor-pointer   flex items-center justify-center ">
            Sign In
          </div>
        </Link>
        <div
          onClick={() => setPage("product")}
          className="  cursor-pointer   flex items-center justify-center "
        >
          Product
        </div>
        <div
          onClick={() => setPage("price")}
          className="      cursor-pointer flex items-center justify-center  "
        >
          Pricing
        </div>
      </div>
      <h2 className="bg-clip-text  mt-10 text-transparent text-center bg-gradient-to-b  from-neutral-400 to-white text-2xl md:text-4xl lg:text-7xl font-sans   relative z-20 font-bold tracking-tight">
        Estimate
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-400 text-center mt-2">
        A fast, real-time tool for agile story point estimation and effortless
        team collaboration.
      </p>

      {page === "product" && <StickyScrollRevealDemo />}
      {page === "price" && (
        <div className=" flex items-center justify-center">
          <PricingCards />
        </div>
      )}
    </div>
  );
}

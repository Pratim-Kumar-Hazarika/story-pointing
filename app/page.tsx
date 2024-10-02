"use client";
import Join from "@/components/join/Join";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState("product");
  return (
    <>
      <Join />
    </>
  );
}

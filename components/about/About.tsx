import React from "react";
import { AccordionDemo } from "../AccordianFaq";

function About() {
  return (
    <div className="  h-[400px]">
      <div className=" flex flex-col items-center justify-center  ">
        <h2 className="bg-clip-text  bg-gradient-to-b    text-transparent  from-neutral-400 to-white text-3xl  font-bold tracking-tight">
          Frequenty Asked Questions
        </h2>
        <AccordionDemo />
      </div>
    </div>
  );
}

export default About;

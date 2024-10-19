import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import Link from "next/link";
import { TextGenerateEffect } from "./ui/text-generate-effect";

export function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-[400px] mt-3  text-sm bg-gradient-to-b text-transparent from-neutral-400 to-white tracking-tight bg-clip-text"
    >
      {/* Adding FAQ Points */}
      <AccordionItem value="item-4">
        <AccordionTrigger className="">What is Estimate?</AccordionTrigger>
        <AccordionContent>
          <TextGenerateEffect
            words="  Estimate is a real-time story pointing tool designed to help teams
          accurately estimate tasks in agile workflows."
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7">
        <AccordionTrigger>What is story pointing ?</AccordionTrigger>
        <AccordionContent>
          <div className="flex">
            <TextGenerateEffect
              className="text-white"
              words=" For a detail understanding :"
            />
            <Link
              className="   px-2  animate-pulse  text-green-400 "
              target="_blank"
              rel="noopener noreferrer"
              href="https://resources.scrumalliance.org/Article/story-point-estimation"
            >
              <TextGenerateEffect
                className="text-green-400"
                words="Click Here"
              />
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>
          Can I use Estimate with remote teams?
        </AccordionTrigger>
        <AccordionContent>
          <TextGenerateEffect
            words="Yes, Estimate is built to support remote and distributed teams with
          seamless collaboration."
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          How does real-time story pointing work?
        </AccordionTrigger>
        <AccordionContent>
          <TextGenerateEffect
            className="text-white"
            words="Team members can assign story points simultaneously, with live updates
          reflected in real-time charts."
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

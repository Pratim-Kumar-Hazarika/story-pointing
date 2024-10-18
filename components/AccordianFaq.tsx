import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-[400px] text-white text-sm bg-gradient-to-b text-transparent from-neutral-400 to-white tracking-tight bg-clip-text"
    >
      {/* Adding FAQ Points */}
      <AccordionItem value="item-4">
        <AccordionTrigger>What is Estimate?</AccordionTrigger>
        <AccordionContent>
          Estimate is a real-time story pointing tool designed to help teams
          accurately estimate tasks in agile workflows.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          How does real-time story pointing work?
        </AccordionTrigger>
        <AccordionContent>
          Team members can assign story points simultaneously, with live updates
          reflected in real-time charts.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>
          Can I use Estimate with remote teams?
        </AccordionTrigger>
        <AccordionContent>
          Yes, Estimate is built to support remote and distributed teams with
          seamless collaboration.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { CardSpotlight } from "./CardSpotLight";
import ShareLink from "./ShareLink";
import StartEstimate from "./StartEstimate";
import { useAppContext } from "@/context/AppContext";
import ShowTitle from "./ShowTitle";
import { useToast } from "@/hooks/use-toast";
export function VoteCards() {
  const { toast } = useToast();
  const {
    user: { isModerator },
    activeCardNumber,
    setActiveCardNumber,
    startEstimation,
  } = useAppContext();
  console.log({ activeCardNumber });
  function voteCardClickHandler(vote: number) {
    if (!startEstimation.started) {
      toast({
        description: `Let the moderator start the estimation ⏰!!`,
      });
      return;
    }
    setActiveCardNumber(vote);
  }
  return (
    <div className="bg-black rounded-md border p-5  flex flex-col items-center border-neutral-800 text-white  z-[100] py-0 h-[calc(100vh_-_101px)]   w-[calc(90vw_-_220px)]">
      <ShareLink />
      {isModerator && <StartEstimate />}
      {!isModerator && <ShowTitle />}

      <div className="   mt-5   h-full  flex">
        <div className=" flex flex-col   items-center     gap-4">
          <div
            title=" Oxygen gets you high. In a catastrophic emerge catastrophic emerge catastrophic emergecatastrophic emergecatastrophic emerge"
            className="text-lg    flex items-center justify-center text-white  break-all z-50  w-[630px] line-clamp-2"
          >
            {/* Title ? */}
          </div>
          <div className="grid items-center grid-cols-4 gap-5 z-50 cursor-pointer">
            {[1, 2, 3, 5, 8, 13, 15, 20].map((item) => (
              <div className="expcard" key={item}>
                <CardSpotlight
                  onClick={() => voteCardClickHandler(item)}
                  activeCard={activeCardNumber === item}
                  className="h-[85px] w-[85px] flex items-center justify-center"
                >
                  <div className="text-neutral-200 relative  text-4xl z-20">
                    {item}
                  </div>
                </CardSpotlight>
              </div>
            ))}
            <div className="col-span-4 flex flex-row gap-4 items-center justify-center">
              <div className="expcard">
                <CardSpotlight
                  onClick={() => voteCardClickHandler(24)}
                  activeCard={activeCardNumber === 24}
                  className="h-[85px] w-[85px] flex items-center justify-center"
                >
                  <div className="text-neutral-200 text-4xl relative z-20">
                    24
                  </div>
                </CardSpotlight>
              </div>
              <div className="expcard">
                <CardSpotlight
                  onClick={() => voteCardClickHandler(30)}
                  activeCard={activeCardNumber === 30}
                  className="  h-[85px] w-[85px] flex items-center justify-center"
                >
                  <div className="text-neutral-200 text-4xl relative z-20">
                    30
                  </div>
                </CardSpotlight>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 ", className)}>{children}</div>
  );
};

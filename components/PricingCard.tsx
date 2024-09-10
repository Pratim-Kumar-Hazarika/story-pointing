import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reveal } from "./Reveal";
import { plans } from "@/mock-data/plans";

export function PricingCards() {
  return (
    <div className="flex  gap-5 mt-4">
      {plans?.map((plan, index) => (
        <Card
          key={index}
          className={`w-[300px] ${plan?.bgColor} ${plan?.borderColor}`}
        >
          <CardHeader>
            <CardTitle className="text-neutral-200 text-2xl">
              {plan?.type}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex gap-1 text-white">
              <div className="text-neutral-200 text-4xl flex flex-col justify-end">
                {plan?.price}
              </div>
              <div className="text-sm flex items-center mt-3">
                {plan?.frequency}
              </div>
            </div>
            <div>
              {plan.features.map((feature, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full slow-pulse bg-white animate" />
                  <div className="space-y-1">
                    <p className="text-sm text-neutral-400 font-medium leading-none">
                      {feature?.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Reveal title={plan?.buttonText} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

import { cn } from "@/lib/utils"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Reveal } from "./Reveal"

const plans = [
  {
    type: "Free Plan",
    price: "$0",
    frequency: "/month",
    description: "Perfect for trying out our product and the functionalities we provide.",
    features: [
      { title: "3 Sessions, No Sessions stored.", description: "1 hour ago" },
      { title: "30 Team Members.", description: "1 hour ago" },
      { title: "48 hours support window.", description: "2 hours ago" }
    ],
    buttonText: "Start for Free",
    bgColor: "bg-black",
    borderColor: "border-neutral-800"
  },
  {
    type: "Pro Plan",
    price: "$30",
    frequency: "/month",
    description: "For advanced features & priority support.",
    features: [
      { title: "Unlimited, Past Sessions.", description: "1 hour ago" },
      { title: "100 Team Members.", description: "1 hour ago" },
      { title: "24 hour support window.", description: "2 hours ago" }
    ],
    buttonText: "Upgrade to Pro",
    bgColor: "bg-black",
    borderColor: "border-neutral-800"
  }
]

type CardProps = React.ComponentProps<typeof Card>

export function PricingCards() {
  return (
    <div className="flex  gap-5 mt-4">
      {plans?.map((plan, index) => (
        <Card key={index} className={`w-[300px] ${plan?.bgColor} ${plan?.borderColor}`}>
          <CardHeader>
            <CardTitle className="text-neutral-200 text-2xl">{plan?.type}</CardTitle>
            {/* <CardDescription className="text-sm text-neutral-400">{plan?.description}</CardDescription> */}
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex gap-1 text-white">
              <div className="text-neutral-200 text-4xl flex flex-col justify-end">{plan?.price}</div>
              <div className="text-sm flex items-center mt-3">{plan?.frequency}</div>
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
  )
}

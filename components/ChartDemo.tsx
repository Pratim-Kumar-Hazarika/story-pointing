"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { HoverBorderGradient } from "./HoverBorderGradient";
import { CardSpotlight } from "./CardSpotLight";
import { Reveal } from "./Reveal";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/AppContext";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartDemo() {
  const { revealVotes } = useAppContext();
  const chartData = revealVotes?.chartData.map((item) => {
    return {
      month: String(item.point),
      desktop: item.voters.length,
    };
  });
  return (
    <div className="bg-black text-white flex space-x-2   rounded-md  z-50 border border-neutral-800   w-full ">
      <div className="flex gap-4">
        <Card className=" bg-black border-none  px-0">
          <CardHeader className="text-white   ">
            {revealVotes?.title}
          </CardHeader>
          <CardContent className="  flex gap-5">
            <ChartContainer
              className=" w-[35rem]  h-[13rem]  flex items-center justify-center"
              config={chartConfig}
            >
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 20,
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid strokeOpacity={0.5} horizontal={true} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={5}
                  tickFormatter={(value) => value.slice(0, 3)}
                />

                <Line
                  className=" min-w-[10rem]"
                  dataKey="desktop"
                  type="natural"
                  stroke="white"
                  strokeWidth={2}
                  dot={{
                    fill: "green",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                >
                  <LabelList
                    position="top"
                    offset={9}
                    className=" text-white font-bold"
                    fontSize={12}
                  />
                </Line>
              </LineChart>
            </ChartContainer>
            <div className=" flex flex-col gap-5  text-white justify-center">
              <Button variant="outline" className="border-neutral-800 ">
                Reset Votes
              </Button>
              <Button variant="outline" className="border-neutral-800">
                New Estimation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

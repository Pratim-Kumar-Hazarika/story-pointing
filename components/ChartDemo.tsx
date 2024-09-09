"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { HoverBorderGradient } from "./HoverBorderGradient"
import { CardSpotlight } from "./CardSpotLight"
import { Reveal } from "./Reveal"

export const description = "A bar chart with a label"

const chartData = [
  { month: "0", desktop: 186 },
  { month: "3", desktop: 305 },
  { month: "5", desktop: 237 },
  { month: "8", desktop: 73 },
  { month: "10", desktop: 209 },
  { month: "13", desktop: 214 },
  { month: "13", desktop: 214 },
  { month: "13", desktop: 214 },
  { month: "13", desktop: 214 },
  { month: "13", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function ChartDemo() {
  return (
    <HoverBorderGradient
    leftSideBar={true}
      containerClassName="rounded-md  z-50   w-full"
      as="button"
      className="bg-black text-white flex space-x-2   w-full "
    >
    <div className="flex gap-4">
    <Card className=" bg-black border-none  px-0" >
      <CardHeader>
      </CardHeader>
      <CardContent>
        <ChartContainer className=" w-[35rem]  h-[12rem]  flex items-center justify-center"   config={chartConfig}>
          {/* <BarChart
        className=" min-w-[40rem]"
            accessibilityLayer
            data={chartData}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Bar  dataKey="desktop" fill="white" radius={3}>
              <LabelList
                position="top"
                offset={3}
                className=" text-white"
                fontSize={13}
              />
            </Bar>
          </BarChart> */}
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
              tickMargin={8}
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
                offset={12}
                className=" text-white font-bold"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>

    </Card>
    {/* <div className="  flex items-center"> <Reveal title="Restimate"/></div> */}
   
    </div>
   </HoverBorderGradient>
  )
}

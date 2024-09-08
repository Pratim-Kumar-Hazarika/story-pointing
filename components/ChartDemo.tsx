"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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
    <Card className=" bg-black  border-none    px-0" >
      <CardHeader>
      </CardHeader>
      <CardContent>
        <ChartContainer className="  h-[12rem]  flex items-center justify-center"   config={chartConfig}>
          <BarChart
        className=" min-w-[45rem]"
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
                offset={2}
                className=" text-white"
                fontSize={13}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
    </HoverBorderGradient>
  )
}

"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/AppContext";
import { WebsocketManager } from "@/utils/WebsocketManager";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "react-responsive";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChartDemo() {
  const { toast } = useToast();
  const isXs = useMediaQuery({ maxWidth: 920 });
  const isSmallScreen = useMediaQuery({ maxWidth: 1048 });
  const isExtraSmallScreen = useMediaQuery({ maxWidth: 600 });
  const isExtraExtraSmallScreen = useMediaQuery({ maxWidth: 420 });
  const { revealVotes, user, createRoom, setRevealVotes } = useAppContext();
  const chartData = revealVotes?.chartData.map((item) => {
    return {
      month: String(item.point),
      desktop: item.voters.length,
    };
  });
  function resetVotesHandler() {
    const resetVotesPayload = {
      method: "SENDMESSAGE",
      data: {
        channelId: createRoom.roomCode,
        reset: true,
      },
    };
    WebsocketManager.getInstance().sendMessage(resetVotesPayload);
    toast({
      description: "Votes resetted 🏳️",
    });
  }

  function newEstimationHandler() {
    const endEstimationPayload = {
      method: "SENDMESSAGE",
      data: {
        channelId: createRoom.roomCode,
        newEstimation: true,
      },
    };
    WebsocketManager.getInstance().sendMessage(endEstimationPayload);
  }
  return (
    <div className="bg-black text-white flex space-x-2   rounded-md  z-50 border border-neutral-800   w-full ">
      <div
        className={`flex w-full  gap-4 ${isXs && "items-center justify-center "}`}
      >
        <Card className=" bg-black border-none  px-0">
          <CardHeader className="text-white   ">
            {revealVotes?.title}
          </CardHeader>
          <CardContent
            className={` ${isSmallScreen ? "flex flex-col items-center justify-center  " : "flex"} gap-5  ${isExtraSmallScreen ? " w-[90vw]   " : ""} `}
          >
            <ChartContainer
              className={` ${isExtraSmallScreen ? "    " : "w-[35rem]"} ]  h-[13rem]  flex items-center justify-center ${isExtraExtraSmallScreen && "w-full"}`}
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
            {user.isModerator && (
              <div
                className={`${isSmallScreen ? "flex flex-row" : "flex flex-col"}  gap-5  text-white justify-center ${isExtraExtraSmallScreen && "flex flex-col"}`}
              >
                <Button
                  onClick={() => resetVotesHandler()}
                  variant="outline"
                  className="border-neutral-800 "
                >
                  Reset Votes
                </Button>
                <Button
                  onClick={() => newEstimationHandler()}
                  variant="outline"
                  className="border-neutral-800"
                >
                  New Estimation
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

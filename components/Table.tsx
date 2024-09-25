import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ScrollAreaDemo from "./ScrollAreaDemo";
import { HoverBorderGradient } from "./HoverBorderGradient";

interface Vote {
  points: number;
  names: string[];
}

const votes: Vote[] = [
  {
    points: 1,
    names: ["Pratimmm", "John", "Doe", "Alice"],
  },
  {
    points: 2,
    names: ["Charlie", "David"],
  },
  {
    points: 3,
    names: [
      "Helen",
      "Ivy",
      "Jack",
      "Kara",
      "Liam",
      "Mike",
      "Nina",
      "Olivia",
      "Paul",
      "Quincy",
      "Rita",
      "Steve",
      "Tina",
      "Uma",
      "Victor",
      "Wendy",
      "Xander",
      "Yara",
      "Zane",
      "Ava",
      "Xander",
      "Yara",
      "Zane",
      "Ava",
      "Xander",
      "Yara",
      "Zane",
      "Ava",
      "Xander",
      "Yara",
      "Zane",
      "Ava",
      "Xander",
      "Yara",
      "Zane",
      "Ava",
    ],
  },
  {
    points: 5,
    names: ["Mike", "Nina"],
  },
  {
    points: 8,
    names: [
      "Rita",
      "Stevewdwdwdwfdwf wfwf3wf3fg3",
      "Tina",
      "Uma",
      "Victor",
      "Wendy",
      "Xander",
      "Yara",
      "Zane",
      "Ava",
      "Brianna",
      "Carter",
      "Diana",
      "Ethan",
    ],
  },
  {
    points: 13,
    names: ["Wendy", "Xander"],
  },
  {
    points: 15,
    names: ["Brianna", "Carter", "Diana"],
  },
  {
    points: 20,
    names: [
      "George",
      "Hannah",
      "Ian",
      "Jasmine",
      "Kyle",
      "Laura",
      "Mason",
      "Nora",
      "Oscar",
      "Paige",
      "Quinn",
      "Ryan",
      "Sophie",
      "Tom",
      "Ursula",
      "Vera",
      "Will",
      "Xena",
      "Yvonne",
      "Zach",
    ],
  },
];

const VotesTable: React.FC = () => {
  return (
    <HoverBorderGradient
      leftSideBar={true}
      containerClassName="rounded-md  w-full  z-50 overflow-hidden "
      as="div"
      className="bg-black text-white   w-[calc(100vw_-_340px)] flex space-x-2  overflow-hidden   h-[calc(100vh_-_425px)] "
    >
      <Table className=" border-none  min-w-full ">
        <TableHeader className="border-none">
          <TableRow className=" border-b border-b-neutral-800">
            {votes.map((vote) => (
              <TableHead
                key={vote.points}
                className="text-start min-w-max   text-gray-500 font-semibold  "
              >
                <div>
                  {vote.points}~Points ({vote.names.length})
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="">
          <TableRow>
            {votes.map((vote) => (
              <TableCell key={vote.points} className="align-top p-1 text-lg  ">
                <ScrollAreaDemo
                  containerClassName=" max-w-[100px]"
                  className="h-[calc(100vh_-_490px)]"
                >
                  <div className="py-[3px]   max-w-[100px]  text-center">
                    {vote.names.map((tag) => (
                      <div
                        title={tag}
                        className="text-mauve12 max-w-[120px] line-clamp-1  text-[15px] font-normal leading-[18px] mt-2.5 pt-2.5 "
                        key={tag}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </ScrollAreaDemo>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </HoverBorderGradient>
  );
};

export default VotesTable;
// User Message types : 'total / join ' |'Voted' | 'pending'

// Structures :

const joinUserStructures = {
  method: "SENDMESSAGE",
  data: {
    channelId: "room1",
    type: "total/joined",
    users: ["pratim", "elon"],
  },
};

////To frontend
const votedUserStructures = {
  method: "SENDMESSAGE",
  data: {
    channelId: "room1",
    type: "voted",
    users: ["pratim", "elon"],
  },
};
const pendingUserStructures = {
  method: "SENDMESSAGE",
  data: {
    channelId: "room1",
    type: "pending",
    users: ["pratim", "elon"],
  },
};

const chartDataStructure = {
  method: "SENDMESSAGE",
  data: {
    channelId: "room1",
    type: "chart",
    data: [
      {
        point: "1",
        totalVotes: 134,
        voters: ["pratim", "elon"],
      },
      {
        point: "3",
        totalVotes: 134,
        voters: ["pratim", "elon"],
      },
    ],
  },
};
/*
From frontend for moderators
*/

type ModeratorPayload = {
  channelId: string;
  name: string;
  revealEstimates: boolean;
  restimate: boolean;
  newEstimate: {
    title: string;
    newStory: boolean;
  };
};

/*
From frontend for participants
*/
type ParticipantPayload = {
  channelId: string;
  participantId: string;
  vote: number;
};

export type LiveRoomsData = {
  totalParticipants: Array<{ name: string; id: number }>;
  voted: Array<{ name: string; id: number }>;
  pending: Array<{ name: string; id: number }>;
  chartData: Array<{
    point: string;
    totalVotes: number; //// point * voters.length
    voters: Array<string>;
  }>;
};
let x = [{ totalParticipants: [], voted: [], pending: [], chartData: [] }];

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
import { useAppContext } from "@/context/AppContext";
const VotesTable: React.FC = () => {
  const { revealVotes } = useAppContext();
  return (
    <div className="bg-black text-white rounded-md    z-50  border border-neutral-800   w-[calc(100vw_-_340px)] flex space-x-2  overflow-hidden   h-[calc(100vh_-_425px)] ">
      <Table className=" border-none  min-w-full ">
        <TableHeader className="border-none">
          <TableRow className=" border-b border-b-neutral-800">
            {revealVotes?.chartData?.map((vote) => (
              <TableHead
                key={vote.point}
                className="text-start min-w-max    border-r border-neutral-800  text-gray-500 font-semibold  "
              >
                <div>
                  {vote.point}~Points ({vote.voters.length})
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {revealVotes?.chartData?.map((vote, idx) => (
              <TableCell
                key={`${idx}`}
                className="align-top border-r border-neutral-800 p-1 text-lg  "
              >
                <ScrollAreaDemo
                  containerClassName=" max-w-[100px]"
                  className="h-[calc(100vh_-_490px)]  border-neutral-800"
                >
                  <div className="py-[3px]   max-w-[100px]  text-center">
                    {vote?.voters?.map((tag) => (
                      <div
                        title={tag.name}
                        className="text-mauve12 max-w-[120px] line-clamp-1  text-[15px] font-normal leading-[18px] mt-2.5 pt-2.5 "
                        key={tag.id}
                      >
                        {tag?.name}
                      </div>
                    ))}
                  </div>
                </ScrollAreaDemo>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default VotesTable;

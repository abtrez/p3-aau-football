"use client";

import NotFound from "@/app/not-found";
import TeamLogo from "@/components/team/TeamLogo";

import Divider from "@mui/material/Divider";

import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  /* return NotFound; */

  return (
    <div className="container">
      <div className="flex flex-col items-center gap-4">
        <TeamLogo logo={"/placeholder-logo.png"} height={120} width={120} />
        <h2 className="text-3xl text-center mb-3">{id}</h2>
      </div>
      <Divider sx={{ borderBottomWidth: 3 }} />
      <div className="grid grid-rows-2 grid-cols-3 gap-3 mt-4">
        <div className="flex flex-col justify-center items-center bg-white p-4 gap-2 rounded-xl">
          <span className="text-sm text-center text-text-secondary">
            Contact Person
          </span>
          <span className="text-sm text-text font-bold">Peter Pan</span>
        </div>
        <div className="flex flex-col justify-center items-center bg-white p-4 rounded">
          4
        </div>
        <div className="flex flex-col justify-center items-center bg-white p-4 rounded">
          4
        </div>
        <div className="flex flex-col justify-center items-center bg-white p-4 rounded">
          4
        </div>
        <div className="flex flex-col justify-center items-center bg-white p-4 rounded">
          5
        </div>
        <div className="flex flex-col justify-center items-center bg-white p-4 rounded">
          6
        </div>
      </div>
    </div>
  );
}

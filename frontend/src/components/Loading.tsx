import { CircularProgress } from "@mui/material";
import React from "react";

export function Loading() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#110bd6" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ "svg circle": { stroke: "url(#gradient)" } }} />
    </div>
  );
}

"use client";

import NotFound from "@/app/not-found";

import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  /* return NotFound(); */

  return (
    <>
      <h1 className="text-3xl text-center mb-3">{id}</h1>
    </>
  );
}

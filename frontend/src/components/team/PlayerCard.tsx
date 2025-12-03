"use client"

import { Person } from "@/lib/schemas/personSchema";
import { useRouter } from "next/navigation";

interface PlayerCardInterface {
  member: Person;
}

export default function PlayerCard({ member }: PlayerCardInterface) {
  const router = useRouter();

  return (
    <div key={member.id} className="nb-1 cursor-pointer hover:bg-gray-100" onClick={() => router.push(`/player/${member.id}`)}>
      <span className="font-medium">
        {member.firstName} {member.lastName}
      </span>
      {member.roles && member.roles.length > 0 && (
        <span className="text-sm text-neutral-600">
          {" "}
          — {member.roles.map((role) => role.name).join(",")}
        </span>
      )}
    </div>
  )
}
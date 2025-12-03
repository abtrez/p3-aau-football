import { Person } from "@/lib/schemas/personSchema";

interface PlayerCardInterface {
  member: Person;
}

export default function PlayerCard({ member }: PlayerCardInterface) {
  return (
    <div key={member.id} className="nb-1">
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
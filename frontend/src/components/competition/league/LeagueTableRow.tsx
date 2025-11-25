import TeamLogo from "@/components/team/TeamLogo";

interface LeagueTableRowProps {
  position: number;
  teamName: string;
  played: number;
  wins: number;
  goalDiff: number;
  points: number;
}

export default function LeagueTableRow({ row }: { row: LeagueTableRowProps }) {
  return (
    <tr className="border-b last:border-b-0">
      <td className="py-2">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1 bg-indigo-500 rounded-full" />

          <span className="w-6 text-right font-semibold tabular-nums">
            {row.position.toString().padStart(2, "0")}
          </span>

          <span className="text-gray-400">-</span>

          <span className="font-semibold">{row.teamName}</span>
        </div>
      </td>

      <td className="py-2 text-center">{row.played}</td>
      <td className="py-2 text-center">{row.wins}</td>
      <td className="py-2 text-center">{row.goalDiff}</td>
      <td className="py-2 text-center">{row.points}</td>
    </tr>
  );
}

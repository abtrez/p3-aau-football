import { LeagueStatistics } from "@/lib/schemas/leagueStatisticsSchema";

interface LeagueTableRowProps {
  position: number;
  stat: LeagueStatistics;
}

export default function LeagueTableRow({
  position,
  stat,
}: LeagueTableRowProps) {
  return (
    <tr className="border-b last:border-b-0">
      <td className="py-2">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1 bg-indigo-500 rounded-full" />

          <span className="w-6 text-right font-semibold tabular-nums">
            {String(position).toString().padStart(2, "0")}
          </span>

          <span className="text-gray-400">-</span>

          <span className="font-semibold">{stat.team.name}</span>
        </div>
      </td>

      <td className="py-2 text-center">{stat.matchesPlayed}</td>
      <td className="py-2 text-center">{stat.won}</td>
      <td className="py-2 text-center">{stat.goalsFor - stat.goalsAgainst}</td>
      <td className="py-2 text-center">{stat.points}</td>
    </tr>
  );
}

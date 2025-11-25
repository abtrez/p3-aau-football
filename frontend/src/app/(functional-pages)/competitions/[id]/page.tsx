import LeagueTableHeader from "@/components/competition/league/LeagueTableHeader";
import LeagueTableRow from "@/components/competition/league/LeagueTableRow";
import { fetchCompetitionById } from "@/lib/fetchCompetition";
import { Competition } from "@/lib/schemas/competitionSchema";
import { fetchLeagueStatistics } from "@/lib/fetchLeagueStatistics";
import { LeagueStatistics } from "@/lib/schemas/leagueStatisticsSchema";

function sortLeagueStatistics(stats: LeagueStatistics[]) {
  const sortedArray = [...stats];

  sortedArray.sort((a, b) => {
    // First filter by points
    if (b.points !== a.points) return b.points - a.points;

    // Secondly filter by goal difference
    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - a.goalsAgainst;

    if (gdB !== gdA) {
      return gdB - gdA;
    }
    return 0;
  });
  return sortedArray;
}

export default async function Page({ params }: any) {
  const { id } = await params;
  const competition: Competition = await fetchCompetitionById(id);
  const { season } = competition;
  // Fetch statistics from the league
  const leagueStatistics = await fetchLeagueStatistics(id, season);
  // Sort the stats
  const sortedLeagueStatistics = sortLeagueStatistics(leagueStatistics);
  return (
    <div>
      <h1 className="text-3xl text-center mb-3 border-b">AAU LIGA</h1>
      <table className="w-full border-collapse">
        <LeagueTableHeader />
        <tbody>
          {sortedLeagueStatistics.map((stat, index) => (
            <LeagueTableRow key={stat.id} position={index + 1} stat={stat} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

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

  // Check if league statistics is empty - if so, inform about this
  if (leagueStatistics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)] px-4">
        <div className="max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">No Teams Yet</h2>
          <p className="text-gray-600">
            League statistics will appear here once teams have been enrolled
            into {competition.name}
          </p>
        </div>
      </div>
    );
  }

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

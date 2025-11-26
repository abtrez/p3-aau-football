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

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const competition: Competition = await fetchCompetitionById(id);
  const { season } = competition;
  // Fetch statistics from the league
  const leagueStatistics = await fetchLeagueStatistics(id, season);

  // Check if league statistics is empty - if so, inform about this
  if (leagueStatistics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-56px)]">
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
    <section className="max-w-5xl mx-auto">
      <div className="flex sm:flex-row items-end justify-between mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[1.5px] text-slate-400">
            League Table
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {competition.name}
          </h1>
        </div>

        <span className="rounded-full inline-flex border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
          Season {competition.season}
        </span>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <LeagueTableHeader />
          <tbody>
            {sortedLeagueStatistics.map((stat, index) => (
              <LeagueTableRow key={stat.id} position={index + 1} stat={stat} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

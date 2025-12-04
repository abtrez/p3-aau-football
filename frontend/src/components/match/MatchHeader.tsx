interface MatchHeaderProps {
  homeTeamName: string;
  awayTeamName: string;
  homeScore: number;
  awayScore: number;
  kickoff: string;
}

export default function MatchHeader({
  homeTeamName,
  awayTeamName,
  homeScore,
  awayScore,
  kickoff,
}: MatchHeaderProps) {
  const now = new Date();
  const kickoffDate = new Date(kickoff);

  const hasStartedOrFinished = kickoffDate <= now;

  return (
    <div className="flex justify-center my-4">
      <div
        className="
          max-w-xl w-full
          bg-white
          rounded-2xl
          shadow-sm
          border border-neutral-200
          px-6 py-4
          flex flex-col items-center gap-2
        "
      >
        <h1 className="text-xl sm:text-2xl font-semibold text-neutral-800 tracking-tight text-center">
          {homeTeamName}{" "}
          <span className="text-neutral-400 font-normal">vs</span>{" "}
          {awayTeamName}
        </h1>

        <h2 className="text-3xl sm:text-4xl font-bold tabular-nums text-neutral-900">
          {hasStartedOrFinished && `${homeScore} - ${awayScore}`}
        </h2>

        <p className="text-xs text-neutral-500">
          {hasStartedOrFinished ? "Match finished" : "Upcoming match"}
        </p>
      </div>
    </div>
  );
}

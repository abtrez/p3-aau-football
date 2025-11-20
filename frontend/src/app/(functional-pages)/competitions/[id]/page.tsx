import LeagueTableHeader from "@/components/competition/league/LeagueTableHeader";
import LeagueTableRow from "@/components/competition/league/LeagueTableRow";

const data = {
  position: 1,
  teamName: "CSSC",
  played: 5,
  wins: 5,
  goalDiff: 3,
  points: 15,
};

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl text-center mb-3 border-b">AAU LIGA</h1>
      <table className="w-full border-collapse">
        <LeagueTableHeader />
        <tbody>
          <LeagueTableRow row={data} />
          <LeagueTableRow row={data} />
          <LeagueTableRow row={data} />
          <LeagueTableRow row={data} />
        </tbody>
      </table>
    </div>
  );
}

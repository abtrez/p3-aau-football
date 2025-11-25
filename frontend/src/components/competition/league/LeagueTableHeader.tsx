export default function LeagueTableHeader() {
  return (
    <thead className="text-xs font-semibold text-gray-400 uppercase">
      <tr>
        <th className="py-2 pl-4 text-left font-semibold">
          Pos &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Team
        </th>
        <th className="py-2 text-center font-semibold">PL</th>
        <th className="py-2 text-center font-semibold">W</th>
        <th className="py-2 text-center font-semibold">GD</th>
        <th className="py-2 text-center font-semibold">Pts</th>
      </tr>
    </thead>
  );
}

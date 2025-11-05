interface TeamCardInterface {
  name: string;
  logo: string;
  department: string;
  estimated: string;
  size: number;
}

export default function TeamCard({ team }: { team: TeamCardInterface }) {
  return (
    <div className="flex rounded-2xl bg-white shadow-sm border border-gray-100 p-4">
      <div className="flex flex-col w-[25%] bg-amber-300 items-center p-4">
        <div></div>
      </div>
      <div className="flex flex-col grow bg-amber-500 p-4">TEAM INFO</div>
    </div>
  );
}

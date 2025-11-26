import TeamLogo from "@/components/team/TeamLogo";

interface TeamBadgeInterface {
  name: string;
  logo: string; // Path to logo image from the public folder
}

export default function TeamBadge({ name, logo }: TeamBadgeInterface) {
  return (
    <div className="w-28 flex flex-col items-center gap-2">
      <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center overflow-hidden shadow-sm border border-gray-100">
        <TeamLogo logo={logo} width={50} height={50} />
      </div>
      <span className="text-center text-sm text-gray-700">{name}</span>
    </div>
  );
}

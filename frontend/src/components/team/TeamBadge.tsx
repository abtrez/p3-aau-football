import TeamLogo from "@/components/team/TeamLogo";

interface TeamBadgeInterface {
  name: string;
  abbreviation: string;
  logo: string; // Path to logo image from the public folder
}

export default function TeamBadge({
  name,
  abbreviation,
  logo,
}: TeamBadgeInterface) {
  return (
    <div className="w-28 flex flex-col items-center gap-2">
      <div className="flex items-center overflow-hidden">
        <TeamLogo
          logo={logo}
          width={90}
          height={90}
          className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20" // Responsive logo size tailwind classes
        />
      </div>
      {/* Abbreviation for mobile view */}
      <span className="block sm:hidden text-center sm:text-sm font-medium text-neutral-800 leading-tight">
        {abbreviation}
      </span>
      {/* Full name for desktop view */}
      <span className="hidden sm:block text-center sm:text-sm font-medium text-neutral-800 leading-tight">
        {name}
      </span>
    </div>
  );
}

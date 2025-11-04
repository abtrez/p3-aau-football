import Image from "next/image";

interface TeamBadgeInterface {
  name: string;
  logo: string; // Path to logo image from the public folder
}

export default function TeamBadge({ name, logo }: TeamBadgeInterface) {
  return (
    <div className="w-28 flex flex-col items-center gap-2">
      <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center overflow-hidden shadow-sm border border-gray-100">
        <Image
          className="rounded-full h-[50] object-cover"
          src={logo}
          alt={`${name} logo`}
          width={50}
          height={50}
        />
      </div>
      <span className="w-full text-center text-sm font-medium text-gray-700 leading-tight">
        {name}
      </span>
    </div>
  );
}

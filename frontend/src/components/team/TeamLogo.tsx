import Image from "next/image";

interface TeamLogoInterface {
  logo: string;
  height: number;
  width: number;
  className?: string;
}

export default function TeamLogo({
  logo,
  height,
  width,
  className,
}: TeamLogoInterface) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <Image
        src={logo}
        alt="team logo"
        width={width}
        height={height}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

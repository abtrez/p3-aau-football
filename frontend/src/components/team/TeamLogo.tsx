import Image from "next/image";

interface TeamLogoInterface {
  logo: string;
  height: number;
  width: number;
}

export default function TeamLogo({ logo, height, width }: TeamLogoInterface) {
  return (
    <div className={"overflow-hidden rounded-full"} style={{ width, height }}>
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

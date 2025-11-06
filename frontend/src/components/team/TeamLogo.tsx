import Image from "next/image";

interface TeamLogoInterface {
  logo: string;
  height: number;
  width: number;
}

export default function TeamLogo({ logo, height, width }: TeamLogoInterface) {
  return (
    <Image
      className={`rounded-full object-cover h-[${height}]`}
      src={logo}
      height={height}
      width={width}
      alt={"team logo"}
    />
  );
}

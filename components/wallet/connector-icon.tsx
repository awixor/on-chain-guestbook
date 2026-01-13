import { WalletIcon } from "@/lib/icons";
import Image from "next/image";

interface ConnectorIconProps {
  icon?: string;
  name?: string;
  className?: string;
}

export default function ConnectorIcon({
  icon,
  name,
  className = "h-4 w-4",
}: ConnectorIconProps) {
  if (icon) {
    return <Image src={icon} alt={name ?? ""} width={20} height={20} />;
  }

  return <WalletIcon className={className} />;
}

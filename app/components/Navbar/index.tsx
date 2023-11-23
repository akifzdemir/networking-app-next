import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
const Profile = dynamic(() => import("./Profile"), {
  ssr: false,
  loading: () => <Loader2 strokeWidth={3} className="animate-spin" />,
});
type Props = {
  theme: string;
};

export default function Navbar({ theme }: Props) {
  return (
    <header className="flex flex-row fixed bg-background z-50 d   shadow-lg top-0 w-full h-20 items-center justify-between px-20">
      <div>LOGO</div>
      <div className="flex flex-row gap-4 items-center">
        <Profile />
        <span>
          <DarkModeToggle theme={theme} />
        </span>
      </div>
    </header>
  );
}
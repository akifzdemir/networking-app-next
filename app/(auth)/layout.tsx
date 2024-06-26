import { Metadata } from "next";
import LayoutMessage from "./layout-message";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        className="container relative 
       h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
      >
        <LayoutMessage />
        <div className="flex flex-col items-start justify-center h-screen lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">{children}</div>
        </div>
      </div>
    </>
  );
}

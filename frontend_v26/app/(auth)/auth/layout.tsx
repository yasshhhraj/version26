import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh w-dvw overflow-clip flex items-center justify-center">
      <div className="w-full h-full bg-center flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

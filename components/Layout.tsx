import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = "" }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-0">
      <div
        className={`w-full max-w-md bg-popx-bg min-h-screen sm:min-h-[630px] sm:h-auto sm:rounded-xl shadow-xl overflow-hidden relative flex flex-col ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

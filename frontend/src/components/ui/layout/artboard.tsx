import React, { ReactNode } from "react";

type ArtboardSize =
  | "phone-1"
  | "phone-2"
  | "phone-3"
  | "phone-4"
  | "phone-5"
  | "phone-6"
  | "tablet-1"
  | "tablet-2"
  | "desktop-1"
  | "desktop-2";

interface ArtboardProps {
  size: ArtboardSize;
  children?: ReactNode;
  className?: string;
}

const sizeMap: Record<ArtboardSize, string> = {
  "phone-1": "w-80 h-[568px]", // 320×568
  "phone-2": "w-96 h-[640px]", // 384×640
  "phone-3": "w-[360px] h-[640px]",
  "phone-4": "w-[375px] h-[667px]",
  "phone-5": "w-[414px] h-[736px]",
  "phone-6": "w-[320px] h-[1024px]",
  "tablet-1": "w-[768px] h-[1024px]",
  "tablet-2": "w-[1024px] h-[1366px]",
  "desktop-1": "w-[1280px] h-[720px]",
  "desktop-2": "w-[1920px] h-[1080px]",
};

const Artboard: React.FC<ArtboardProps> = ({
  size,
  children,
  className = "",
}) => {
  const sizeClasses = sizeMap[size];

  return (
    <div
      className={`border bg-background rounded-lg ${sizeClasses} ${className}`}
    >
      {children || `${size}`}
    </div>
  );
};

export default Artboard;

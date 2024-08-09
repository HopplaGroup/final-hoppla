import React from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils/cn";

const avatarVariants = cva("overflow-hidden", {
  variants: {
    size: {
      small: "w-10 h-10",
      medium: "w-12 h-12",
      large: "w-16 h-16",
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-lg",
    },
  },
  defaultVariants: {
    size: "medium",
    shape: "circle",
  },
});

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src: string;
  alt: string;
  className?: string;
  isBorder?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size,
  shape,
  className,
  isBorder,
}) => {
  const sizeMap: Record<string, number> = {
    small: 32,
    medium: 48,
    large: 64,
  };

  const dimensions = size && sizeMap[size] ? sizeMap[size] : 48;

  return (
    <div
      className={cn(
        avatarVariants({ size, shape }),
        {
          "ring-4 ring-foreground/30": isBorder,
          "ring-4 ring-background": !isBorder,
        },
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={dimensions}
        height={dimensions}
        className={cn("object-cover w-full h-full")}
      />
    </div>
  );
};

export const AvatarGroup: React.FC<{
  src: string[];
  size?: "small" | "medium" | "large";
  isBorder?: boolean;
  max?: number;
  shape?: "circle" | "square";
}> = ({ src, size = "medium", isBorder, max, shape }) => {
  return (
    <div className="flex items-center ">
      {src.slice(0, max).map((src, index) => (
        <Avatar
          key={index}
          src={src}
          alt={"Image " + index}
          size={size}
          shape={shape}
          isBorder={isBorder}
          className={cn("ml-[-16px]")}
        />
      ))}
      {max && src.length > max && (
        <div
          className={cn(
            avatarVariants({ size, shape }),
            {
              "ring-4 ring-foreground/30": isBorder,
              "ring-4 ring-background": !isBorder,
            },
            "ml-[-16px]"
          )}
        >
          <span className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground font-bold">
            +{src.length - max}
          </span>
        </div>
      )}
    </div>
  );
};

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { useRouter } from "next/navigation";

const buttonVariants = cva(
    "btn-animate inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/80",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-12 px-4",
                sm: "h-9 rounded-md px-3",
                lg: "h-12 rounded-md px-8",
                "sm-icon": "h-9 w-9",
                "default-icon": "h-12 w-12",
                "lg-icon": "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    href?: string;
    asChild?: boolean;
    startContent?: React.ReactNode;
    locale?: "en" | "ka";
    doRefresh?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            onClick,
            asChild,
            size,
            href,
            startContent,
            locale,
            doRefresh,
            ...props
        },
        ref
    ) => {
        const router = useRouter();

        const _onClick = (
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => {
            if (props.disabled) {
                e.preventDefault();
                return;
            }

            if (onClick) {
                onClick(e);
            }

            if (href) {
                router.push(href);
            }

            if (doRefresh) {
                router.refresh();
            }
        };

        const Comp = asChild ? Slot : "button";

        return (
            <Comp
                {...props}
                className={cn(
                    buttonVariants({ variant, size, className }),
                    "join-item",
                    { "pointer-events-none opacity-50": props.disabled }
                )}
                ref={ref}
                onClick={_onClick}
            >
                {startContent && <span className="mr-2">{startContent}</span>}
                {props.children}
            </Comp>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };

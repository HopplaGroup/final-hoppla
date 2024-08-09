"use client";

import * as React from "react";
import * as RadixUIDialog from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils/cn";
import { ButtonProps, Button } from "./button";

const ModalMain = RadixUIDialog.Root;

const ModalTrigger = (props: ButtonProps) => (
  <RadixUIDialog.Trigger asChild>
    <Button {...props} />
  </RadixUIDialog.Trigger>
);

const ModalPortal = RadixUIDialog.Portal;

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof RadixUIDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixUIDialog.Overlay>
>(({ className, ...props }, ref) => (
  <RadixUIDialog.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/50  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
));
ModalOverlay.displayName = RadixUIDialog.Overlay.displayName;

const ModalContent = React.forwardRef<
  React.ElementRef<typeof RadixUIDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixUIDialog.Content>
>(({ className, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <RadixUIDialog.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </ModalPortal>
));
ModalContent.displayName = RadixUIDialog.Content.displayName;

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
ModalHeader.displayName = "ModalHeader";

const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
ModalFooter.displayName = "ModalFooter";

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof RadixUIDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixUIDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixUIDialog.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
ModalTitle.displayName = RadixUIDialog.Title.displayName;

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof RadixUIDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RadixUIDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixUIDialog.Description
    ref={ref}
    className={cn("", className)}
    {...props}
  />
));
ModalDescription.displayName = RadixUIDialog.Description.displayName;

const ModalAction = (props: ButtonProps) => (
  <RadixUIDialog.Action asChild>
    <Button {...props} />
  </RadixUIDialog.Action>
);

ModalAction.displayName = RadixUIDialog.Action.displayName;

const ModalCancel = (props: ButtonProps) => (
  <RadixUIDialog.Cancel asChild>
    <Button {...props} variant={props.variant || "ghost"} />
  </RadixUIDialog.Cancel>
);

ModalCancel.displayName = RadixUIDialog.Cancel.displayName;

export {
  ModalMain,
  ModalPortal,
  ModalOverlay,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalAction,
  ModalCancel,
};

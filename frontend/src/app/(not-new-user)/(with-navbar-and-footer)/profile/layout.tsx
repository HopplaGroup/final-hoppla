import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/utils/auth";
import { cn } from "@/lib/utils/cn";
import { Home, Milestone, Settings, Ticket } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { SidebarNavigationLink } from "./side-navigation-link";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function ProfileLayout({ children }: LayoutProps) {
  const user = await getUser();

  if (!user) redirect("/");

  return (
    <div className="container">
      <MobileNavigation />
      <div className="grid md:grid-cols-[300px,1fr]  gap-6 mt-5">
        <SidebarNavigation />
        <div>{children}</div>
      </div>
    </div>
  );
}

const NAV_LINKS: SidebarNavigationLink[] = [
  {
    icon: <Home size={22} />,
    label: "Home",
    description: "Stats and Cars",
    href: "/profile",
  },
  {
    icon: <Milestone size={22} />,
    label: "Rides",
    description: "Check your rides",
    href: "/profile/rides",
  },
  {
    icon: <Ticket size={22} />,
    label: "Trips",
    description: "See your trips",
    href: "/profile/trips",
  },
];

const MANAGE_LINKS: SidebarNavigationLink[] = [
  {
    icon: <Settings size={22} />,
    label: "Settings",
    description: "Edit user details",
    href: "/profile/settings",
  },
];

type SidebarNavigationLink = {
  icon: React.ReactNode;
  label: string;
  description: string;
  href: string;
};

function MobileNavigation() {
  return (
    <div className="block md:hidden fixed bottom-0 z-50 w-full left-0 bg-white border-t border-gray-200">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        {[...NAV_LINKS, ...MANAGE_LINKS].map(
          ({ description, href, icon, label }, index) => (
            <Link
              key={index}
              href={href}
              data-tooltip-target="tooltip-home"
              type="button"
              className="inline-flex flex-col items-center justify-center p-4 py-5 hover:bg-gray-50 group"
            >
              {icon}
              <span className="sr-only">{label}</span>
            </Link>
          )
        )}
      </div>
    </div>
  );
}

function SidebarNavigation() {
  return (
    <aside className="bg-white border-2 border-dashed rounded-md p-5 hidden md:block h-fit">
      <div>
        <h3 className="text-sm font-semibold">Navigation</h3>
        {NAV_LINKS.map((props, index) => (
          <SidebarNavigationLink key={index} {...props} />
        ))}
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-semibold">Manage</h3>
        {MANAGE_LINKS.map((props, index) => (
          <SidebarNavigationLink key={index} {...props} />
        ))}
      </div>
    </aside>
  );
}
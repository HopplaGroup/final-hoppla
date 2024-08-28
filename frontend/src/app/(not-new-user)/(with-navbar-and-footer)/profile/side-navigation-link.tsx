"use client";
import { cn } from "@/lib/utils/cn";
import { languageTag } from "@/paraglide/runtime";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarNavigationLink = {
  icon: React.ReactNode;
  label: string;
  description: string;
  href: string;
};

export function SidebarNavigationLink({
  description,
  href,
  icon,
  label,
}: SidebarNavigationLink) {
  // this linke can be active as well
  const pathname = usePathname();
  // console.log({
  //   pathname,
  //   href,
  // });
  const isActive =
    (pathname.includes(href) && href !== "/profile") ||
    (href === "/profile" && pathname === `/${languageTag()}/profile`);
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 mt-3 bg-white p-2 px-3 rounded-md hover:bg-gray-100 duration-200 transition-all",
        {
          " border-dashed border-2": true,
          "bg-gray-100 cursor-default": isActive,
        }
      )}
    >
      {icon}
      <div className="flex flex-col gap-0">
        <h2 className="text-md font-semibold">{label}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
}

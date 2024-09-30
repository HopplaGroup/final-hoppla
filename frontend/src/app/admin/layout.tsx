import { getUser } from "@/lib/utils/auth";
import MySidebar from "./sidebar";
import { redirect } from "next/navigation";
import Stats from "./stats";

export default async function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const user = await getUser();

    if (!user || user.status !== "ACTIVE" || user.role !== "ADMIN") {
        redirect("/");
    }

    return (
        <div className="min-h-screen font-sans antialiased bg-gray-100 grid grid-cols-[auto,1fr]">
            <MySidebar />
            <div className="p-5">
                <Stats />
                <div>{children}</div>
            </div>
        </div>
    );
}

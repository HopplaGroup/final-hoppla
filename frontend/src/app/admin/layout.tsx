import { getUser } from "@/lib/utils/auth";
import { redirect } from "next/navigation";
import Navigation from "./_components/Navigation";

export default async function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const user = await getUser();

    if (!user || user.status !== "ACTIVE" || user.role !== "ADMIN") {
        redirect("/");
    }

    return (
        <div className="min-h-screen font-sans antialiased bg-gray-100">
            <Navigation>
                <div>{children}</div>
            </Navigation>
        </div>
    );
}

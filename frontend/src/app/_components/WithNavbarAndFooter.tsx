import { getUser } from "@/lib/utils/auth";
import TwoColumnFooter from "@/components/common/footer/footer";
import { Navbar } from "@/components/common/navbar/navbar";

export default async function WithNavbarAndFooter({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getUser();

    return (
        <div className="grid grid-rows-[auto_1fr_auto] grid-cols-1 min-h-screen">
            <header>
                <Navbar user={user} />
            </header>
            <main className="mt-20">{children}</main>
            <div>
                <TwoColumnFooter />
            </div>
        </div>
    );
}

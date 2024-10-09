import TwoColumnFooter from "@/components/common/footer/footer";
import { Navbar } from "@/components/common/navbar/navbar";
import { getUser } from "@/lib/utils/auth";
import db from "@/lib/utils/db";

export default async function WithNavbarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getUser();
    const car =
        user &&
        (await db.car.findFirst({
            where: {
                ownerId: user.id,
            },
        }));

    const driverHasCar = !!car;

    return (
        <>
            <div className="grid grid-rows-[auto_1fr_auto] grid-cols-1 min-h-screen">
                <header>
                    <Navbar driverHasCar={driverHasCar} />
                </header>
                <main className="mt-20">{children}</main>
                <div>
                    <TwoColumnFooter />
                </div>
            </div>
        </>
    );
}

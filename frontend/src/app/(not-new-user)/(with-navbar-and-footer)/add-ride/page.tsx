import { getUser } from "@/lib/utils/auth";
import db from "@/lib/utils/db";
import { redirect } from "next/navigation";
import { CreateRideForm } from "./form";
import * as m from "@/paraglide/messages.js";

type AddCarPageProps = {
    params: {};
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AddCarPage({
    params,
    searchParams,
}: AddCarPageProps) {
    const user = await getUser();
    if (!user) {
        redirect("/");
    }
    const cars = await db.car.findMany({
        where: {
            ownerId: user.id,
        },
    });

    const rules = await db.rule.findMany({});

    if (cars.length === 0) {
        redirect("/profile?action=add-car");
    }

    return (
        <>
            <div className="py-14 container">
                <div className="flex flex-col text-center items-center gap-12">
                    <div>
                        <h1 className="text-3xl font-bold  sm:text-4xl lg:text-5xl lg:leading-tight">
                            {m.aqua_brave_turkey_treat()}
                        </h1>
                        <p className="mt-1 md:text-lg ">
                            {m.aware_pink_stork_walk()}
                        </p>
                    </div>

                    <div className="relative w-full max-w-lg text-center">
                        <CreateRideForm rules={rules} cars={cars} user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}

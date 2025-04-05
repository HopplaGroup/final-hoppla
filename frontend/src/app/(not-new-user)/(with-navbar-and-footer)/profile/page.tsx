"use client";
import AddCar from "./add-car";
import Cars from "./cars";
import { getUser } from "@/lib/utils/auth";
import { Stats } from "./stats";
import AddCarAlert from "./add-car-alert";
import * as m from "@/paraglide/messages.js";
import db from "@/lib/utils/db";
import Link from "next/link";
import { useUser } from "@/lib/providers/user-provider";
import { useFindUniqueDriverVerificationRequest } from "@/lib/hooks";

export default async function ProfileGeneralPage() {
    const { user } = useUser();
    const { data: driverVerificationRequest } =
        useFindUniqueDriverVerificationRequest(
            {
                where: {
                    driverId: user?.id,
                },
            },
            {
                enabled: !!user,
            }
        );

    return (
        <div>
            {/* <AddCarAlert /> */}
            <Stats userId={user!.id} />
            {/* {(driverVerificationRequest?.status === "PENDING" ||
                driverVerificationRequest?.status === "APPROVED") && (
                
            )} */}

            <div className="">
                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                    {m.candid_heroic_midge_relish()}
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500 max-w-xl lg:max-w-3xl">
                    {m.key_full_camel_scold()}
                </p>

                <div className="mt-4">
                    <div className="mt-5 grid lg:grid-cols-2 xl:grid-cols-5 gap-4">
                        <AddCar />
                        <Cars userId={user!.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}

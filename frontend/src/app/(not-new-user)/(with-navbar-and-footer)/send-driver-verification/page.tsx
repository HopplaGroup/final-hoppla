import { getUser } from "@/lib/utils/auth";
import db from "@/lib/utils/db";
import { redirect } from "next/navigation";
import { SendDriverRequestForm } from "./form";
import * as m from "@/paraglide/messages.js";

type DriverVerficationRequestPageProps = {
    params: {};
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function DriverVerficationRequestPage({
    params,
    searchParams,
}: DriverVerficationRequestPageProps) {
    const user = await getUser();

    if (!user) {
        redirect("/");
    }

    const response = await db.driverVerificationRequest.findUnique({
        where: {
            driverId: user.id,
        },
    });

    return (
        <>
            <div className="py-14 container">
                <div className="flex flex-col text-center items-center gap-12">
                    <div className="text-start">
                        <h1 className="text-3xl font-bold  sm:text-4xl lg:text-5xl lg:leading-tight">
                            {m.tiny_direct_gecko_lock()}
                        </h1>
                        <p className="mt-1 md:text-lg ">
                            {m.sleek_petty_stork_blink()}
                        </p>
                    </div>

                    <div className="relative w-full max-w-lg text-center">
                        <SendDriverRequestForm
                            user={user}
                            driverVerificationRequest={response}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

"use client";

import { ShieldQuestion } from "lucide-react";
import * as m from "@/paraglide/messages.js";
import Link from "next/link";
import { useUser } from "@/lib/providers/UserProvider";
import { useFindUniqueDriverVerificationRequest } from "@/lib/hooks";

export default function NotDriverAlert() {
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

    if (driverVerificationRequest) {
        return null;
    }

    return (
        <div
            role="alert"
            className="rounded border-s-4 border-s-green-200 mt-5 bg-green-50 p-4 mb-5 border-solid"
        >
            <div className="flex items-center gap-2 text-green-600">
                <ShieldQuestion size={24} />
                <strong className="block font-medium">
                    {m.trick_polite_frog_gleam()}
                </strong>
            </div>

            <p className="mt-2 text-sm  max-w-xl lg:max-w-3xl">
                {m.green_cool_gull_fear()}
            </p>
            <div className="mt-4">
                <Link
                    href="/send-driver-verification"
                    className="text-green-600 underline"
                >
                    {m.quaint_mushy_wasp_learn()}
                </Link>
            </div>
        </div>
    );
}

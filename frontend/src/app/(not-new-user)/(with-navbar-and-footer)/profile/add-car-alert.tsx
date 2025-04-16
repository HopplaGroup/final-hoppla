"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import * as m from "@/paraglide/messages.js";
import { useSearchParams } from "next/navigation";

export default function AddCarAlert() {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get("action") === "add-car") {
            toast(m.quick_moving_husky_clip(), {
                icon: "🚗",
            });
            window.history.replaceState({}, "", "/profile");
        }
    }, [searchParams]);

    return null;
}

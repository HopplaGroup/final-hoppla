"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AddCarAlert() {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get("action") === "add-car") {
            toast(
                "You need to add a car before you can create a ride or join a trip.",
                {
                    icon: "🚗",
                }
            );
            window.history.replaceState({}, "", "/profile");
        }
    }, []);

    return null;
}

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import * as m from "@/paraglide/messages.js";

export default function AddCarAlert() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("action") === "add-car") {
      toast(m.quick_moving_husky_clip(), {
        icon: "🚗",
      });
      window.history.replaceState({}, "", "/profile");
    }
  }, []);

  return null;
}

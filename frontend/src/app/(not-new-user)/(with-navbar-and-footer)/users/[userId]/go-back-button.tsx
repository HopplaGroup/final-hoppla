"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import * as m from "@/paraglide/messages.js";

export default function GoBackButton() {
    const router = useRouter();
    return (
        <Button
            onClick={() => router.back()}
            variant="ghost"
            className="flex items-center gap-2 font-semibold"
        >
            <ChevronLeft size={24} /> <span>{m.full_lost_swan_win()}</span>
        </Button>
    );
}

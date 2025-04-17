"use client";
import { useRouter } from "@/lib/i18n";
import { ArrowLeft } from "lucide-react";
import * as m from "@/paraglide/messages.js";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 transition-colors"
        >
            <ArrowLeft className="w-4 h-4" />
            <span>{m.cozy_awful_hare_file()}</span>
        </button>
    );
}

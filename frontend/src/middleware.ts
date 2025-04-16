import { middleware as _i18nMiddleware } from "@/lib/i18n";
import { NextRequest } from "next/server";
import { availableLanguageTags } from "./paraglide/runtime";

export function middleware(request: NextRequest) {
    const NEXT_LOCALE = request.cookies.get("NEXT_LOCALE");
    if (
        !NEXT_LOCALE &&
        availableLanguageTags.every((tag) => !request.url.startsWith(`/${tag}`))
    ) {
        request.cookies.set("NEXT_LOCALE", "ka");
    }
    return _i18nMiddleware(request);
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp|.*\\.ico|.*\\.woff2?|.*\\.ttf|.*\\.eot|.*\\.json|.*\\.txt|.*\\.html|.*\\.mp4|.*\\.mp3|.*\\.ogg).*)",
    ],
};

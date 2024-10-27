import { middleware as _i18nMiddleware } from "@/lib/i18n";
import { NextRequest } from "next/server";
import { availableLanguageTags } from "./paraglide/runtime";

export function middleware(request: NextRequest) {
    const NEXT_LOCALE = request.cookies.get("NEXT_LOCALE");
    if (
        !NEXT_LOCALE &&
        availableLanguageTags.every((tag) => !request.url.startsWith(`/${tag}`))
    ) {
        request.cookies.set("NEXT_LOCALE", "en");
    }
    return _i18nMiddleware(request);
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sw.js|web-app-manifest-192x192.png|web-app-manifest-512x512.png|apple-touch-icon.png|favicon-48x48.png|favicon.svg|site.webmanifest|offline.html|manifest.webmanifest).*)",
    ],
};

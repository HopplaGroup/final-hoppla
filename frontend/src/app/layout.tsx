import { LanguageProvider } from "@inlang/paraglide-next";
import { languageTag } from "@/paraglide/runtime.js";
import "react-loading-skeleton/dist/skeleton.css";
import "react-responsive-pagination/themes/classic.css";
import "@/lib/styles/globals.css";
import { cn } from "@/lib/utils/cn";
import { MainProvider } from "@/lib/providers/mainProvider";
import { Toaster } from "react-hot-toast";
import { getUser } from "@/lib/utils/auth";
import type { Metadata } from "next";
import * as m from "@/paraglide/messages.js";
import Script from "next/script";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Logo } from "@/components/common/logo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
    return {
        metadataBase: new URL("https://hoppla.ge"),
        title: m.weird_salty_baboon_slide(),
        description: m.long_suave_tern_intend(),
        openGraph: {
            locale: languageTag(),
            images: "/assets/opengraph-image.jpg",
        },
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getUser();

    const blockedContent = (
        <div className="">
            <section className="">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div>
                        <Logo />
                    </div>
                    <div className="w-full text-center p-6 ">
                        <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Your account is blocked!
                        </h1>
                        <p className="">
                            Please contact support to resolve this issue.
                        </p>
                        <div className="flex flex-col items-center justify-center mt-6 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                            <a
                                href="mailto:
                                m@gmail.com"
                                className="flex items-center justify-center w-full px-6 py-3 text-sm text-white bg-primary rounded-lg sm:w-auto sm:px-8 sm:py-4 hover:bg-primary/60"
                            >
                                Contact Support
                            </a>
                            <LogoutLink className="flex items-center justify-center w-full px-6 py-3 text-sm text-primary bg-gray-100 rounded-lg sm:w-auto sm:px-8 sm:py-4 hover:bg-gray-200 font-semibold">
                                Logout
                            </LogoutLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

    // console.log("user", user);

    return (
        <LanguageProvider>
            <html lang={languageTag()} suppressHydrationWarning>
                <body
                    className={cn(
                        "min-h-screen font-sans antialiased bg-gray-100"
                    )}
                >
                    <MainProvider user={user}>
                        {user && user.status === "BLOCKED"
                            ? blockedContent
                            : children}
                        <Toaster />
                    </MainProvider>
                </body>
                <Script
                    defer
                    src="https://umami.hoppla.ge/script.js"
                    data-website-id="830aaf27-d46b-4952-9620-6d29c00e2617"
                />
            </html>
        </LanguageProvider>
    );
}

import { LanguageProvider } from "@inlang/paraglide-next";
import { languageTag } from "@/paraglide/runtime.js";
import "@/lib/styles/globals.css";
import { cn } from "@/lib/utils/cn";
import { MainProvider } from "@/lib/providers/mainProvider";
import { Toaster } from "react-hot-toast";
import { getUser } from "@/lib/utils/auth";
import type { Metadata } from "next";
import * as m from "@/paraglide/messages.js";
import Script from "next/script";

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

  return (
    <LanguageProvider>
      <html lang={languageTag()} suppressHydrationWarning>
        <body className={cn("min-h-screen font-sans antialiased bg-gray-100")}>
          <MainProvider user={user}>
            {/* <RealtimeComponent /> */}
            {children}
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

import { LanguageProvider } from "@inlang/paraglide-next";
import { languageTag } from "@/paraglide/runtime.js";
import "@/lib/styles/globals.css";
import { cn } from "@/lib/utils/cn";
import { MainProvider } from "@/lib/providers/mainProvider";
import { Toaster } from "react-hot-toast";
import { getUser } from "@/lib/utils/auth";
import type { Metadata } from "next";
import * as m from "@/paraglide/messages.js";

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
      </html>
    </LanguageProvider>
  );
}

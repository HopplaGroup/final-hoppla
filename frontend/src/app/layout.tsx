import { LanguageProvider } from "@inlang/paraglide-next";
import { languageTag } from "@/paraglide/runtime.js";
import { rootMetadata } from "@/lib/constants/root-metadata";
import "@/lib/styles/globals.css";
import { cn } from "@/lib/utils/cn";
import { MainProvider } from "@/lib/providers/mainProvider";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/common/navbar/navbar";
import { getUser } from "@/lib/utils/auth";
import Footer from "@/components/common/footer/footer";
import type { Metadata } from "next";
import * as m from "@/paraglide/messages.js";
import api from "@/lib/utils/api";

export const dynamic = "force-dynamic";

// export const metadata = rootMetadata;
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
  // const searchedPlaces = await api.v1.getPlacesByName.get({
  //   $query: {

  //   },
  // });

  // fake_users.error
  return (
    <LanguageProvider>
      <html lang={languageTag()} suppressHydrationWarning>
        <body className={cn("min-h-screen font-sans antialiased")}>
          <MainProvider user={user}>
            <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
              <header>
                <Navbar />
              </header>
              <main className="mt-20">
                {/* <pre>
                  <code>{JSON.stringify(fake_users, null, 2)}</code>
                </pre> */}
                {children} <Toaster />
              </main>
              <div>
                <Footer />
              </div>
            </div>
          </MainProvider>
        </body>
      </html>
    </LanguageProvider>
  );
}

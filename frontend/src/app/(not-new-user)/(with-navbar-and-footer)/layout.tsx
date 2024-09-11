import TwoColumnFooter from "@/components/common/footer/footer";
import { Navbar } from "@/components/common/navbar/navbar";
import BackgroundCross from "@/components/ui/bg-cross";

export default function WithNavbarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
                <header>
                    <Navbar />
                </header>
                <main className="mt-20">{children}</main>
                <div>
                    <TwoColumnFooter />
                </div>
            </div>
        </>
    );
}

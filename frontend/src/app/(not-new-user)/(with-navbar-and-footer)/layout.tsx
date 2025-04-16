import WithNavbarAndFooter from "@/app/_components/WithNavbarAndFooter";

export default async function WithNavbarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <WithNavbarAndFooter>{children}</WithNavbarAndFooter>;
}

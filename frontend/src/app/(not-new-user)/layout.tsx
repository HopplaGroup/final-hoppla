import { getUser } from "@/lib/utils/auth";
import { redirect } from "next/navigation";

export default async function NotNewUserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getUser();

    if (user && user.isNewUser) {
        redirect("/onboarding");
    }

    return children;
}

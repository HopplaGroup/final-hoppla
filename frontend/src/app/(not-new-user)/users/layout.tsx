import { getUser } from "@/lib/utils/auth";
import { redirect } from "next/navigation";

export default async function UsersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const loggedUser = await getUser();
    if (!loggedUser) {
        redirect("/");
    }
    return children;
}

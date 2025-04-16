import { getUser } from "@/lib/utils/auth";
import { redirect } from "next/navigation";
import OnboardingForm from "./_components/OnboardingForm";

export default async function OnboardingPage() {
    const user = await getUser();

    if (!user || !user.isNewUser) {
        redirect("/");
    }

    return <OnboardingForm />;
}

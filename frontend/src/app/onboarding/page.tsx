import { getUser } from "@/lib/utils/auth";
import { redirect } from "next/navigation";
import OnboardingForm from "./OnboardingForm";

export default async function OnBoardingPage() {
    const user = await getUser();

    if (!user || !user.isNewUser) {
        redirect("/");
    }

    return <OnboardingForm />;
}

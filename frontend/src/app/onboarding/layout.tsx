import { getUser } from "@/lib/utils/auth";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default async function OnBoardingLayout({ children }: Props) {
  const user = await getUser();

  if (!user || !user.isNewUser) {
    redirect("/profile");
  }

  return children;
}

import { getUser } from "@/lib/utils/auth";
import { ProfileSettingsForm } from "./profile-settings-form";
import { Button } from "@react-email/components";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import * as m from "@/paraglide/messages.js";
import { Separator } from "@/components/ui/separator";

export default async function ProfileSettingsPage() {
  const user = await getUser();
  return (
    <main className="">
      <div className="max-w-xl lg:max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          {m.true_main_fly_twirl()}
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
          {m.best_royal_earthworm_accept()}
        </p>

        <div className="mt-4">
          <ProfileSettingsForm user={user as any} />
          <Separator />
          <Button type="button" className="mt-4  rounded-lg bg-gray-500">
            <LogoutLink className="flex items-center py-2 px-5 text-white justify-center">
              {m.extra_lucky_rook_trust()}
            </LogoutLink>
          </Button>
        </div>
      </div>
    </main>
  );
}

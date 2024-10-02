import { getUser } from "@/lib/utils/auth";
import { ProfileSettingsForm } from "./profile-settings-form";

export default async function ProfileSettingsPage() {
  const user = await getUser();
  return (
    <main className="">
      <div className="max-w-xl lg:max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Edit your profile
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
          Change your profile infromation from here and fill what describes you
          the best
        </p>

        <div className="mt-4">
          <ProfileSettingsForm user={user as any} />
        </div>
      </div>
    </main>
  );
}

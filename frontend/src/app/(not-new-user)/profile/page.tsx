import { UploadForm } from "@/components/S3UploadForm";
import { Button } from "@/components/ui/actions/button";
import { getUser } from "@/lib/utils/auth";
import { UserImage } from "./user-image";
import { redirect } from "next/navigation";
import db from "@/lib/utils/db";

export default async function DashboardPage() {
  const user = await getUser();

  if (!user) redirect("/");

  const driverVerificationRequest =
    await db.driverVerificationRequest.findUnique({
      where: {
        driverId: user.id,
      },
    });

  return (
    <section className="relative pt-28 pb-20">
      <img
        src="https://pagedone.io/asset/uploads/1705471739.png"
        alt="cover-image"
        className="w-full absolute top-0 left-0 z-0 h-60"
      />
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center relative z-10 mb-2.5">
          <UserImage user={user} />
        </div>
        <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
          <div className="flex items-center gap-5">
            {(driverVerificationRequest?.status === "PENDING" ||
              !driverVerificationRequest) && (
              <Button variant="outline" href="/send-driver-request">
                {driverVerificationRequest
                  ? "Edit Driver Request"
                  : "Send Driver Request"}
              </Button>
            )}
            {driverVerificationRequest?.status === "REJECTED" &&
              "U are rejected"}
            {driverVerificationRequest?.status === "APPROVED" &&
              "U are approved"}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">Message</Button>

            <Button>Book a Session</Button>
          </div>
        </div>
        <h3 className="text-center font-manrope font-bold text-3xl leading-10 text-gray-900 mb-3">
          {user.name}
        </h3>
        <p className="font-normal text-base leading-7 text-gray-500 text-center mb-8">
          A social media influencers and singer
        </p>
      </div>
    </section>
  );
}

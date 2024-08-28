import { getUser } from "@/lib/utils/auth";
import db from "@/lib/utils/db";
import { redirect } from "next/navigation";
import { SendDriverRequestForm } from "./form";

type DriverVerficationRequestPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function DriverVerficationRequestPage({
  params,
  searchParams,
}: DriverVerficationRequestPageProps) {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const response = await db.driverVerificationRequest.findUnique({
    where: {
      driverId: user.id,
    },
  });

  return (
    <>
      <div className="py-14 container">
        <div className="flex flex-col text-center items-center gap-12">
          <div>
            <h1 className="text-3xl font-bold  sm:text-4xl lg:text-5xl lg:leading-tight">
              Send Driver Request
            </h1>
            <p className="mt-1 md:text-lg ">
              We will verify your driver request and get back to you soon.
            </p>
          </div>

          <div className="relative w-full max-w-lg text-center">
            <SendDriverRequestForm
              user={user}
              driverVerificationRequest={response}
            />
          </div>
        </div>
      </div>
    </>
  );
}

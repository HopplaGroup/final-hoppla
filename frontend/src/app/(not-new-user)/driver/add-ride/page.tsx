import { getUser } from "@/lib/utils/auth";
import db from "@/lib/utils/db";
import { redirect } from "next/navigation";
import { CreateRideForm } from "./form";

type AddCarPageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AddCarPage({
  params,
  searchParams,
}: AddCarPageProps) {
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
              Add ride
            </h1>
            <p className="mt-1 md:text-lg ">
              Add your car details and then add ride.
            </p>
          </div>

          <div className="relative w-full max-w-lg text-center">
            {/* <SendDriverRequestForm
              user={user}
              driverVerificationRequest={response}
            /> */}
            <CreateRideForm user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
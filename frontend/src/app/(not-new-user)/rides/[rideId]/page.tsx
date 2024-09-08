import { getUser } from "@/lib/utils/auth";
import { Ride } from "./ride";
import { redirect } from "next/navigation";

type RidesPageProps = {
    params: { rideId: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function RidesPage({
    params,
    searchParams,
}: RidesPageProps) {
    const { rideId } = params;
    const user = await getUser();
    if (!user) {
        redirect("/");
    }

    return <Ride rideId={rideId} userId={user.id} />;
}

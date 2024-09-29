"use client";

import { useDeleteCar, useFindManyCar } from "@/lib/hooks";
import { Car, Prisma } from "@zenstackhq/runtime/models";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils/cn";
import { Delete, Ellipsis, LoaderCircle, Stars, Trash } from "lucide-react";

export default function Cars({ userId }: { userId: string }) {
    const { data: cars, isLoading } = useFindManyCar({
        where: {
            ownerId: userId,
        },
        include: {
            rides: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // skeleton loading
    if (isLoading)
        return (
            <div className="h-36 bg-gray-200 rounded-xl border-2 border-dashed  animate-pulse"></div>
        );
    // console.log({
    //   cars,
    // });
    return cars?.map((car) => <CarCard key={car.id} car={car} />);
}

function CarCard({
    car,
}: {
    car: Prisma.CarGetPayload<{
        include: {
            rides: true;
        };
    }> & {
        $optimistic?: boolean | undefined;
    };
}) {
    const { mutate } = useDeleteCar({
        optimisticUpdate: true,
    });

    return (
        <div className="flex flex-col lg:flex-row w-full items-center min-h-36 bg-white rounded-xl border-2 border-dashed xl:col-span-2">
            <img
                className="h-[200px] lg:h-full w-full lg:w-[100px] object-cover rounded-l-xl"
                src={car.photos?.[0]}
                alt=""
            />
            <div className="p-4 px-5 w-full">
                <div className="space-y-1">
                    <h4 className="text-sm font-medium leading-none">
                        {car.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        {car.mark} <br />
                        {car.plate}
                    </p>
                </div>
                <Separator className="my-4" />
                <div className="flex h-5 items-center space-x-4 text-sm">
                    {/* <div>{car.capacity}</div> */}
                    <div>
                        {car.status === "APPROVED" ? (
                            <span className="text-green-500">APPROVED</span>
                        ) : car.status === "PENDING" ? (
                            <span className="text-orange-500">PENDING</span>
                        ) : (
                            <span className="text-red-500">REJECTED</span>
                        )}
                    </div>
                    <Separator orientation="vertical" />
                    <div>{car.type}</div>
                    {!car.$optimistic && car.rides.length === 0 && (
                        <>
                            <Separator orientation="vertical" />
                            <div
                                onClick={() => {
                                    mutate({
                                        where: {
                                            id: car.id,
                                        },
                                    });
                                }}
                                className={cn(
                                    "text-red-600 hover:underline cursor-pointer",
                                    {}
                                )}
                            >
                                Delete
                            </div>
                        </>
                    )}
                    {car.$optimistic && (
                        <>
                            <Separator orientation="vertical" />
                            <LoaderCircle size={18} className="animate-spin" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

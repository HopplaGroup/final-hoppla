"use client";

import { useDeleteCar, useFindManyCar } from "@/lib/hooks";
import { Car, Prisma } from "@zenstackhq/runtime/models";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils/cn";
import { Delete, Ellipsis, LoaderCircle, Stars, Trash } from "lucide-react";
import * as m from "@/paraglide/messages.js";

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
      <div className="h-36 bg-gray-200 rounded-xl border-2  animate-pulse"></div>
    );
  // console.log({
  //   cars,
  // });

  //   const carsList = Array.from({ length: 10 }, () => cars[0]);

  //   return carsList?.map((car, index) => <CarCard key={index} car={car} />);

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
    <div className="flex flex-col lg:flex-row w-full bg-white rounded-xl border-2 xl:col-span-2 overflow-hidden">
      <img
        className="h-[200px] sm:h-[320px] lg:h-[140px] w-full lg:w-[200px] object-cover"
        src={car.photos?.[0]}
        alt=""
      />
      <div className="p-4 w-full">
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">{car.name}</h4>
          <p className="text-sm text-muted-foreground">
            {car.mark} <br />
            {car.plate}
          </p>
        </div>
        <Separator className="my-2" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>
            {car.status === "APPROVED" ? (
              <span className="text-green-500">
                {m.sour_gray_nuthatch_strive()}
              </span>
            ) : car.status === "PENDING" ? (
              <span className="text-orange-500">
                {m.short_mad_firefox_trust()}
              </span>
            ) : (
              <span className="text-red-500">{m.trite_livid_finch_spur()}</span>
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
                className="text-red-600 hover:underline cursor-pointer"
              >
                {m.agent_tasty_squirrel_pick()}
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

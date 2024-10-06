// components/RideCard.tsx
import Link from "next/link";
import { format } from "date-fns";
import { Divide, Stars } from "lucide-react";

import Image from "next/image";
import { SVGCarMinivan, SVGCarStandard, SVGSeat } from "./svgs";
import { Separator } from "@/components/ui/separator";
import { dummyRules, ruleToIcon } from "./rule-icons";

import { RideResponse } from "../response-ride-type";
import PLACES from "@/lib/constants/places";
import { languageTag } from "@/paraglide/runtime";
import { cn } from "@/lib/utils/cn";

type RideCardProps = {
  ride: RideResponse;
};

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}`;
};

import * as m from "@/paraglide/messages.js";

const RideCard: React.FC<RideCardProps> = ({ ride }) => {
  const maxSeats = ride.availableSeats;
  const takenSeats = ride.passengers.length;
  const isFull = maxSeats == takenSeats;

  return (
    <div className="bg-white hover:outline hover:outline-1 hover:outline-primary shadow-md rounded-md">
      <Link href={`/rides/${ride.id}`}>
        <div className="p-5 relative">
          <div className="absolute right-[24px] top-[24px] ">
            <div className="p-1  rounded-md text-3xl text-gray-800">
              {ride.price} ₾
            </div>
          </div>

          <div
            className={cn(
              "absolute flex right-[24px]  top-[80px] items-center",
              {
                "fill-primary text-primary": isFull,
                "fill-gray-500 text-black": !isFull,
              }
            )}
          >
            <SVGSeat className="w-8 h-8 " />
            <div className="">
              {takenSeats} {"/"} {maxSeats}{" "}
            </div>
          </div>

          {/* <span className="text-gray-400">Today</span> */}

          <div className="lg:hidden small-from-to relative">
            <div className="flex gap-x-2">
              <div className="w-10 h-7 flex items-center">
                <span className="text-sm text-primary font-semibold dark:text-neutral-400">
                  {format(
                    new Date(new Date(ride.departure).getTime()),
                    "HH:mm"
                  )}
                </span>
              </div>

              <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                <div className="relative z-10 size-7 flex justify-center items-center">
                  <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8">
                <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                  {PLACES.find((p) => p.osm === ride.from)?.name[languageTag()]}
                </h3>
              </div>
            </div>

            <div className="flex gap-x-2">
              <div className="w-10 h-7 flex items-center">
                <span className="text-sm text-primary font-semibold dark:text-neutral-400">
                  {format(
                    new Date(
                      new Date(ride.departure).getTime() + ride.duration * 1000
                    ),
                    "HH:mm"
                  )}
                </span>
              </div>

              <div className="relative ">
                <div className="relative z-10 size-7 flex justify-center items-center">
                  <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                </div>
              </div>

              <div className="grow pt-0.5">
                <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                  {PLACES.find((p) => p.osm === ride.to)?.name[languageTag()]}
                </h3>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:gap-3">
            <div className="grid grid-rows-2 w-full max-w-sm">
              <div className="flex gap-3">
                <div className="flex items-center">
                  <span
                    suppressHydrationWarning
                    className="text-m text-primary font-semibold dark:text-neutral-400"
                  >
                    {format(
                      new Date(new Date(ride.departure).getTime()),
                      "HH:mm"
                    )}
                  </span>
                </div>

                <div className="relative py-4 flex-1">
                  <div className="relative flex items-center">
                    <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-neutral-600"></div>

                    <div className="flex-1 mx-1 relative">
                      <div className="w-full border-b-2 border-gray-300"></div>
                    </div>

                    <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      suppressHydrationWarning
                      className="bg-white px-2 text-sm text-gray-500"
                    >
                      {formatDuration(ride.duration)}
                    </span>
                  </div>
                </div>
              </div>

              <span
                suppressHydrationWarning
                className="flex text-m items-start gap-x-1.5 font-semibold text-gray-800 dark:text-white w-full"
              >
                {PLACES.find((p) => p.osm === ride.from)?.name[languageTag()]}
              </span>
            </div>

            <div className="grid grid-rows-2">
              <div className="flex items-center">
                <span
                  suppressHydrationWarning
                  className="text-m text-primary font-semibold dark:text-neutral-400"
                >
                  {format(
                    new Date(
                      new Date(ride.departure).getTime() + ride.duration * 1000
                    ),
                    "HH:mm"
                  )}
                </span>
              </div>
              <span
                suppressHydrationWarning
                className="flex items-start text-m font-semibold text-gray-800 dark:text-white"
              >
                {PLACES.find((p) => p.osm === ride.to)?.name[languageTag()]}
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full relative  items-center border-t pt-5 p-5">
          {ride.car.type === "STANDARD" && (
            <SVGCarStandard className="fill-gray-500" />
          )}
          {ride.car.type === "MINIVAN" && (
            <SVGCarMinivan className="fill-gray-500" />
          )}
          <img
            className="w-10 bg-gray-400 h-10 rounded-full mr-4"
            src={ride.driver.profileImg}
            alt="Avatar"
          />

          <div className="text-sm">
            <p className="font-semibold leading-none">
              {ride.driver.name.split(" ")[0]}
            </p>
            {ride.driver.averageRating > 0 && (
              <p className="flex items-center gap-1 font-semibold">
                {ride.driver.averageRating}{" "}
                <Stars className="text-primary" size={17} />
              </p>
            )}
          </div>
          <div className="flex ml-2 mr-2 sm:ml-5 sm:mr-5 h-7 items-center space-x-4 text-sm">
            <Separator orientation="vertical" />
          </div>

          <div className="flex flex-row gap-1 sm:gap-2 lgx:gap-8 ">
            {ride.rules.length > 0 ? (
              ride.rules.slice(0, 3).map(({ description }, index) => (
                <div
                  className="flex justify-center lgx:justify-evenly"
                  key={index}
                >
                  <div className="flex items-center">
                    {ruleToIcon[description]}
                  </div>
                  <div className="flex items-center">
                    <div className="text-gray-500 text-sm hidden lgx:block">
                      {description}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-sm">
                {m.mushy_north_mole_harbor()}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RideCard;

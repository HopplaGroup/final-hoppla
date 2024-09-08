"use client";

import { useFindManyRide } from "@/lib/hooks";
import { useQuery } from "@tanstack/react-query";
import {
    parseAsArrayOf,
    parseAsInteger,
    parseAsIsoDateTime,
    parseAsString,
    parseAsTimestamp,
    useQueryState,
} from "nuqs";
import { getRides } from "./get-rides";
import SearchBar from "./searchbar";
import SortBy from "./sort-by";
import { languageTag } from "@/paraglide/runtime";
import Link from "next/link";
import { Stars } from "lucide-react";
import * as d from "date-fns";
import { defaultSortBy } from "@/lib/constants/search";
import { useMemo, useState } from "react";
import RulesFilter from "./rules-filter";
import { RideResponse } from "./response-ride-type";
import PLACES from "@/lib/constants/places";
type SearchPageProps = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export default function SearchPage({ searchParams }: SearchPageProps) {
    const [from, setFrom] = useQueryState("from");
    const [to, setTo] = useQueryState("to");
    const [sortBy, setSortBy] = useQueryState("sortBy");
    const [page, setPage] = useQueryState(
        "page",
        parseAsInteger.withDefault(1)
    );
    const defaultDeparture = useMemo(() => new Date(), []);
    const [departure, setDeparture] = useQueryState(
        "departure",
        parseAsIsoDateTime.withDefault(defaultDeparture)
    );
    const [availableSeats, setAvailableSeats] = useQueryState(
        "availableSeats",
        parseAsInteger
    );

    const [rules, setRules] = useQueryState(
        "rules",
        parseAsArrayOf(parseAsString)
    );

    const { data, isLoading } = useQuery<any, Error>({
        queryKey: [
            "rides",
            from,
            to,
            page,
            sortBy,
            departure,
            availableSeats,
            rules,
        ],
        queryFn: () =>
            getRides({
                from,
                to,
                page,
                sortBy,
                departure,
                availableSeats,
                rules,
            }),
    });

    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const paddedHours = hours.toString().padStart(2, "0");
        const paddedMinutes = minutes.toString().padStart(2, "0");

        return `${paddedHours}:${paddedMinutes}`;
    };

    const [_from, _setFrom] = useState(from);
    const [_to, _setTo] = useState(to);
    const [_departure, _setDeparture] = useState(departure);
    const [_availableSeats, _setAvailableSeats] = useState(availableSeats);

    const search = () => {
        setFrom(_from);
        setTo(_to);
        setDeparture(_departure);
        setAvailableSeats(_availableSeats);
    };

    return (
        <div className="container mt-4 ">
            <div>
                <SearchBar
                    from={_from}
                    to={_to}
                    departure={_departure}
                    availableSeats={_availableSeats}
                    setFrom={_setFrom}
                    setTo={_setTo}
                    setDeparture={_setDeparture}
                    setAvailableSeats={_setAvailableSeats}
                    search={search}
                />
            </div>
            <div className="grid grid-cols-[300px,1fr] gap-5 mt-5">
                <div>
                    <SortBy search={search} />
                    <RulesFilter search={search} />
                </div>
                <div>
                    <div className="grid grid-cols-2 gap-2">
                        {data?.rides.map((ride: RideResponse) => (
                            <div
                                key={ride.id}
                                className="bg-white border-2 border-dashed rounded-md"
                            >
                                <Link href={`/rides/${ride.id}`}>
                                    <div className=" p-5 relative">
                                        <div className="absolute right-[30px] top-[80px] ">
                                            <div className="bg-gray-200 p-3 rounded-md">
                                                {ride.price} ₾
                                            </div>
                                        </div>
                                        <div className="flex gap-x-3">
                                            <div className="w-16 text-end">
                                                <span className="text-xl text-primary font-semibold dark:text-neutral-400">
                                                    {/* use dat fns and show only the hour and minutes */}
                                                    {d.format(
                                                        new Date(
                                                            ride.departure
                                                        ),
                                                        "HH:mm"
                                                    )}
                                                </span>
                                                <div>
                                                    {/* duration format as hours and minutes */}
                                                    {formatDuration(
                                                        ride.duration
                                                    )}
                                                </div>
                                            </div>

                                            <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
                                                <div className="relative z-10 size-7 flex justify-center items-center">
                                                    <div className="size-2 rounded-full bg-gray-400 dark:bg-neutral-600"></div>
                                                </div>
                                            </div>

                                            <div className="grow pt-0.5 pb-8">
                                                <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                                                    {
                                                        PLACES.find(
                                                            (place) =>
                                                                place.osm ===
                                                                ride.from
                                                        )?.name[languageTag()]
                                                    }
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                    Find more detailed
                                                    insctructions here.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-x-3">
                                            <div className="w-16 text-end">
                                                <span className="text-xl text-primary font-semibold dark:text-neutral-400">
                                                    {d.format(
                                                        new Date(
                                                            new Date(
                                                                ride.departure
                                                            ).getTime() +
                                                                ride.duration *
                                                                    1000
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
                                                    {
                                                        PLACES.find(
                                                            (place) =>
                                                                place.osm ===
                                                                ride.to
                                                        )?.name[languageTag()]
                                                    }
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                    Find more detailed
                                                    insctructions here.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex items-center border-t pt-5 p-5">
                                    <img
                                        className="w-10 h-10 rounded-full mr-4"
                                        src={ride.driver.profileImg}
                                        alt="Avatar"
                                    />
                                    <div className="text-sm">
                                        <p className="font-semibold leading-none">
                                            {ride.driver.name}
                                        </p>
                                        <p className="flex items-center gap-1 font-semibold">
                                            {ride.driver.averageRating}{" "}
                                            <Stars
                                                className="text-primary"
                                                size={17}
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <h1>Search results</h1> */}
                    {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                    {isLoading && <p>Loading...</p>}
                </div>
            </div>
        </div>
    );
}

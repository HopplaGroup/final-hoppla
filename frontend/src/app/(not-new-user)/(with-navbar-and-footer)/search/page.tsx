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
import RideCard from "./_components/ride-card";
type SearchPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

import * as m from "@/paraglide/messages.js";
export default function SearchPage({ searchParams }: SearchPageProps) {
  const [from, setFrom] = useQueryState("from");
  const [to, setTo] = useQueryState("to");
  const [sortBy, setSortBy] = useQueryState("sortBy");
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const defaultDeparture = useMemo(
    () => new Date(new Date().setHours(0, 0, 0, 0)),
    []
  );
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
      <div className="grid lg:grid-cols-[300px,1fr] gap-5 mt-5">
        <div className="w-full grid grid-cols-2 lg:grid-cols-1 gap-2">
          <SortBy search={search} />
          <RulesFilter search={search} />
        </div>
        <div>
          <div className="text-xl mb-2 font-semibold">
            {m.slow_smug_ant_love()}
          </div>
          {!isLoading && (
            <div className="grid gap-2">
              {data != null && data.rides.length > 0 ? (
                data.rides.map((ride: RideResponse) => (
                  <RideCard key={ride.id} ride={ride} />
                ))
              ) : (
                <div>{m.loud_such_shad_stop()}</div>
              )}
            </div>
          )}

          {/* <h1>Search results</h1> */}
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          {isLoading && <p>{m.yummy_still_okapi_catch()}...</p>}
        </div>
      </div>
    </div>
  );
}

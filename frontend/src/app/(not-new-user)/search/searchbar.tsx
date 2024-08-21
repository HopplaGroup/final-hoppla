"use client";
import { Button } from "@/components/ui/actions/button";
import { Autocomplete } from "@/components/ui/data-input/autocomplete";
import PLACES from "@/lib/constants/places";
import { useLoading } from "@/lib/providers/loading-provider";
import { languageTag } from "@/paraglide/runtime";
import { Circle, MapPin } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  useQueryState,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsArrayOf,
  parseAsString,
} from "nuqs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

export default function SearchBar() {
  const [orderBy, setOrderBy] = useQueryState("orderBy", {
    shallow: false,
  });
  const [fromOsm, setFromOsm] = useQueryState("fromOsm");
  const [toOsm, setToOsm] = useQueryState("toOsm");
  const [departureDate, setDepartureDate] = useQueryState(
    "departureDate",
    parseAsIsoDateTime.withDefault(new Date())
  );
  const [availableSeats, setAvailableSeats] = useQueryState(
    "availableSeats",
    parseAsInteger
  );

  const { push } = useLoading();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = () => {
    push(pathname + "?" + searchParams.toString());
  };

  return (
    <div className="join-md grid md:grid-cols-5">
      <Autocomplete
        startContent={<Circle size={18} />}
        items={PLACES}
        defaultSelected={PLACES.find((place) => place.osm === fromOsm)}
        displayValue={(item) => item.name[languageTag()]}
        onChange={(place) => setFromOsm(place?.osm || null)}
        getKey={(item) => item.osm}
        showMax={10}
        filterItems={(items, query) =>
          items.filter(
            (item) =>
              item.name.en.toLowerCase().startsWith(query.toLowerCase()) ||
              item.name.ka.toLowerCase().startsWith(query.toLowerCase())
          )
        }
        placeholder="Departure location"
      />
      <Autocomplete
        startContent={<MapPin size={18} />}
        items={PLACES}
        defaultSelected={PLACES.find((place) => place.osm === toOsm)}
        displayValue={(item) => item.name[languageTag()]}
        onChange={(place) => setToOsm(place?.osm || null)}
        getKey={(item) => item.osm}
        showMax={10}
        filterItems={(items, query) =>
          items.filter(
            (item) =>
              item.name.en.toLowerCase().startsWith(query.toLowerCase()) ||
              item.name.ka.toLowerCase().startsWith(query.toLowerCase())
          )
        }
        placeholder="Destination location"
      />
      <DatePicker
        value={departureDate || undefined}
        onChange={(newDate) => setDepartureDate(newDate || null)}
      />

      <Select
        // key={selectedCar?.id}

        value={availableSeats?.toString()}
        onValueChange={(v) => {
          setAvailableSeats(v ? Number(v) : null);
        }}
      >
        <SelectTrigger className="w-full join-item">
          am
          <SelectValue placeholder="Select a seats" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Array.from({ length: 8 }, (_, i) => i + 1).map((o) => (
              <SelectItem key={o} value={o.toString()}>
                {o}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={search}>Search</Button>
    </div>
  );
}

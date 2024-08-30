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
import { useState } from "react";

export default function SearchBar({
  from,
  to,
  departure,
  availableSeats,
  setFrom,
  setTo,
  setDeparture,
  setAvailableSeats,
}: {
  from: string | null;
  to: string | null;
  departure: Date | null;
  availableSeats: number | null;
  setFrom: (from: string | null) => void;
  setTo: (to: string | null) => void;
  setDeparture: (departure: Date | null) => void;
  setAvailableSeats: (availableSeats: number | null) => void;
}) {
  const [_from, _setFrom] = useState(from);
  const [_to, _setTo] = useState(to);
  const [_departure, _setDeparture] = useState(departure);
  const [_availableSeats, _setAvailableSeats] = useState(availableSeats);

  const search = () => {
    console.log("wow");
    setFrom(_from);
    setTo(_to);
    setDeparture(_departure);
    setAvailableSeats(_availableSeats);
  };

  return (
    <div className="join-md grid md:grid-cols-4">
      <Autocomplete
        startContent={<Circle size={18} />}
        items={PLACES}
        defaultSelected={PLACES.find((place) => place.osm === _from)}
        displayValue={(item) => item.name[languageTag()]}
        onChange={(place) => _setFrom(place?.osm || null)}
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
        defaultSelected={PLACES.find((place) => place.osm === _to)}
        displayValue={(item) => item.name[languageTag()]}
        onChange={(place) => _setTo(place?.osm || null)}
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
        value={_departure || undefined}
        onChange={(newDate) => _setDeparture(newDate || null)}
      />

      <Button onClick={search}>Search</Button>
    </div>
  );
}

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
import * as m from "@/paraglide/messages.js";

import { DatePicker } from "@/components/ui/date-picker";
import { useMemo } from "react";

export default function SearchBarLanding() {
    const [fromOsm, setFromOsm] = useQueryState("from");
    const [toOsm, setToOsm] = useQueryState("to");
    const date = useMemo(() => new Date(new Date().setHours(0, 0, 0, 0)), []);
    const [departureDate, setDepartureDate] = useQueryState(
        "departure",
        parseAsIsoDateTime.withDefault(date)
    );

    const { push } = useLoading();
    const searchParams = useSearchParams();
    const search = () => {
        push("/search" + "?" + searchParams.toString());
    };

    return (
        <div className="join-md grid md:grid-cols-4">
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
                            item.name.en
                                .toLowerCase()
                                .startsWith(query.toLowerCase()) ||
                            item.name.ka
                                .toLowerCase()
                                .startsWith(query.toLowerCase())
                    )
                }
                placeholder={m.sad_livid_octopus_express()}
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
                            item.name.en
                                .toLowerCase()
                                .startsWith(query.toLowerCase()) ||
                            item.name.ka
                                .toLowerCase()
                                .startsWith(query.toLowerCase())
                    )
                }
                placeholder={m.early_born_crow_arrive()}
            />
            <DatePicker
                value={departureDate || undefined}
                onChange={(newDate) => setDepartureDate(newDate || null)}
            />

            <Button onClick={search}>{m.weak_sharp_jan_cry()}</Button>
        </div>
    );
}

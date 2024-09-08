"use client";

import PLACES from "@/lib/constants/places";
import { languageTag } from "@/paraglide/runtime";
import { ColumnDef } from "@tanstack/react-table";
import { Prisma, Ride } from "@zenstackhq/runtime/models";

export type Row = Prisma.RideGetPayload<{
    include: {
        car: true;
        ridePassengers: {
            include: {
                passenger: true;
            };
        };
    };
}>;

export const columns: ColumnDef<Row>[] = [
    {
        accessorKey: "from",
        header: "From",
        cell: ({ row }) => {
            return (
                PLACES.find((place) => place.osm === row.getValue("from"))
                    ?.name?.[languageTag()] || "Unknown"
            );
        },
    },
    {
        accessorKey: "to",
        header: "To",
        cell: ({ row }) => {
            return (
                PLACES.find((place) => place.osm === row.getValue("to"))
                    ?.name?.[languageTag()] || "Unknown"
            );
        },
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "availableSeats",
        header: "Seats",
    },
    {
        accessorKey: "departure",
        header: "Departure",
    },
    {
        accessorKey: "distance",
        header: "Distance",
    },
    {
        accessorKey: "duration",
        header: "Duration",
    },
];

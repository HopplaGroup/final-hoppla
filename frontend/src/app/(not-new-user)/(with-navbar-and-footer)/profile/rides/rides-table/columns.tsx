"use client";

import PLACES from "@/lib/constants/places";
import { languageTag } from "@/paraglide/runtime";
import { ColumnDef } from "@tanstack/react-table";
import { Prisma, Ride } from "@zenstackhq/runtime/models";
import * as d from "date-fns";
import { Calendar, Car, Clock, Coins, Users, Waypoints } from "lucide-react";

export type Row = Prisma.RideGetPayload<{
    include: {
        car: true;
        passengers: true;
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
        header: () => (
            <div className="flex items-center gap-1">
                <Coins size={18} />
                <span>Price</span>
            </div>
        ),
    },
    {
        accessorKey: "availableSeats",
        header: () => (
            <div className="flex items-center gap-1">
                <Users size={18} />
                <span>Seats</span>
            </div>
        ),
    },
    {
        accessorKey: "departure",
        header: () => (
            <div className="flex items-center gap-1">
                <Calendar size={18} />
                <span>Departure</span>
            </div>
        ),
        cell: ({ row }) => {
            const departure = row.getValue<Date>("departure");
            return d.format(departure, "yyyy-MM-dd HH:mm");
        },
    },
    {
        accessorKey: "distance",
        header: () => (
            <div className="flex items-center gap-1">
                <Waypoints size={18} />
                Distance
            </div>
        ),
        cell: ({ row }) => {
            const distanceInMeters = row.getValue<number>("distance");
            const distanceInKm = (distanceInMeters / 1000).toFixed(2); // Convert meters to kilometers and pad to 2 decimal places
            return `${distanceInKm} km`;
        },
    },
    {
        accessorKey: "duration",
        header: () => (
            <div className="flex items-center gap-1">
                <Clock size={18} />
                Duration
            </div>
        ),
        cell: ({ row }) => {
            const durationInSeconds = row.getValue<number>("duration");

            const hours = Math.floor(durationInSeconds / 3600);
            const minutes = Math.floor((durationInSeconds % 3600) / 60);

            return `${hours}h ${minutes}m `;
        },
    },
];

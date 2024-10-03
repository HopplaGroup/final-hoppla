"use client";

import { Button } from "@/components/ui/button";
import PLACES from "@/lib/constants/places";
import { languageTag } from "@/paraglide/runtime";
import { ColumnDef } from "@tanstack/react-table";
import { Prisma, Ride } from "@zenstackhq/runtime/models";
import * as d from "date-fns";
import {
  Calendar,
  Car,
  Circle,
  Clock,
  Coins,
  MapPin,
  Users,
  Waypoints,
  Table,
  SquareArrowOutUpRight,
} from "lucide-react";

import * as m from "@/paraglide/messages.js";

export type Row = Prisma.RideGetPayload<{
  include: {
    car: true;
  };
}>;

export const columns: ColumnDef<Row>[] = [
  {
    accessorKey: "from",
    header: () => (
      <div className="flex items-center gap-1">
        <Circle size={18} />
        <span>{m.each_quiet_moose_fear()}</span>
      </div>
    ),
    cell: ({ row }) => {
      return (
        PLACES.find((place) => place.osm === row.getValue("from"))?.name?.[
          languageTag()
        ] || "Unknown"
      );
    },
  },
  {
    accessorKey: "to",
    header: () => (
      <div className="flex items-center gap-1">
        <MapPin size={18} />
        <span>{m.pretty_super_fox_type()}</span>
      </div>
    ),
    cell: ({ row }) => {
      return (
        PLACES.find((place) => place.osm === row.getValue("to"))?.name?.[
          languageTag()
        ] || "Unknown"
      );
    },
  },
  {
    accessorKey: "price",
    header: () => (
      <div className="flex items-center gap-1">
        <Coins size={18} />
        <span>{m.neat_seemly_jellyfish_chop()}</span>
      </div>
    ),
  },
  {
    accessorKey: "availableSeats",
    header: () => (
      <div className="flex items-center gap-1">
        <Users size={18} />
        <span>{m.bald_bright_jan_pull()}</span>
      </div>
    ),
  },
  {
    accessorKey: "departure",
    header: () => (
      <div className="flex items-center gap-1">
        <Calendar size={18} />
        <span>{m.blue_round_moth_treasure()}</span>
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
        {m.new_best_shad_commend()}
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
        {m.inclusive_wide_camel_reside()}
      </div>
    ),
    cell: ({ row }) => {
      const durationInSeconds = row.getValue<number>("duration");

      const hours = Math.floor(durationInSeconds / 3600);
      const minutes = Math.floor((durationInSeconds % 3600) / 60);

      return `${hours}${m.watery_every_marmot_chop()} ${minutes}${m.acidic_round_finch_pick()}`;
    },
  },
  {
    accessorKey: "id",
    header: () => (
      <div className="flex items-center gap-1">
        <SquareArrowOutUpRight size={18} />
        {m.dry_mellow_bee_exhale()}
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div>
          <Button variant="default" href={`/rides/${row.getValue("id")}`}>
            {m.cute_orange_pony_renew()}
          </Button>
        </div>
      );
    },
  },
];

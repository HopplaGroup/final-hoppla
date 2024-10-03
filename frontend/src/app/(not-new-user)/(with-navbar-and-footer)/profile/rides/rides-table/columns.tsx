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

export type Row = Prisma.RideGetPayload<{
  include: {
    car: true;
  };
}>;
import * as m from "@/paraglide/messages.js";

export const columns: ColumnDef<Row>[] = [
  {
    accessorKey: "from",
    header: () => (
      <div className="flex items-center gap-1">
        <Circle size={18} />
        <span>{m.main_green_gecko_ripple()}</span>
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
        <span>{m.lime_fluffy_dolphin_zoom()}</span>
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
        <span>{m.silly_lofty_bumblebee_nail()}</span>
      </div>
    ),
  },
  {
    accessorKey: "availableSeats",
    header: () => (
      <div className="flex items-center gap-1">
        <Users size={18} />
        <span>{m.weary_each_butterfly_animate()}</span>
      </div>
    ),
  },
  {
    accessorKey: "departure",
    header: () => (
      <div className="flex items-center gap-1">
        <Calendar size={18} />
        <span>{m.alert_dull_deer_mix()}</span>
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
        {m.best_long_duck_feel()}
      </div>
    ),
    cell: ({ row }) => {
      const distanceInMeters = row.getValue<number>("distance");
      const distanceInKm = (distanceInMeters / 1000).toFixed(2); // Convert meters to kilometers and pad to 2 decimal places
      return `${distanceInKm} ${m.cute_mellow_cockroach_tear()}`;
    },
  },
  {
    accessorKey: "duration",
    header: () => (
      <div className="flex items-center gap-1">
        <Clock size={18} />
        {m.plain_drab_buzzard_hope()}
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
        {m.giant_aloof_marten_walk()}
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div>
          <Button variant="default" href={`/rides/${row.getValue("id")}`}>
            {m.grassy_petty_crossbill_relish()}
          </Button>
        </div>
      );
    },
  },
];

// from => osm : string 
// to => osm : astirng
// date => for now in (day, month, year) : datetime
// seats => i need 2 seats because we are 2 friedns go to batumi : number
// other filters can be added in the future

import Elysia, { t } from "elysia";
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export const searchRides = new Elysia()
  .get(
    "/v1/searchRides",
    async ({ query, error }) => {
      const from = query.from;
      const to = query.to;
      const date = query.date;
      const seats = query.seats;
      // remove hours and seconds from date
      date.setHours(0, 0, 0, 0);

      // search for rides where from == ride.from
      // to == ride.to
      // date == ride.date but only in the same day and both date are in utc ride created and this input date also in utc not local
      // seats <= ride.seats - ride.passengers.length
      const rides = await db.ride.findMany({
        where: {
          from,
          to,
          departure: {
            gte: new Date(date),
            lt: new Date(new Date(date).getDate() + 1)
          },
          availableSeats: {
            gte: seats
          },
        },
        include: {
          passengers: true,
          car: true,
          driver: true,
          _count: true,
          rules: true
        },
      })
      const filteredRides = rides.filter(ride => ride.availableSeats - ride.passengers.length >= seats)
      return filteredRides;
    },
    {
      query: t.Object({
        from: t.String(),
        to: t.String(),
        date: t.Date(),
        seats: t.Number(),
      }),
      detail: {
        summary: "Search rides",
        tags: ["Rides"],
      },
    }
  );
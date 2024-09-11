import PLACES from "@/lib/constants/places";
import {
    defaultSortBy,
    validSortFields,
    validSortOrders,
} from "@/lib/constants/search";
import db from "@/lib/utils/db";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const sortBy = searchParams.get("sortBy");
    const departure = searchParams.get("departure");
    const availableSeats = searchParams.get("availableSeats");
    const rulesTmp = searchParams.get("rules");
    const rules = rulesTmp ? rulesTmp.split(",") : [];

    const [sortField, sortOrder] = (sortBy || defaultSortBy).split(":");

    const orderByField = validSortFields.includes(sortField)
        ? sortField
        : "driverAverageRating";
    const orderByOrder = validSortOrders.includes(sortOrder)
        ? sortOrder
        : "desc";

    let orderByClause = Prisma.sql`COALESCE(AVG(review."rating"), 0) DESC`;

    switch (orderByField) {
        case "price":
            if (orderByOrder === "asc") {
                orderByClause = Prisma.sql`"price" ASC`;
            } else {
                orderByClause = Prisma.sql`"price" DESC`;
            }
            break;
        case "driverAverageRating":
            if (orderByOrder === "asc") {
                orderByClause = Prisma.sql`COALESCE(AVG(review."rating"), 0) ASC`;
            } else {
                orderByClause = Prisma.sql`COALESCE(AVG(review."rating"), 0) DESC`;
            }
            break;
        case "departure":
            if (orderByOrder === "asc") {
                orderByClause = Prisma.sql`"departure" ASC`;
            } else {
                orderByClause = Prisma.sql`"departure" DESC`;
            }
            break;
    }

    let rulesCondition = Prisma.sql``;

    // skip the rides if there ones driver not verified
    // ride.driver.driverVerificationRequest.status == "APPROVED" && ride.car.status == "APPROVED"
    // time not working correctly
    // is temstamp utc or local here ::timestamp

    if (rules.length > 0) {
        rulesCondition = Prisma.sql`AND (
      SELECT COUNT(*)
      FROM "RideRule" ridetorule
      WHERE ridetorule."rideId" = ride.id
        AND ridetorule."ruleId" IN (${Prisma.join(rules)})
    ) = ${rules.length}`;
    }

    try {
        const whereClause = Prisma.sql`
       WHERE (${from}::text IS NULL OR ride."from" = ${from})
            AND (${to}::text IS NULL OR ride."to" = ${to})
            AND (${departure}::text IS NULL OR (
            ride."departure" >= ${departure}::timestamp
            AND ride."departure" < (${departure}::timestamp + INTERVAL '1 day')))
            AND car.status = 'APPROVED'
            AND dr.status = 'APPROVED'
            ${rulesCondition}
            `;

        const totalCount = await db.$queryRaw`
          SELECT COUNT(*) as count
            FROM (
                SELECT ride.id
                FROM "Ride" ride
                LEFT JOIN "RideRule" ridetorule ON ride.id = ridetorule."rideId"
                LEFT JOIN "Car" car ON ride."carId" = car.id
                LEFT JOIN "DriverVerificationRequest" dr ON ride."driverId" = dr."driverId"
                ${whereClause}
                GROUP BY ride.id
                HAVING (${availableSeats}::int IS NULL OR (
                  ride."availableSeats" - (SELECT COUNT(ridepassenger_sub."passengerId")
                                     FROM "RidePassenger" ridepassenger_sub
                                     WHERE ride.id = ridepassenger_sub."rideId"
                                    ) >= ${availableSeats}::int
                ))
            ) AS filtered_rides
           `;

        const rides = await db.$queryRaw`
          SELECT ride.id as id,
          ride."availableSeats",
                ride."price",
                ride."from",
                ride."to",
                ride."departure",
                ride."distance",
                ride."duration",
                json_build_object(
                  'id', driver.id,
                  'profileImg', driver."profileImg",
                  'name', driver."name",
                  'averageRating', COALESCE(AVG(review."rating"), 0)
                ) AS "driver",
                json_build_object(
                  'id', car.id,
                  'type', car."type"
                ) AS "car",
                COALESCE(
               json_agg(DISTINCT jsonb_build_object(
                 'id', rule.id,
                 'description', rule."description"
               )) FILTER (WHERE rule.id IS NOT NULL),
               '[]'::json
             ) AS "rules",
             COALESCE(
               json_agg(DISTINCT jsonb_build_object(
                 'id', passenger.id,
                 'profileImg', passenger."profileImg",
                 'name', passenger."name"
               )) FILTER (WHERE passenger.id IS NOT NULL),
               '[]'::json
             ) AS "passengers"
          FROM "Ride" ride
          LEFT JOIN "UserReview" review ON ride."driverId" = review."revieweeId"
          LEFT JOIN "RideRule" ridetorule ON ride.id = ridetorule."rideId"
          LEFT JOIN "Rule" rule ON ridetorule."ruleId" = rule.id
          LEFT JOIN "User" driver ON ride."driverId" = driver.id
          LEFT JOIN "Car" car ON ride."carId" = car.id
          LEFT JOIN "RidePassenger" ridepassenger ON ride.id = ridepassenger."rideId"
          LEFT JOIN "User" passenger ON ridepassenger."passengerId" = passenger.id
          LEFT JOIN "DriverVerificationRequest" dr ON ride."driverId" = dr."driverId"
          ${whereClause}
          GROUP BY ride.id, driver.id, car.id
          HAVING (${availableSeats}::int IS NULL OR (
                  ride."availableSeats" -(SELECT COUNT(ridepassenger_sub."passengerId")
                                     FROM "RidePassenger" ridepassenger_sub
                                     WHERE ride.id = ridepassenger_sub."rideId"
                                    ) >= ${availableSeats}::int
          ))
          ORDER BY ${orderByClause}
          LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize};
  `;

        // @ts-ignore
        console.log(rides);
        return NextResponse.json({
            rides: (rides as any).map((ride: any) => ({
                ...ride,
                departure: new Date(ride.departure),
            })),
            totalCount: (totalCount as any)[0].count.toString(),
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error fetching rides" },
            { status: 500 }
        );
    }
}

import PLACES from "@/lib/constants/places";
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

  const [sortField, sortOrder] = (sortBy || "driverAverageRating:desc").split(
    ":"
  );

  const validSortFields = ["price", "driverAverageRating", "departure"];
  const validSortOrders = ["asc", "desc"];

  const orderByField = validSortFields.includes(sortField)
    ? sortField
    : "driverAverageRating";
  const orderByOrder = validSortOrders.includes(sortOrder) ? sortOrder : "desc";

  let orderByClause = Prisma.sql`"driverAverageRating" DESC`;

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
        orderByClause = Prisma.sql`"driverAverageRating" ASC`;
      } else {
        orderByClause = Prisma.sql`"driverAverageRating" DESC`;
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
  if (rules.length > 0) {
    rulesCondition = Prisma.sql`AND (
      SELECT COUNT(*)
      FROM "_RideToRule" ridetorule
      WHERE ridetorule."A" = ride.id
        AND ridetorule."B" IN (${Prisma.join(rules)})
    ) = ${rules.length}`;
  }
  try {
    const whereClause = Prisma.sql`
       WHERE (${from}::text IS NULL OR ride."from" = ${from})
            AND (${to}::text IS NULL OR ride."to" = ${to})
            AND (${departure}::text IS NULL OR (
            ride."departure" >= ${departure}::timestamp
            AND ride."departure" < (${departure}::timestamp + INTERVAL '1 day')))
            ${rulesCondition}
            `;

    const totalCount = await db.$queryRaw`
          SELECT COUNT(*) as count
            FROM (
                SELECT ride.id
                FROM "Ride" ride
                LEFT JOIN "_RideToRule" ridetorule ON ride.id = ridetorule."A"
                ${whereClause}
                GROUP BY ride.id
                HAVING (${availableSeats}::int IS NULL OR (
                  ride."availableSeats" - (SELECT COUNT(ridepassenger_sub."B")
                                     FROM "_RidePassenger" ridepassenger_sub
                                     WHERE ride.id = ridepassenger_sub."A"
                                    ) >= ${availableSeats}::int
                ))
            ) AS filtered_rides
           `;

    // retrun driver as well
    const rides = await db.$queryRaw`
          SELECT ride.*,
                COALESCE(AVG(review."rating"), 0) AS "driverAverageRating",
                driver."profileImg" AS "driverProfileImage",
                driver."name" AS "driverName"
          FROM "Ride" ride
          LEFT JOIN "UserReview" review ON ride."driverId" = review."revieweeId"
          LEFT JOIN "_RideToRule" ridetorule ON ride.id = ridetorule."A"
          LEFT JOIN "User" driver ON ride."driverId" = driver.id
          ${whereClause}
          GROUP BY ride.id, driver.id
          HAVING (${availableSeats}::int IS NULL OR (
                  ride."availableSeats" -(SELECT COUNT(ridepassenger_sub."B")
                                     FROM "_RidePassenger" ridepassenger_sub
                                     WHERE ride.id = ridepassenger_sub."A"
                                    ) >= ${availableSeats}::int
          ))
          ORDER BY ${orderByClause}
          LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize};
  `;

    return NextResponse.json({
      rides: (rides as any).map((ride: any) => ({
        ...ride,
        from: PLACES.find((place) => place.osm === ride.from),
        to: PLACES.find((place) => place.osm === ride.to),
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

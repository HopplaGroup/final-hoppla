import { z } from "zod";
import db from "@/lib/utils/db";
import RideCard from "./ride-card";
import Pagination from "./pagination";
import SearchBar from "./searchbar";
import { Prisma } from "@prisma/client";
import RulesFilter from "./rules-filter";
import SortBy from "./sort-by";

type SearchPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const searchSchema = z.object({
  fromOsm: z.string().optional(),
  toOsm: z.string().optional(),
  departureDate: z
    .string()
    .transform((date) => new Date(new Date(date).setHours(0, 0, 0, 0)))
    .catch(() => new Date(new Date().setHours(0, 0, 0, 0))),
  availableSeats: z.coerce
    .number()
    .default(1)
    .catch(() => 1),
  ruleIds: z
    .string()
    .transform((ruleIds) => ruleIds.split(",").filter(Boolean))
    .optional(),
  page: z.coerce
    .number()
    .default(1)
    .catch(() => 1),
  perPage: z.coerce
    .number()
    .default(1)
    .catch(() => 2),
  orderBy: z.enum(["departure", "price", "createdAt"]).optional(),
  orderByDirection: z.enum(["asc", "desc"]).default("desc").catch("desc"),
  // .optional(),
});

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const search = searchSchema.safeParse(searchParams);
  console.log(search);
  if (!search.success) {
    return <div>Invalid search params</div>;
  }

  const { page, perPage, ...searchData } = search.data;

  const where: Prisma.RideWhereInput = {
    ...(searchData.fromOsm && { from: searchData.fromOsm }),
    ...(searchData.toOsm && { to: searchData.toOsm }),
    departure: {
      gte: searchData.departureDate,
      lt: new Date(searchData.departureDate.getTime() + 24 * 60 * 60 * 1000),
    },
    availableSeats: {
      gte: searchData.availableSeats,
    },
    ...(searchData.ruleIds &&
      searchData.ruleIds.length > 0 && {
        AND: searchData.ruleIds.map((ruleId) => ({
          rules: {
            some: {
              id: ruleId,
            },
          },
        })),
      }),
  };

  const [rides, totalCount, rules] = await Promise.all([
    db.ride.findMany({
      where,
      include: {
        passengers: true,
        car: true,
        driver: true,
        rules: true,
      },
      orderBy: {
        ...(searchData.orderBy
          ? {
              [searchData.orderBy]: searchData.orderByDirection,
            }
          : {
              createdAt: "desc",
            }),
      },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    db.ride.count({ where }),
    db.rule.findMany({}),
  ]);

  const filteredRides = rides.filter(
    (ride) =>
      ride.availableSeats - ride.passengers.length >= searchData.availableSeats
  );

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className="container mx-auto px-4 pt-5">
      <SearchBar />
      <RulesFilter rules={rules} />
      <SortBy />
      <h1 className="text-2xl font-bold mb-4 pt-4">Search Results</h1>
      {filteredRides.length === 0 ? (
        <p>No rides found matching your criteria.</p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRides.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))}
          </div>
          <Pagination totalPages={totalPages} />
        </>
      )}
    </div>
  );
}

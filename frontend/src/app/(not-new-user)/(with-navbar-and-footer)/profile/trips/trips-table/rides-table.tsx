import { getUser } from "@/lib/utils/auth";
import { Row, columns } from "./columns";
import { DataTable } from "./data-table";
import db from "@/lib/utils/db";

async function getData(): Promise<Row[]> {
  const user = await getUser();

  return await db.ride.findMany({
    where: {
      passengers: {
        some: {
          id: user?.id,
        },
      },
    },
    include: {
      car: true,
      passengers: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function RidesTable() {
  const data = await getData();

  return <DataTable columns={columns} data={data} />;
}

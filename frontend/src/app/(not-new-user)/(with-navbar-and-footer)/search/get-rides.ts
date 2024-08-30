import * as d from "date-fns";

export interface Ride {
  id: number;
  from: string;
  to: string;
  driverId: number;
  driverName: string;
  avgRating: number;
}

export interface RidesResponse {
  rides: Ride[];
  totalCount: number;
}

export async function getRides({
  from,
  to,
  page,
  sortBy,
  departure,
  availableSeats,
  rules,
}: {
  from: string | null;
  to: string | null;
  page: number | null;
  sortBy: string | null;
  departure: Date | null;
  availableSeats: number | null;
  rules: string[] | null;
}): Promise<RidesResponse> {
  const params = new URLSearchParams({
    ...(from && { from }),
    ...(to && { to }),
    ...(page && { page: page.toString() }),
    ...(sortBy && { sortBy }),
    ...(departure && { departure: departure.toISOString() }),
    ...(availableSeats && { availableSeats: availableSeats.toString() }),
    ...(rules && { rules: rules.join(",") }),
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rides?${params}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

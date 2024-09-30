"use client";

import { useFindManyDriverVerificationRequest } from "@/lib/hooks";
import RequestCard from "./request-card";

export default function DriverRequestsPage() {
    const { data: requests, isLoading } = useFindManyDriverVerificationRequest(
        {
            where: {
                status: "PENDING",
                driver: {
                    status: "ACTIVE",
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            include: {
                driver: true,
            },
        },
        {
            refetchOnWindowFocus: false,
        }
    );

    return (
        <div className="mt-5">
            {isLoading && <p className="">Loading...</p>}
            {!isLoading && requests && requests.length > 0 && (
                <p className="">
                    {requests.length} driver verification requests found
                </p>
            )}
            {!isLoading && requests && requests.length === 0 && (
                <p className="">No Requests found</p>
            )}
            {!isLoading && requests && (
                <ul role="list" className="">
                    {requests?.map((request) => (
                        <RequestCard key={request.id} request={request} />
                    ))}
                </ul>
            )}
        </div>
    );
}

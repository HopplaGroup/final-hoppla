"use client";

import { Button } from "@/components/ui/button";
import {
    useFindManyDriverVerificationRequest,
    useUpdateDriverVerificationRequest,
} from "@/lib/hooks";
import { cn } from "@/lib/utils/cn";
import { Eye, ShieldAlert } from "lucide-react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function DriverRequestsPage() {
    const [open, setOpen] = useState(false);
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

    const { mutate: approveRequest, isPending: isApprovingUser } =
        useUpdateDriverVerificationRequest({});

    return (
        <div>
            {isLoading && <p className="ml-5 mt-5">Loading...</p>}
            {!isLoading && requests && requests.length > 0 && (
                <p className="ml-5 mt-5">
                    {requests.length} driver verification requests found
                </p>
            )}
            {!isLoading && requests && requests.length === 0 && (
                <p className="ml-5 mt-5">No Requests found</p>
            )}
            {!isLoading && requests && (
                <ul role="list" className="">
                    {requests?.map((request) => (
                        <li
                            key={request.id}
                            className={cn(
                                "py-4 px-4 mt-4 border-2 bg-white rounded-md",
                                {}
                            )}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={request.driver.profileImg}
                                        alt="Profile image"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {request.driver.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        {request.driver.email}
                                    </p>
                                </div>

                                <AlertDialog open={open} onOpenChange={setOpen}>
                                    <AlertDialogTrigger>
                                        <Button
                                            variant={"ghost"}
                                            className="flex items-center gap-2"
                                        >
                                            <Eye size={20} /> See Request
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Approve Request
                                            </AlertDialogTitle>
                                        </AlertDialogHeader>
                                        <div className="space-y-4">
                                            <p>
                                                Are you sure you want to approve
                                                this request?
                                            </p>
                                            <p>
                                                This will make{" "}
                                                {request.driver.name} a driver
                                            </p>

                                            <div className="space-y-2">
                                                <p>
                                                    <strong>Request ID:</strong>{" "}
                                                    {request.id}
                                                </p>
                                                <p>
                                                    <strong>
                                                        Request Date:
                                                    </strong>{" "}
                                                    {new Date(
                                                        request.createdAt
                                                    ).toLocaleDateString()}
                                                </p>
                                                <p>
                                                    <strong>Status:</strong>{" "}
                                                    {request.status}
                                                </p>
                                                <div>
                                                    <strong>
                                                        License Photos:
                                                    </strong>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        {request.licencePhotos.map(
                                                            (photo, index) => (
                                                                <a
                                                                    href={photo}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <img
                                                                        key={
                                                                            index
                                                                        }
                                                                        src={
                                                                            photo
                                                                        }
                                                                        alt={`License Photo ${
                                                                            index +
                                                                            1
                                                                        }`}
                                                                        className="w-full h-auto border rounded-lg"
                                                                    />
                                                                </a>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <strong>Selfie:</strong>
                                                    <a
                                                        href={request.selfie}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <img
                                                            src={request.selfie}
                                                            alt="Driver Selfie"
                                                            className="w-32 h-32 border rounded-full mt-2"
                                                        />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <Button
                                                disabled={isApprovingUser}
                                                onClick={() => {
                                                    approveRequest({
                                                        where: {
                                                            id: request.id,
                                                        },
                                                        data: {
                                                            status: "APPROVED",
                                                        },
                                                    });
                                                }}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                disabled={isApprovingUser}
                                                onClick={() => {
                                                    approveRequest({
                                                        where: {
                                                            id: request.id,
                                                        },
                                                        data: {
                                                            status: "REJECTED",
                                                        },
                                                    });
                                                }}
                                            >
                                                Reject
                                            </Button>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

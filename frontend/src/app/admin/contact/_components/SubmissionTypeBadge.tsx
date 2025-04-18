// app/admin/contact/_components/SubmissionTypeBadge.tsx
import React from "react";
import { ContactSubmissionType } from "@prisma/client";

type SubmissionTypeBadgeProps = {
    type: ContactSubmissionType;
};

const typeStyles = {
    [ContactSubmissionType.GENERAL]: "bg-gray-100 text-gray-800",
    [ContactSubmissionType.SUPPORT]: "bg-blue-100 text-blue-800",
    [ContactSubmissionType.FEEDBACK]: "bg-green-100 text-green-800",
};

export default function SubmissionTypeBadge({
    type,
}: SubmissionTypeBadgeProps) {
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeStyles[type]}`}
        >
            {type}
        </span>
    );
}

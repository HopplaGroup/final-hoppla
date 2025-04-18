
// app/admin/contact/_components/SubmissionStatusBadge.tsx
import React from 'react';
import { ContactSubmissionStatus } from "@prisma/client";

type SubmissionStatusBadgeProps = {
  status: ContactSubmissionStatus;
};

const statusStyles = {
  [ContactSubmissionStatus.NEW]: "bg-blue-100 text-blue-800",
  [ContactSubmissionStatus.IN_PROGRESS]: "bg-amber-100 text-amber-800",
  [ContactSubmissionStatus.REPLIED]: "bg-purple-100 text-purple-800",
  [ContactSubmissionStatus.RESOLVED]: "bg-green-100 text-green-800",
  [ContactSubmissionStatus.CLOSED]: "bg-gray-100 text-gray-800",
  [ContactSubmissionStatus.SPAM]: "bg-red-100 text-red-800",
};

export default function SubmissionStatusBadge({ status }: SubmissionStatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}


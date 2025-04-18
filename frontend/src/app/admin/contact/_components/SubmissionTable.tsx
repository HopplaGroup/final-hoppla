// app/admin/contact/_components/SubmissionTable.tsx
"use client";

import React from "react";
import { ContactSubmission } from "@prisma/client";
import { Mail, Trash } from "lucide-react";
import SubmissionStatusBadge from "./SubmissionStatusBadge";
import SubmissionTypeBadge from "./SubmissionTypeBadge";
import SubmissionDetailsModal from "./SubmissionDetailsModal";
import { formatDistanceToNow } from "@/lib/utils/dateUtils";
import { deleteSubmission } from "../_actions/submissions";

type SubmissionTableProps = {
    submissions: ContactSubmission[];
};

export default function SubmissionTable({ submissions }: SubmissionTableProps) {
    const [selectedSubmission, setSelectedSubmission] =
        React.useState<ContactSubmission | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleOpenModal = (submission: ContactSubmission) => {
        setSelectedSubmission(submission);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async (submissionId: string) => {
        if (confirm("Are you sure you want to delete this submission?")) {
            const formData = new FormData();
            formData.append("submissionId", submissionId);
            await deleteSubmission(formData);
        }
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-left">
                            <th className="px-4 py-3 font-medium text-gray-600">
                                Name
                            </th>
                            <th className="px-4 py-3 font-medium text-gray-600">
                                Email
                            </th>
                            <th className="px-4 py-3 font-medium text-gray-600">
                                Type
                            </th>
                            <th className="px-4 py-3 font-medium text-gray-600">
                                Status
                            </th>
                            <th className="px-4 py-3 font-medium text-gray-600">
                                Date
                            </th>
                            <th className="px-4 py-3 font-medium text-gray-600">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {submissions.map((submission) => (
                            <tr
                                key={submission.id}
                                className="hover:bg-gray-50"
                            >
                                <td className="px-4 py-3">{submission.name}</td>
                                <td className="px-4 py-3">
                                    {submission.email}
                                </td>
                                <td className="px-4 py-3">
                                    <SubmissionTypeBadge
                                        type={submission.type}
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <SubmissionStatusBadge
                                        status={submission.status}
                                    />
                                </td>
                                <td className="px-4 py-3 text-gray-500">
                                    {formatDistanceToNow(submission.createdAt, {
                                        addSuffix: true,
                                    })}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex space-x-2">
                                        <button
                                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                            onClick={() =>
                                                handleOpenModal(submission)
                                            }
                                        >
                                            <Mail className="w-4 h-4" />
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(submission.id)
                                            }
                                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                                        >
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {submissions.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-4 py-8 text-center text-gray-500"
                                >
                                    No contact submissions found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedSubmission && (
                <SubmissionDetailsModal
                    submission={selectedSubmission}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}

// app/admin/contact/page.tsx
import LanguageSwitcher from "@/app/_components/LanguageSwitcher";
import { Filter, Settings } from "lucide-react";
import db from "@/lib/utils/db";
import { ContactSubmissionStatus, ContactSubmissionType } from "@prisma/client";
import StatCard from "./_components/StatCard";
import SubmissionTable from "./_components/SubmissionTable";
import FilterBar from "./_components/FilterBar";
import { Suspense } from "react";
import PaginationControl from "./_components/PaginationControl";

export default async function ContactSubmissionsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // Handle multiple status and type filters
    const statusFilters = Array.isArray(searchParams.status)
        ? (searchParams.status as ContactSubmissionStatus[])
        : searchParams.status
        ? [searchParams.status as ContactSubmissionStatus]
        : [];

    const typeFilters = Array.isArray(searchParams.type)
        ? (searchParams.type as ContactSubmissionType[])
        : searchParams.type
        ? [searchParams.type as ContactSubmissionType]
        : [];

    // Get pagination parameters
    let currentPage = searchParams.page
        ? parseInt(searchParams.page as string)
        : 1;
    const pageSize = 1; // Number of items per page

    // Build the filter for the database query
    const filter: any = {};

    if (statusFilters.length > 0) {
        filter.status = { in: statusFilters };
    }

    if (typeFilters.length > 0) {
        filter.type = { in: typeFilters };
    }

    // Get total count for pagination
    const totalSubmissions = await db.contactSubmission.count({
        where: filter,
    });

    const totalPages = Math.ceil(totalSubmissions / pageSize);

    if (currentPage < 1 || currentPage > totalPages) {
        currentPage = Math.max(1, Math.min(currentPage, totalPages));
    }

    // Get paginated submissions
    const submissions = await db.contactSubmission.findMany({
        where: filter,
        orderBy: { createdAt: "desc" },
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
    });

    // Get all submissions for counting stats regardless of current filter
    const allSubmissions = await db.contactSubmission.findMany();

    const statusCounts = {
        NEW: allSubmissions.filter(
            (s) => s.status === ContactSubmissionStatus.NEW
        ).length,
        IN_PROGRESS: allSubmissions.filter(
            (s) => s.status === ContactSubmissionStatus.IN_PROGRESS
        ).length,
        REPLIED: allSubmissions.filter(
            (s) => s.status === ContactSubmissionStatus.REPLIED
        ).length,
        RESOLVED: allSubmissions.filter(
            (s) => s.status === ContactSubmissionStatus.RESOLVED
        ).length,
        CLOSED: allSubmissions.filter(
            (s) => s.status === ContactSubmissionStatus.CLOSED
        ).length,
        SPAM: allSubmissions.filter(
            (s) => s.status === ContactSubmissionStatus.SPAM
        ).length,
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Dashboard Header */}
            <div className="sticky top-0 left-0 z-20 w-full bg-white border-b border-gray-200 shadow-sm px-6 py-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-lg sm:text-2xl font-semibold line-clamp-1">
                            Contact Submissions
                        </h1>
                        <p className="text-sm text-gray-800 mt-1 line-clamp-1">
                            Manage and respond to user inquiries
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <LanguageSwitcher />
                        <button className="p-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                {/* Stats Section */}
                <section className="mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <StatCard
                            title="New"
                            value={statusCounts.NEW}
                            color="blue"
                            filtered={statusFilters.includes("NEW")}
                            statusFilters={statusFilters}
                            typeFilters={typeFilters}
                            currentPage={currentPage}
                        />
                        <StatCard
                            title="In Progress"
                            value={statusCounts.IN_PROGRESS}
                            color="amber"
                            filtered={statusFilters.includes("IN_PROGRESS")}
                            statusFilters={statusFilters}
                            typeFilters={typeFilters}
                            currentPage={currentPage}
                        />
                        <StatCard
                            title="Replied"
                            value={statusCounts.REPLIED}
                            color="emerald"
                            filtered={statusFilters.includes("REPLIED")}
                            statusFilters={statusFilters}
                            typeFilters={typeFilters}
                            currentPage={currentPage}
                        />
                        <StatCard
                            title="Resolved"
                            value={statusCounts.RESOLVED}
                            color="green"
                            filtered={statusFilters.includes("RESOLVED")}
                            statusFilters={statusFilters}
                            typeFilters={typeFilters}
                            currentPage={currentPage}
                        />
                        <StatCard
                            title="Closed"
                            value={statusCounts.CLOSED}
                            color="gray"
                            filtered={statusFilters.includes("CLOSED")}
                            statusFilters={statusFilters}
                            typeFilters={typeFilters}
                            currentPage={currentPage}
                        />
                        <StatCard
                            title="Spam"
                            value={statusCounts.SPAM}
                            color="red"
                            filtered={statusFilters.includes("SPAM")}
                            statusFilters={statusFilters}
                            typeFilters={typeFilters}
                            currentPage={currentPage}
                        />
                    </div>
                </section>

                {/* Filter Section */}
                <Suspense fallback={<div>Loading filters...</div>}>
                    <FilterBar
                        statusFilters={statusFilters}
                        typeFilters={typeFilters}
                        currentPage={currentPage}
                    />
                </Suspense>

                {/* Submissions Table */}
                <section className="bg-white rounded-xl shadow-md border border-gray-100 p-5 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Contact Submissions
                            {(statusFilters.length > 0 ||
                                typeFilters.length > 0) && (
                                <span className="text-sm font-normal text-gray-500 ml-2">
                                    {totalSubmissions} result
                                    {totalSubmissions !== 1 ? "s" : ""}
                                </span>
                            )}
                        </h2>

                        {(statusFilters.length > 0 ||
                            typeFilters.length > 0) && (
                            <a
                                href="/admin/contact"
                                className="text-sm text-primary hover:text-primary-dark flex items-center"
                            >
                                <Filter className="w-4 h-4 mr-1" /> Clear all
                                filters
                            </a>
                        )}
                    </div>

                    {submissions.length > 0 ? (
                        <>
                            <SubmissionTable submissions={submissions} />

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-6">
                                    <PaginationControl
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        statusFilters={statusFilters}
                                        typeFilters={typeFilters}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>
                                No submissions found matching the current
                                filters.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

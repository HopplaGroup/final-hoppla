// app/admin/contact/_components/PaginationControl.tsx
"use client";

import { useRouter } from "next/navigation";
import { ContactSubmissionStatus, ContactSubmissionType } from "@prisma/client";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  statusFilters: ContactSubmissionStatus[];
  typeFilters: ContactSubmissionType[];
}

export default function PaginationControl({
  currentPage,
  totalPages,
  statusFilters,
  typeFilters,
}: PaginationControlProps) {
  const router = useRouter();
  
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    
    // Add page parameter
    params.set('page', page.toString());
    
    // Add all status filters
    statusFilters.forEach(status => {
      params.append('status', status);
    });
    
    // Add all type filters
    typeFilters.forEach(type => {
      params.append('type', type);
    });
    
    const queryString = params.toString();
    router.push(`/admin/contact?${queryString}`);
  };

  return (
    <div className="pagination-container">
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={handlePageChange}
      />
      <div className="text-center text-sm text-gray-500 mt-2">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
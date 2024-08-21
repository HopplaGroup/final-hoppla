"use client";
import React from "react";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";

type PaginationProps = {
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withOptions({ shallow: false }).withDefault(1)
  );

  return (
    <div className="flex justify-center space-x-2 mt-4">
      {page && page > 1 && (
        <div
          onClick={() => setPage(page - 1)}
          // href={`${baseUrl}&page=${currentPage - 1}`}
          className="px-3 py-2 border rounded"
        >
          Previous
        </div>
      )}
      <span className="px-3 py-2">
        Page {page} of {totalPages}
      </span>
      {page && page < totalPages && (
        <div
          onClick={() => setPage(page + 1)}
          // href={`${baseUrl}&page=${currentPage + 1}`}
          className="px-3 py-2 border rounded"
        >
          Next
        </div>
      )}
    </div>
  );
};

export default Pagination;

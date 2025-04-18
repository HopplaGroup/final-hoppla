// app/admin/contact/_components/StatCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { ContactSubmissionStatus, ContactSubmissionType } from "@prisma/client";

interface StatCardProps {
  title: string;
  value: number;
  color: "blue" | "amber" | "emerald" | "green" | "gray" | "red";
  filtered?: boolean;
  statusFilters: ContactSubmissionStatus[];
  typeFilters: ContactSubmissionType[];
  currentPage: number;
}

const colorClasses = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    active: "bg-blue-100 border-blue-300"
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
    active: "bg-amber-100 border-amber-300"
  },
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
    active: "bg-emerald-100 border-emerald-300"
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    active: "bg-green-100 border-green-300"
  },
  gray: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    text: "text-gray-700",
    active: "bg-gray-100 border-gray-300"
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    active: "bg-red-100 border-red-300"
  },
};

export default function StatCard({ 
  title, 
  value, 
  color, 
  filtered = false,
  statusFilters,
  typeFilters,
  currentPage
}: StatCardProps) {
  const router = useRouter();
  
  const statusMap: Record<string, ContactSubmissionStatus> = {
    "New": ContactSubmissionStatus.NEW,
    "In Progress": ContactSubmissionStatus.IN_PROGRESS,
    "Replied": ContactSubmissionStatus.REPLIED,
    "Resolved": ContactSubmissionStatus.RESOLVED,
    "Closed": ContactSubmissionStatus.CLOSED,
    "Spam": ContactSubmissionStatus.SPAM
  };
  
  const status = statusMap[title];
  
  const handleClick = () => {
    const params = new URLSearchParams();
    
    let updatedStatusFilters = [...statusFilters];
    
    if (updatedStatusFilters.includes(status)) {
      // Remove this status if it's already selected
      updatedStatusFilters = updatedStatusFilters.filter(s => s !== status);
    } else {
      // Add this status if it's not selected
      updatedStatusFilters.push(status);
    }
    
    // When changing filters, reset to page 1
    params.set('page', '1');
    
    // Add all selected status filters to URL
    updatedStatusFilters.forEach(s => {
      params.append('status', s);
    });
    
    // Keep any existing type filters
    typeFilters.forEach(t => {
      params.append('type', t);
    });
    
    const queryString = params.toString();
    router.push(`/admin/contact${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div 
      onClick={handleClick}
      className={`rounded-lg border px-4 py-3 cursor-pointer transition-all ${
        colorClasses[color].bg
      } ${colorClasses[color].border} ${
        filtered ? colorClasses[color].active : ""
      } hover:shadow-md`}
    >
      <div className="flex items-center justify-between">
        <h3 className={`text-sm font-medium ${colorClasses[color].text}`}>
          {title}
        </h3>
        {filtered && (
          <span className="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
            ✓
          </span>
        )}
      </div>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}
// app/admin/contact/_components/FilterBar.tsx
"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { ContactSubmissionStatus, ContactSubmissionType } from "@prisma/client";
import { Filter, X } from "lucide-react";

interface FilterBarProps {
  statusFilters: ContactSubmissionStatus[];
  typeFilters: ContactSubmissionType[];
  currentPage: number;
}

export default function FilterBar({ 
  statusFilters, 
  typeFilters,
  currentPage
}: FilterBarProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(statusFilters.length > 0 || typeFilters.length > 0);

  const toggleFilter = useCallback((
    filterType: 'status' | 'type',
    value: ContactSubmissionStatus | ContactSubmissionType
  ) => {
    const params = new URLSearchParams();
    
    let updatedStatusFilters = [...statusFilters];
    let updatedTypeFilters = [...typeFilters];
    
    if (filterType === 'status') {
      if (statusFilters.includes(value as ContactSubmissionStatus)) {
        updatedStatusFilters = updatedStatusFilters.filter(s => s !== value);
      } else {
        updatedStatusFilters.push(value as ContactSubmissionStatus);
      }
    } else {
      if (typeFilters.includes(value as ContactSubmissionType)) {
        updatedTypeFilters = updatedTypeFilters.filter(t => t !== value);
      } else {
        updatedTypeFilters.push(value as ContactSubmissionType);
      }
    }
    
    // When changing filters, reset to page 1
    params.set('page', '1');
    
    // Add all selected status filters to URL
    updatedStatusFilters.forEach(status => {
      params.append('status', status);
    });
    
    // Add all selected type filters to URL
    updatedTypeFilters.forEach(type => {
      params.append('type', type);
    });
    
    const queryString = params.toString();
    router.push(`/admin/contact${queryString ? `?${queryString}` : ""}`);
  }, [router, statusFilters, typeFilters]);

  const clearFilterType = useCallback((filterType: 'status' | 'type') => {
    const params = new URLSearchParams();
    
    // When clearing filters, reset to page 1
    params.set('page', '1');
    
    if (filterType === 'status') {
      // Keep only type filters
      typeFilters.forEach(type => {
        params.append('type', type);
      });
    } else {
      // Keep only status filters
      statusFilters.forEach(status => {
        params.append('status', status);
      });
    }
    
    const queryString = params.toString();
    router.push(`/admin/contact${queryString ? `?${queryString}` : ""}`);
  }, [router, statusFilters, typeFilters]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-gray-500 mr-2" />
          <h3 className="font-medium">Filters</h3>
          
          {/* Show summary of active filters */}
          {(statusFilters.length > 0 || typeFilters.length > 0) && (
            <div className="ml-3 text-sm text-gray-500 flex flex-wrap items-center gap-1">
              <span>Active filters:</span>
              
              {statusFilters.length > 0 && (
                <div className="flex items-center">
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                    {statusFilters.length} status{statusFilters.length !== 1 ? 'es' : ''}
                  </span>
                  <button 
                    onClick={() => clearFilterType('status')}
                    className="ml-1 text-blue-800 hover:text-blue-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              
              {typeFilters.length > 0 && (
                <div className="flex items-center">
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                    {typeFilters.length} type{typeFilters.length !== 1 ? 's' : ''}
                  </span>
                  <button 
                    onClick={() => clearFilterType('type')}
                    className="ml-1 text-green-800 hover:text-green-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <button 
          onClick={toggleExpand}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? "Collapse" : "Expand"} filters
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Filters */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700">Status</h4>
              {statusFilters.length > 0 && (
                <button 
                  onClick={() => clearFilterType('status')}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.values(ContactSubmissionStatus).map((status) => (
                <button
                  key={status}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center ${
                    statusFilters.includes(status)
                      ? "bg-blue-100 text-blue-800 font-medium"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => toggleFilter('status', status)}
                >
                  {status.replace(/_/g, " ")}
                  {statusFilters.includes(status) && (
                    <span className="ml-1 w-3 h-3 flex items-center justify-center">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filters */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700">Type</h4>
              {typeFilters.length > 0 && (
                <button 
                  onClick={() => clearFilterType('type')}
                  className="text-xs text-green-600 hover:text-green-800"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.values(ContactSubmissionType).map((type) => (
                <button
                  key={type}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center ${
                    typeFilters.includes(type)
                      ? "bg-green-100 text-green-800 font-medium"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => toggleFilter('type', type)}
                >
                  {type.replace(/_/g, " ")}
                  {typeFilters.includes(type) && (
                    <span className="ml-1 w-3 h-3 flex items-center justify-center">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
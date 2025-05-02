"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
}

export default function CustomPagination({
  totalPages,
  initialPage = 1,
  onPageChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const renderPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={cn(
          "h-10 w-10 flex items-center justify-center border-t border-b border-r",
          currentPage === 1 ? "bg-gray-100" : "hover:bg-gray-50"
        )}
        aria-current={currentPage === 1 ? "page" : undefined}
      >
        1
      </button>
    );

    // Logic for showing ellipsis and surrounding pages
    if (totalPages > 5) {
      if (currentPage > 3) {
        pages.push(
          <span
            key="start-ellipsis"
            className="flex items-center justify-center w-10 h-10 border-t border-b border-r"
          >
            ...
          </span>
        );
      }

      // Show current page and surrounding pages
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        if (i <= totalPages - 1 && i >= 2) {
          pages.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={cn(
                "h-10 w-10 flex items-center justify-center border-t border-b border-r",
                currentPage === i ? "bg-gray-100" : "hover:bg-gray-50"
              )}
              aria-current={currentPage === i ? "page" : undefined}
            >
              {i}
            </button>
          );
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <span
            key="end-ellipsis"
            className="flex items-center justify-center w-10 h-10 border-t border-b border-r"
          >
            ...
          </span>
        );
      }
    } else {
      // If total pages is small, show all pages
      for (let i = 2; i < totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={cn(
              "h-10 w-10 flex items-center justify-center border-t border-b border-r",
              currentPage === i ? "bg-gray-100" : "hover:bg-gray-50"
            )}
            aria-current={currentPage === i ? "page" : undefined}
          >
            {i}
          </button>
        );
      }
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={cn(
            "h-10 w-10 flex items-center justify-center border-t border-b border-r",
            currentPage === totalPages ? "bg-gray-100" : "hover:bg-gray-50"
          )}
          aria-current={currentPage === totalPages ? "page" : undefined}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <nav className="flex justify-end px-6 py-3" aria-label="Pagination">
      <div className="inline-flex rounded-md shadow-sm">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center h-10 px-4 text-gray-700 bg-white border rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </button>

        {renderPageNumbers()}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center h-10 px-4 text-gray-700 bg-white border rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </nav>
  );
}

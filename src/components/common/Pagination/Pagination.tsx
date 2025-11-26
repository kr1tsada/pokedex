import { type FC } from 'react';
import clsx from 'clsx';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Pagination component สำหรับแบ่งหน้า
 * แสดง Previous, Page numbers (พร้อม ellipsis), Next
 */
export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  // สร้าง array ของ page numbers ที่จะแสดง
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const delta = 1; // จำนวน pages ที่แสดงรอบ current page

    // แสดง first page เสมอ
    pages.push(1);

    // คำนวณ range
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    // เพิ่ม ellipsis ซ้าย ถ้าจำเป็น
    if (start > 2) {
      pages.push('ellipsis-left');
    }

    // เพิ่ม page numbers ในช่วง
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // เพิ่ม ellipsis ขวา ถ้าจำเป็น
    if (end < totalPages - 1) {
      pages.push('ellipsis-right');
    }

    // แสดง last page เสมอ (ถ้ามีมากกว่า 1 page)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className={clsx('flex items-center justify-center space-x-2', className)}
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={clsx(
          'px-3 py-2 rounded-md font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'
        )}
        aria-label="Previous page"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (typeof page === 'string') {
          // Ellipsis
          return (
            <span key={`${page}-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          );
        }

        // Page number
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            disabled={isActive}
            className={clsx(
              'px-3 py-2 rounded-md font-medium transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              isActive ? 'bg-blue-600 text-white cursor-default' : 'text-gray-700 hover:bg-gray-100'
            )}
            aria-label={`Page ${page}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={clsx(
          'px-3 py-2 rounded-md font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-blue-600 hover:bg-blue-50'
        )}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
};

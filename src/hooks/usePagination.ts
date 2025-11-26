import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ITEMS_PER_PAGE } from '@/utils/constants';

/**
 * Pagination return type
 */
export interface UsePaginationReturn {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  offset: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Custom hook สำหรับจัดการ pagination
 * Sync กับ URL search params
 *
 * @param totalItems - จำนวน items ทั้งหมด
 * @param itemsPerPage - จำนวน items ต่อหน้า (default: ITEMS_PER_PAGE)
 * @returns Pagination state และ functions
 */
export const usePagination = (
  totalItems: number,
  itemsPerPage: number = ITEMS_PER_PAGE
): UsePaginationReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  // อ่าน currentPage จาก URL โดยตรง
  const currentPage = useMemo(() => {
    return Number(searchParams.get('page')) || 1;
  }, [searchParams]);

  // คำนวณ totalPages
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);

  // คำนวณ offset สำหรับ API
  const offset = useMemo(() => {
    return (currentPage - 1) * itemsPerPage;
  }, [currentPage, itemsPerPage]);

  // Next page function
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setSearchParams((prev) => {
        prev.set('page', String(newPage));
        return prev;
      });
    }
  }, [currentPage, totalPages, setSearchParams]);

  // Previous page function
  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setSearchParams((prev) => {
        prev.set('page', String(newPage));
        return prev;
      });
    }
  }, [currentPage, setSearchParams]);

  // Go to specific page
  const goToPage = useCallback(
    (page: number) => {
      // Validate page number
      if (page < 1 || page > totalPages) {
        return;
      }

      setSearchParams((prev) => {
        prev.set('page', String(page));
        return prev;
      });
    },
    [totalPages, setSearchParams]
  );

  // Check if has next/prev page
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    offset,
    nextPage,
    prevPage,
    goToPage,
    hasNextPage,
    hasPrevPage,
  };
};

import { type FC } from 'react';
import { Pagination as AntPagination } from 'antd';
import { MAX_POKEMON } from '@/utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Pagination component (Ant Design wrapper)
 * แสดง Previous, Page numbers (พร้อม ellipsis), Next, และ Quick Jumper
 */
export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize = 20,
  onPageChange,
  className,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  // Calculate total items from totalPages * pageSize
  const total = MAX_POKEMON;

  return (
    <AntPagination
      current={currentPage}
      total={total}
      pageSize={pageSize}
      onChange={onPageChange}
      showSizeChanger={false}
      showQuickJumper
      className={className}
      showTotal={(_, range) => `${range[0]}-${range[1]} of ${total} items`}
    />
  );
};

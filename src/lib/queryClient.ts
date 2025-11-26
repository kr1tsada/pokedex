import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query v5 Client Configuration
 *
 * ⚠️ Breaking Changes ใน v5:
 * - ใช้ gcTime แทน cacheTime
 * - Object-based syntax required
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 นาที - เวลาที่ข้อมูลยังถือว่าสด
      gcTime: 1000 * 60 * 30, // 30 นาที - เวลาที่เก็บ cache (เดิมคือ cacheTime)
      retry: 1, // พยายามใหม่ 1 ครั้งถ้าเกิด error
      refetchOnWindowFocus: false, // ไม่ refetch อัตโนมัติเมื่อกลับมา focus ที่หน้าต่าง
    },
  },
});

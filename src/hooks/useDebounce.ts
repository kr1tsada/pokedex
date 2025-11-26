import { useState, useEffect } from 'react';

/**
 * Custom hook สำหรับ debounce value
 * ใช้สำหรับ search input เพื่อลด API calls
 *
 * @param value - ค่าที่ต้องการ debounce
 * @param delay - เวลาหน่วง (milliseconds) default: 300ms
 * @returns Debounced value
 *
 * @example
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 300);
 *
 * useEffect(() => {
 *   // ทำงานเมื่อ debouncedSearchTerm เปลี่ยน
 *   fetchResults(debouncedSearchTerm);
 * }, [debouncedSearchTerm]);
 */
export const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set timeout เพื่อ update debounced value หลังจาก delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout ถ้า value เปลี่ยนก่อนหมด delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

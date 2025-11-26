import { type FC, type ReactNode } from 'react';
import clsx from 'clsx';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Container component - Max width wrapper สำหรับ content
 * รองรับ responsive design และ consistent spacing
 */
export const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6', className)}>{children}</div>
  );
};

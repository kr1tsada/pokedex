import { type FC } from 'react';
import clsx from 'clsx';

export type LoadingSize = 'sm' | 'md' | 'lg';

export interface LoadingProps {
  size?: LoadingSize;
  center?: boolean;
  className?: string;
}

/**
 * Loading spinner component
 * รองรับ size variants และ center positioning
 */
export const Loading: FC<LoadingProps> = ({ size = 'md', center = false, className }) => {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const spinner = (
    <div
      className={clsx(
        'border-blue-600 border-t-transparent rounded-full animate-spin',
        sizeStyles[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );

  if (center) {
    return <div className="flex items-center justify-center w-full min-h-[200px]">{spinner}</div>;
  }

  return spinner;
};

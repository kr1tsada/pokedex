import clsx from 'clsx';
import type { IconProps } from './types';

export const ListIcon = ({ className }: IconProps) => (
  <svg
    className={clsx('h-5 w-5', className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

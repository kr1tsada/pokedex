import { type FC, type HTMLAttributes } from 'react';
import clsx from 'clsx';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
}

/**
 * Card component สำหรับแสดงเนื้อหาในรูปแบบ card
 * รองรับ hover effect และ onClick event
 */
export const Card: FC<CardProps> = ({ children, hover = false, className, onClick, ...props }) => {
  const baseStyles = 'bg-white rounded-lg shadow-md p-4 transition-all duration-200';

  const interactiveStyles =
    onClick || hover ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' : '';

  return (
    <div
      className={clsx(baseStyles, interactiveStyles, className)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }
          : undefined
      }
      {...props}
    >
      {children}
    </div>
  );
};

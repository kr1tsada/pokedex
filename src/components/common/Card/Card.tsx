import { type FC } from 'react';
import { Card as AntCard } from 'antd';
import type { CardProps as AntCardProps } from 'antd';
import clsx from 'clsx';

export interface CardProps extends Omit<AntCardProps, 'hoverable'> {
  children: React.ReactNode;
  hover?: boolean;
}

/**
 * Card component (Ant Design wrapper)
 * รองรับ hover effect และ onClick event
 */
export const Card: FC<CardProps> = ({ children, hover = false, className, onClick, ...props }) => {
  return (
    <AntCard
      className={clsx(
        'transition-all duration-200',
        (hover || onClick) && 'cursor-pointer hover:shadow-lg hover:-translate-y-1',
        className
      )}
      onClick={onClick}
      hoverable={hover || !!onClick}
      {...props}
    >
      {children}
    </AntCard>
  );
};

import { type FC, type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'white';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

/**
 * Button component สำหรับ UI actions
 * รองรับ variants: primary (สีหลัก), secondary (สีรอง), outline (ขอบ)
 */
export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className,
  disabled,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800',
    outline:
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 active:bg-blue-100',
    white: 'bg-white text-black hover:bg-gray-100 focus:ring-gray-500 active:bg-gray-200',
  };

  const iconElement =
    icon &&
    (iconPosition === 'left' ? (
      <span className="mr-2 flex-shrink-0">{icon}</span>
    ) : (
      <span className="ml-2 flex-shrink-0">{icon}</span>
    ));

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className)}
      disabled={disabled}
      {...props}
    >
      {iconPosition === 'left' && iconElement}
      <span className="inline-flex items-center">{children}</span>
      {iconPosition === 'right' && iconElement}
    </button>
  );
};

import { type FC, type ReactNode } from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';

export type ButtonVariant = 'primary' | 'default' | 'dashed' | 'text';

export interface ButtonProps extends Omit<AntButtonProps, 'type' | 'variant' | 'iconPosition'> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

/**
 * Button component (Ant Design wrapper)
 * รองรับ variants: primary, default, dashed, text
 * Custom prop: iconPosition สำหรับวาง icon ซ้าย/ขวา (map เป็น start/end)
 */
export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  iconPosition = 'left',
  className,
  ...props
}) => {
  // Map custom variants to Ant Design types
  const typeMap: Record<ButtonVariant, AntButtonProps['type']> = {
    primary: 'primary',
    default: 'default',
    dashed: 'dashed',
    text: 'text',
  };

  // Map custom icon position values to Ant Design values
  const mappedIconPosition: 'start' | 'end' = iconPosition === 'right' ? 'end' : 'start';

  return (
    <AntButton
      type={typeMap[variant]}
      icon={icon}
      iconPosition={mappedIconPosition}
      className={className}
      {...props}
    >
      {children}
    </AntButton>
  );
};

import { type FC, type ReactNode } from 'react';
import { Input as AntInput } from 'antd';
import type { InputProps as AntInputProps } from 'antd';

export interface InputProps extends Omit<AntInputProps, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  showClear?: boolean;
}

/**
 * Input component (Ant Design wrapper)
 * รองรับ icon (prefix), clear button, และ accessible
 * Custom onChange signature: (value: string) => void
 */
export const Input: FC<InputProps> = ({
  value,
  onChange,
  icon,
  showClear = true,
  className,
  ...props
}) => {
  return (
    <AntInput
      value={value}
      onChange={(e) => onChange(e.target.value)}
      prefix={icon}
      allowClear={showClear}
      className={className}
      {...props}
    />
  );
};

/**
 * Search Input variant
 * ใช้ Input.Search ของ Ant Design พร้อม search icon
 */
export const SearchInput: FC<InputProps> = ({
  value,
  onChange,
  showClear = true,
  className,
  ...props
}) => {
  return (
    <AntInput.Search
      value={value}
      onChange={(e) => onChange(e.target.value)}
      allowClear={showClear}
      className={className}
      {...props}
    />
  );
};

import { type FC, type InputHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'search' | 'number';
  icon?: ReactNode;
  showClear?: boolean;
}

/**
 * Input component แบบ controlled
 * รองรับ icon, clear button, และ accessible
 */
export const Input: FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  icon,
  showClear = true,
  className,
  ...props
}) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={clsx('relative flex items-center', className)}>
      {/* Icon ด้านซ้าย (ถ้ามี) */}
      {icon && <div className="absolute left-3 text-gray-400 pointer-events-none">{icon}</div>}

      {/* Input field */}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          'w-full px-4 py-2 border border-gray-300 rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'transition-all duration-200',
          'placeholder:text-gray-400',
          icon && 'pl-10',
          showClear && value && 'pr-10'
        )}
        {...props}
      />

      {/* Clear button (แสดงเมื่อมี value และ showClear=true) */}
      {showClear && value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear input"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

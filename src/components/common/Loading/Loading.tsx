import { type FC } from 'react';
import { Spin } from 'antd';
import type { SpinSize } from 'antd/es/spin';

export type LoadingSize = 'small' | 'default' | 'large';

export interface LoadingProps {
  size?: LoadingSize;
  center?: boolean;
  className?: string;
  tip?: string;
}

/**
 * Loading spinner component (Ant Design Spin wrapper)
 * รองรับ size variants และ center positioning
 */
export const Loading: FC<LoadingProps> = ({ size = 'default', center = false, className, tip }) => {
  const spinner = <Spin size={size as SpinSize} className={className} tip={tip} />;

  if (center) {
    return <div className="flex items-center justify-center w-full min-h-[200px]">{spinner}</div>;
  }

  return spinner;
};

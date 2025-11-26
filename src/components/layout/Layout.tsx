import { type FC, type ReactNode } from 'react';
import { Header } from './Header';

export interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout component - Main layout structure
 * ประกอบด้วย Header และ main content area
 */
export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>{children}</main>
    </div>
  );
};

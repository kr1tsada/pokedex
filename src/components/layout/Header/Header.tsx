import { type FC } from 'react';

/**
 * Header component - Sticky header พร้อม logo และ title
 * จะเพิ่ม search bar ใน Phase 4
 */
export const Header: FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-12.5c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 hidden sm:block">Pokedex</h1>
            <h1 className="text-xl font-bold text-gray-900 sm:hidden">Pokedex</h1>
          </div>

          {/* Placeholder for search bar - จะเพิ่มใน Phase 4 */}
          <div className="flex-1 max-w-lg mx-4 hidden md:block">
            {/* Search bar will be added in Phase 4 */}
          </div>
        </div>
      </div>
    </header>
  );
};

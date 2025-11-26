import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

/**
 * Header component - Sticky header พร้อม logo และ title
 * จะเพิ่ม search bar ใน Phase 4
 */
export const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center space-x-3 focus:outline-none"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg text-white">
              <HomeOutlined className="text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 hidden sm:block">Pokedex</h1>
            <h1 className="text-xl font-bold text-gray-900 sm:hidden">Pokedex</h1>
          </button>

          {/* Placeholder for search bar - จะเพิ่มใน Phase 4 */}
          <div className="flex-1 max-w-lg mx-4 hidden md:block">
            {/* Search bar will be added in Phase 4 */}
          </div>
        </div>
      </div>
    </header>
  );
};

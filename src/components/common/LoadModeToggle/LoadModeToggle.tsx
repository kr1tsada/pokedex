import { type FC } from 'react';
import { Button, Tooltip, Tag } from 'antd';
import { ThunderboltOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useLoadMode } from '@/contexts';

/**
 * LoadModeToggle Component
 *
 * Toggle button สำหรับสลับระหว่าง Pagination และ Load All mode
 * แสดงข้อมูลเปรียบเทียบและคำเตือน
 */
export const LoadModeToggle: FC = () => {
  const { loadMode, toggleLoadMode } = useLoadMode();

  const isPagination = loadMode === 'pagination';

  return (
    <div className="flex items-center gap-3">
      <Tooltip
        title={
          isPagination
            ? 'Switch to Load All mode (1010 Pokemon, slower initial load)'
            : 'Switch to Pagination mode (20 Pokemon per page, faster)'
        }
      >
        <Button
          type={isPagination ? 'default' : 'primary'}
          icon={isPagination ? <ThunderboltOutlined /> : <AppstoreOutlined />}
          onClick={toggleLoadMode}
          className="flex items-center gap-1"
        >
          {isPagination ? 'Try Load All Mode' : 'Back to Pagination'}
        </Button>
      </Tooltip>

      {isPagination ? (
        <Tag color="blue" className="m-0">
          <AppstoreOutlined className="mr-1" />
          Pagination Mode
        </Tag>
      ) : (
        <Tag color="orange" className="m-0">
          <ThunderboltOutlined className="mr-1" />
          Load All Mode
        </Tag>
      )}

      <div className="text-xs text-gray-500 hidden md:block">
        {isPagination ? (
          <span>20 Pokemon/page · Fast load · Limited search</span>
        ) : (
          <span>1010 Pokemon · Slower load · Full search</span>
        )}
      </div>
    </div>
  );
};

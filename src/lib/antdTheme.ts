import type { ThemeConfig } from 'antd';

/**
 * Ant Design theme configuration
 * Aligned with Tailwind CSS design tokens สำหรับ consistency
 */
export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#3b82f6', // blue-600 (Tailwind)
    colorSuccess: '#10b981', // green-500
    colorWarning: '#f59e0b', // amber-500
    colorError: '#ef4444', // red-500
    borderRadius: 8,
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  components: {
    Button: {
      controlHeight: 38,
      paddingContentHorizontal: 16,
    },
    Input: {
      controlHeight: 42,
    },
    Card: {
      borderRadiusLG: 12,
    },
  },
};

import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common';

/**
 * ErrorPage component - Error boundary สำหรับ React Router v7
 * ใช้ useRouteError hook แทน class-based ErrorBoundary
 * รองรับ 404, routing errors, และ JavaScript errors
 */
export const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage: string;
  let errorStatus: number | undefined;

  if (isRouteErrorResponse(error)) {
    // Route error (404, 500, etc.)
    errorMessage = error.statusText || error.data?.message || 'เกิดข้อผิดพลาด';
    errorStatus = error.status;
  } else if (error instanceof Error) {
    // JavaScript error
    errorMessage = error.message;
  } else {
    // Unknown error
    errorMessage = 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ';
  }

  const handleRetry = () => {
    navigate(0); // Reload current route
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {errorStatus && <div className="text-6xl font-bold text-red-600 mb-4">{errorStatus}</div>}

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {errorStatus === 404 ? 'ไม่พบหน้าที่ต้องการ' : 'เกิดข้อผิดพลาด'}
        </h1>

        <p className="text-gray-600 mb-6">{errorMessage}</p>

        {/* Development mode: แสดง error stack */}
        {import.meta.env.DEV && error instanceof Error && error.stack && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details (Dev Only)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40">
              {error.stack}
            </pre>
          </details>
        )}

        <div className="flex gap-3 justify-center">
          <Button onClick={handleRetry} variant="default">
            ลองอีกครั้ง
          </Button>
          <Button onClick={handleGoHome} variant="primary">
            กลับหน้าหลัก
          </Button>
        </div>
      </div>
    </div>
  );
};

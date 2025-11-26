import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// ทำความสะอาดหลังจาก test แต่ละตัว
afterEach(() => {
  cleanup();
});

import fs from 'fs';
import path from 'path';
import '@testing-library/jest-dom';

beforeAll(() => {
  [
    'reports',
    'reports/html',
    'reports/junit',
    'reports/screenshots',
    'reports/videos',
    'reports/traces'
  ].forEach(folder => {
    const fullPath = path.resolve(folder);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
  });
});
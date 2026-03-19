import dotenv from 'dotenv';

dotenv.config();

function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export const env = {
  baseUrl: required('BASE_URL', 'https://www.saucedemo.com'),
  headless: (process.env.HEADLESS ?? 'true') === 'true',
  slowMo: Number(process.env.SLOW_MO ?? '0'),
  browserName: required('BROWSER', 'chromium') as 'chromium' | 'firefox' | 'webkit'
};
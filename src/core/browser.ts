import fs from 'fs';
import path from 'path';
import { chromium, firefox, webkit } from 'playwright';
import type {
  Browser,
  BrowserContext,
  BrowserType,
  Page
} from 'playwright';
import { env } from '../config/env';

export type SupportedBrowser = 'chromium' | 'firefox' | 'webkit';

export type BrowserSession = {
  browser: Browser;
  context: BrowserContext;
  page: Page;
};

function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function getBrowserType(browserName: SupportedBrowser): BrowserType {
  switch (browserName) {
    case 'firefox':
      return firefox;
    case 'webkit':
      return webkit;
    case 'chromium':
    default:
      return chromium;
  }
}

export async function startBrowser(
  browserName?: SupportedBrowser
): Promise<BrowserSession> {
  const effectiveBrowser = browserName ?? env.browserName ?? 'chromium';

  ensureDir(path.resolve('reports'));
  ensureDir(path.resolve('reports/screenshots'));
  ensureDir(path.resolve('reports/videos'));
  ensureDir(path.resolve('reports/traces'));

  const browserType = getBrowserType(effectiveBrowser);

  const browser = await browserType.launch({
    headless: env.headless,
    slowMo: env.slowMo
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: path.resolve('reports/videos'),
      size: { width: 1280, height: 720 }
    }
  });

  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });

  const page = await context.newPage();

  return {
    browser,
    context,
    page
  };
}

export async function stopBrowser(
  session?: Partial<BrowserSession>,
  tracePath?: string
): Promise<void> {
  if (session?.context) {
    if (tracePath) {
      await session.context.tracing.stop({ path: tracePath }).catch(() => undefined);
    } else {
      await session.context.tracing.stop().catch(() => undefined);
    }
  }

  await session?.page?.close().catch(() => undefined);
  await session?.context?.close().catch(() => undefined);
  await session?.browser?.close().catch(() => undefined);
}
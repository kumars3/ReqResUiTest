import fs from 'fs';
import path from 'path';
import type { Page, Video } from 'playwright';
import {
  startBrowser,
  stopBrowser,
  type BrowserSession,
  type SupportedBrowser
} from './browser';
import type { ShippingDetails } from './random';

function safeFileName(value: string): string {
  return value.replace(/[^a-zA-Z0-9-_]+/g, '_').toLowerCase();
}

export class ScenarioWorld {
  private session?: BrowserSession;
  private readonly browserName?: SupportedBrowser;
  private artifactBaseName = 'scenario';

  selectedItems: string[] = [];
  shippingDetails?: ShippingDetails;

  constructor(browserName?: SupportedBrowser) {
    this.browserName = browserName;
  }

  async start(testName = 'scenario'): Promise<void> {
    this.artifactBaseName = safeFileName(testName);
    this.session = await startBrowser(this.browserName);
  }

  get page(): Page {
    if (!this.session) {
      throw new Error('ScenarioWorld not started');
    }

    return this.session.page;
  }

  get context() {
    if (!this.session) {
      throw new Error('ScenarioWorld not started');
    }

    return this.session.context;
  }

  get browser() {
    if (!this.session) {
      throw new Error('ScenarioWorld not started');
    }

    return this.session.browser;
  }

  async screenshot(name: string): Promise<string> {
    const filePath = path.resolve(
      `reports/screenshots/${safeFileName(name)}.png`
    );

    await this.page.screenshot({
      path: filePath,
      fullPage: true
    });

    return filePath;
  }

  async saveVideo(name?: string): Promise<string | undefined> {
    if (!this.session) {
      return undefined;
    }

    const video: Video | null = this.session.page.video();

    if (!video) {
      return undefined;
    }

    const filePath = path.resolve(
      `reports/videos/${safeFileName(name ?? this.artifactBaseName)}.webm`
    );

    await video.saveAs(filePath).catch(() => undefined);

    return fs.existsSync(filePath) ? filePath : undefined;
  }

  getTracePath(name?: string): string {
    return path.resolve(
      `reports/traces/${safeFileName(name ?? this.artifactBaseName)}.zip`
    );
  }

  async stop(name?: string): Promise<void> {
    const tracePath = this.getTracePath(name);

    await stopBrowser(this.session, tracePath);

    this.session = undefined;
    this.selectedItems = [];
    this.shippingDetails = undefined;
  }
}
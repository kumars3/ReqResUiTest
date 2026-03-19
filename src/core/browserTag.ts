import type { SupportedBrowser } from './browser';

type FeatureLike = {
  tags?: string[];
  scenarios?: Array<{
    title: string;
    tags?: string[];
  }>;
};

const SUPPORTED_BROWSER_TAGS = ['@chromium', '@firefox', '@webkit'] as const;

export function getScenarioBrowser(
  feature: FeatureLike,
  scenarioTitle: string
): SupportedBrowser | undefined {
  const scenario = feature.scenarios?.find(s => s.title === scenarioTitle);

  if (!scenario) {
    throw new Error(`Scenario not found: ${scenarioTitle}`);
  }

  const allTags = [...(feature.tags ?? []), ...(scenario.tags ?? [])];
  const normalizedTags = allTags.map(tag => tag.toLowerCase());

  const matchedTag = normalizedTags.find(tag =>
    SUPPORTED_BROWSER_TAGS.includes(tag as (typeof SUPPORTED_BROWSER_TAGS)[number])
  );

  if (!matchedTag) {
    return undefined;
  }

  return matchedTag.replace('@', '') as SupportedBrowser;
}
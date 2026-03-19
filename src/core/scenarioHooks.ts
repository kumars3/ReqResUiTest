import { ScenarioWorld } from './scenarioWorld';
import { getScenarioBrowser } from './browserTag';

type FeatureLike = {
  tags?: string[];
  scenarios?: Array<{
    title: string;
    tags?: string[];
  }>;
};

export function useScenario(feature: FeatureLike, scenarioTitle: string) {
  const browserName = getScenarioBrowser(feature, scenarioTitle);

  let world: ScenarioWorld | undefined;

  beforeEach(async () => {
    world = new ScenarioWorld(browserName);
    await world.start(scenarioTitle);
  });

  afterEach(async () => {
    if (!world) {
      return;
    }

    const testName = expect.getState().currentTestName ?? scenarioTitle;

    await world.screenshot(`${testName}_final`).catch(() => undefined);
    await world.stop(testName).catch(() => undefined);
  });

  return {
    get world(): ScenarioWorld {
      if (!world) {
        throw new Error('Scenario world is not initialized');
      }

      return world;
    }
  };
}
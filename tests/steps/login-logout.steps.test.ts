import { loadFeature, defineFeature } from 'jest-cucumber'; 
import { LoginPage } from '../../src/pages/LoginPage'; 
import { InventoryPage } from '../../src/pages/InventoryPage'; 
import { users } from '../../src/data/users'; 
import { expect } from '@playwright/test'; 
import { useScenario } from '../../src/core/scenarioHooks'; 

const feature = loadFeature('./tests/features/login-logout.feature');

defineFeature(feature, test => {
   test('Standard user logs in and logs out successfully', ({ given, when, then, and }) => {
    const scenario = useScenario(
      feature as any,
      'Standard user logs in and logs out successfully'
    );

  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  given('I open the SauceDemo login page', async () => {
       loginPage = new LoginPage(scenario.world.page);
      inventoryPage = new InventoryPage(scenario.world.page);
      await loginPage.open();
    });

    when('I log in as the standard user', async () => {
      await loginPage.login(users.standard.username!, users.standard.password!);
      });

    then('login should be successful', async () => {
      await expect(scenario.world.page).toHaveURL(/inventory\.html/);
    });

    and('the Products page should be visible', async () => {
      await inventoryPage.assertLoaded();
    });

    when('I log out', async () => {
      await inventoryPage.logout();
    });

    then('I should return to the login page', async () => {
      await expect(scenario.world.page).toHaveURL(/saucedemo\.com\/?$/);
      await expect(scenario.world.page.getByPlaceholder('Username')).toBeVisible();
    });
  });
});
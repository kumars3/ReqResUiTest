import { defineFeature, loadFeature } from 'jest-cucumber';
import { randomShippingDetails } from '../../src/core/random';
import { products } from '../../src/data/products';
import { users } from '../../src/data/users';
import { CartPage } from '../../src/pages/CartPage';
import { CheckoutCompletePage } from '../../src/pages/CheckoutCompletePage';
import { CheckoutInfoPage } from '../../src/pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../../src/pages/CheckoutOverviewPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { LoginPage } from '../../src/pages/LoginPage';
import { useScenario } from '../../src/core/scenarioHooks';

const feature = loadFeature('./tests/features/single-item-checkout.feature');

defineFeature(feature, test => {
  test('Checkout with one item', ({ given, when, then, and }) => {
const scenario = useScenario(
      feature as any,
      'Checkout with one item'
    );
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let infoPage: CheckoutInfoPage;
  let overviewPage: CheckoutOverviewPage;
  let completePage: CheckoutCompletePage;

      given('I open the SauceDemo login page', async () => {
       loginPage = new LoginPage(scenario.world.page);
      inventoryPage = new InventoryPage(scenario.world.page);
      cartPage = new CartPage(scenario.world.page);
      infoPage = new CheckoutInfoPage(scenario.world.page);
      overviewPage = new CheckoutOverviewPage(scenario.world.page);
      completePage = new CheckoutCompletePage(scenario.world.page);
      await loginPage.open();
    });

      given('I am logged in as the standard user', async () => {
       await loginPage.login(users.standard.username!, users.standard.password!);
    });
    

    when('I add one item to the cart', async () => {
      scenario.world.selectedItems = [products.backpack];
      await inventoryPage.addItem(products.backpack);
      await inventoryPage.assertCartCount(1);
    });

    and('I open the cart', async () => {
      await inventoryPage.openCart();
      await cartPage.assertLoaded();
    });

    then('the selected item should be present in the cart', async () => {
      await cartPage.assertItemsPresent(scenario.world.selectedItems);
    });

    when('I proceed to checkout', async () => {
      await cartPage.checkout();
    });

    then('the checkout information page should be displayed', async () => {
      await infoPage.assertLoaded();
    });

    when('I enter random shipping details', async () => {
      scenario.world.shippingDetails = randomShippingDetails();
      await infoPage.enterShipping(scenario.world.shippingDetails);
    });

    and('I continue to the overview page', async () => {
      await infoPage.continue();
    });

    then('the checkout overview page should be displayed', async () => {
      await overviewPage.assertLoaded();
    });

    and('the selected item should be present in the overview', async () => {
      await overviewPage.assertItemsPresent(scenario.world.selectedItems);
    });

    when('I complete the order', async () => {
      await overviewPage.finish();
    });

    then('the order confirmation page should be displayed', async () => {
      await completePage.assertLoaded();
    });

    and('the order success message should be visible', async () => {
      await completePage.assertSuccess();
    });
  });
});
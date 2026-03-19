Feature: Single item checkout
  As a SauceDemo user
  I want to purchase a single item
  So that I can complete an order successfully
  
  @webkit
  Scenario: Checkout with one item
    Given I open the SauceDemo login page
    And I am logged in as the standard user
    When I add one item to the cart
    And I open the cart
    Then the selected item should be present in the cart
    When I proceed to checkout
    Then the checkout information page should be displayed
    When I enter random shipping details
    And I continue to the overview page
    Then the checkout overview page should be displayed
    And the selected item should be present in the overview
    When I complete the order
    Then the order confirmation page should be displayed
    And the order success message should be visible
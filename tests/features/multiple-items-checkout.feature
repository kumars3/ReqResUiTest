Feature: Multiple items checkout
  As a SauceDemo user
  I want to purchase multiple items
  So that I can complete a multi-item order successfully
  
  @chromium
  Scenario: Checkout with multiple items
    Given I open the SauceDemo login page
    And I am logged in as the standard user
    When I add multiple items to the cart
    And I open the cart
    Then all selected items should be present in the cart
    When I proceed to checkout
    Then the checkout information page should be displayed
    When I enter random shipping details
    And I continue to the overview page
    Then the checkout overview page should be displayed
    And all selected items should be present in the overview
    When I complete the order
    Then the order confirmation page should be displayed
    And the order success message should be visible
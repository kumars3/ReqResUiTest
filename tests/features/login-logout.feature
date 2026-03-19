Feature: Login and logout
  As a SauceDemo user
  I want to sign in and sign out
  So that I can access and leave the products area safely
  
  @firefox
  Scenario: Standard user logs in and logs out successfully
    Given I open the SauceDemo login page
    When I log in as the standard user
    Then login should be successful
    And the Products page should be visible
    When I log out
    Then I should return to the login page
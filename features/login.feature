Feature: SauceDemo Login

  Scenario: User logs in successfully
    Given I am on the SauceDemo login page
    When I log in with username "standard_user" and password "secret_sauce"
    Then I should be redirected to the Product inventory page
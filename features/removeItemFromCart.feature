Feature: Remove Item from Cart

  Scenario: User removes an item from the cart
    Given I am logged in to SauceDemo
    When I add an item to the cart
    And I remove the item from the cart
    Then the cart should be empty
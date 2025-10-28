Feature: Add Item to Cart

    Scenario: User adds an item to the cart
        Given I am logged in to SauceDemo
        When I add an item to the cart
        Then the cart should show 1 item

    Scenario: User adds all items to the cart
        Given I am logged in to SauceDemo
        When I add all items to the cart
        Then the cart should show 6 items
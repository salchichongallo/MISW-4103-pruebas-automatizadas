Feature: Page creation

@user1 @web
Scenario: CREAPAGE3 - Page is saved as draft with title, content and image
  Given The login page
    And I sign-in with "<email>" and "<password>"
    And I wait for the dashboard
  When I navigate to page section
    And I click on new page
    And I set the page title to "$name_1"
    And I set the page content
    And I set the page image
    And I return to the pages list
  Then I should see the page title with draft flag

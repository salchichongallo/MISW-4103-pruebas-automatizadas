Feature: Page creation

@user1 @web
Scenario: CREAPAGE1 - Page is created properly
  Given The login page
    And I sign-in with "<email>" and "<password>"
    And I wait for the dashboard
  When I navigate to page section
    And I click on new page
    And I set the page title to "$name_1"
    And I set the page content
    And I create the page
    And I confirm the publication
    And I confirm the publish
  Then I navigate to pages section and see the title

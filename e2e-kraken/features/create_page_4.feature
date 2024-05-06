Feature: Page creation

@user1 @web
Scenario: CREAPAGE4 - Page is created with title, content, image and access only for members paid
  Given The login page
    And I sign-in with "<email>" and "<password>"
    And I wait for the dashboard
  When I navigate to page section
    And I click on new page
    And I set the page title to "$name_1"
    And I set the page content
    And I set the page image
    And I set the page access to "members paid"
    And I create the page
    And I confirm the publication
    And I confirm the publish
  Then I navigate to pages section and see the title

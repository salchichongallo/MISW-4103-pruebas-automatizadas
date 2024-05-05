Feature: Delete Tag

@user3 @web
Scenario: DELTAG3 - Tag is no longer listed in a page
  Given The login page
    And I sign-in with "<email>" and "<password>"
    And I wait for the dashboard
    And I navigate to tags page
    And I create the tag "$name_4"
    And I navigate to webpages page
    And I create a webpage "$name_5" with tag "$$name_4"
    And I go back to dashboard
  When I navigate to tags page
    And I select the "$$name_4" tag
    And I delete the tag
  Then I should not see the tag "$$name_4"
    And the public page tag "$$name_4" should not exist
    And the tags of the webpage "$$name_5" should not include "$$name_4"

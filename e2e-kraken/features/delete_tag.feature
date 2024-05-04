Feature: Delete Tag

@user1 @web
Scenario: DELTAG1 - Tag is deleted from public page
  Given The login page
    And I sign-in with "<email>" and "<password>"
    And I wait for the dashboard
    And I navigate to tags page
    And I create the tag "$name_1"
  When I navigate to tags page
    And I select the "$$name_1" tag
    And I delete the tag
  Then I should not see the tag "$$name_1"
    And the public page tag "$$name_1" should not exist

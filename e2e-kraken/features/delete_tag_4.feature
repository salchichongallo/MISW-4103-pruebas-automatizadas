Feature: Delete Tag

@user3 @web
Scenario: DELTAG4 - Admins cancel deletion of tags
  Given The login page
    And I sign-in with "<email>" and "<password>"
    And I wait for the dashboard
    And I navigate to tags page
    And I create the tag "$name_6"
    And I go back to dashboard
  When I navigate to tags page
    And I select the "$$name_6" tag
    And I click on delete tag button
    And I cancel de deletion of the tag
  Then I navigate to tags page
    And I should see the tag "$$name_6"

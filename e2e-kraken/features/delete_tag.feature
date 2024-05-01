Feature: Delete Tag

@user1 @web
Scenario: DELTAG1 - Tag is deleted from public page
  Given I visit the admin panel
    And I login in as admin with "<email>" and "<password>"
    And I navigate to the tags page
    And I create the tag "$name_1"
    And I navigate to the tags page
    And I click on the "$$name_1" tag
  When I click on the delete tag button
    And I confirm the deletion of the tag
  Then I should not see the tag "$$name_1"
    And the public page tag "$$name_1" should not exist
    And I wait

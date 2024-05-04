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

@user2 @web
Scenario: DELTAG2 - Tag is no longer listed in a post
  Given I visit the admin panel
    And I login in as admin with "<email>" and "<password>"
    And I navigate to the tags page
    And I create the tag "$name_1"
    And I navigate to the posts page
    And I create a post
    And I set the post title to "$name_2"
    And I open the post settings
    And I add the tag "$$name_1" to the post
    And I click on the publish post button
    And I go to the final review
    And I confirm the publication
    And I go back to the dashboard
    And I navigate to the tags page
    And I click on the "$$name_1" tag
  When I click on the delete tag button
    And I confirm the deletion of the tag
  Then I should not see the tag "$$name_1"
    And the public page tag "$$name_1" should not exist
    And I visit the post "$$name_2" page
    And the tag "$$name_1" should not be listed
    And I wait

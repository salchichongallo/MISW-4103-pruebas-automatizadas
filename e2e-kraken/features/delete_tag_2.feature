Feature: Delete Tag

@user2 @web
Scenario: DELTAG2 - Tag is no longer listed in a post
  Given The login page
    And I sign-in with "<email>" and "<password>"
    And I navigate to tags page
    And I create the tag "$name_2"
    And I navigate to posts page
    And I create a post "$name_3" with tag "$$name_2"
    And I go back to dashboard
  When I navigate to tags page
    And I select the "$$name_2" tag
    And I delete the tag
  Then I should not see the tag "$$name_2"
    And the public page tag "$$name_2" should not exist
    And the tags of the page "$$name_3" should not include "$$name_2"

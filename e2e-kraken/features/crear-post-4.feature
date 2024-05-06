Feature: Create a post

@user1 @web
Scenario: T12 - As a user I log in, enter the Posts section, create a new Post, without publishing it and it should not appear on the published page
    Given I visit the admin panel
        And I wait for 3 seconds
        And I login in as admin with "<email>" and "<password>"
        And I wait for 1 seconds
        And I click on the post button
        And I wait for 2 seconds
        And I click on the new post button
        And I wait for 2 seconds
        And I enter the title "Unpublished"
        And I wait for 2 seconds
        And I click on the droppable paragraph
        And I wait for 2 seconds
        And I click on the Posts link back
        And I wait for 2 seconds
        And I click on the Published link
        And I wait for 2 seconds
        And I click on the Published link
        And I wait for 2 seconds
    Then I should not see the post "Unpublished"

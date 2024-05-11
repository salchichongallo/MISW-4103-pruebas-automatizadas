Feature: Create a post

@user1 @web
Scenario: T11 - As a user, I log in, enter the Posts section, create a new Post, without publishing it and it must appear in the drafts list to be published later
    Given I visit the admin panel
        And I wait for 3 seconds
        And I login in as admin with "<email>" and "<password>"
        And I wait for 1 seconds
        And I click on the post button
        And I wait for 2 seconds
        And I click on the new post button
        And I wait for 2 seconds
        And I enter the title "Unpublished in draft list"
        And I wait for 2 seconds
        And I click on the droppable paragraph
        And I wait for 2 seconds
    When I click on the Posts link back
        And I wait for 2 seconds
        And I click on the Draft link
        And I wait for 2 seconds
    Then I should see the post in drafts "Unpublished in draft list"

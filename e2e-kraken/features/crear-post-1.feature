Feature: Create a post

@user1 @web
Scenario: T9 - As a user I log in, enter the Posts section, create a new Post and verify its creation in the Posts list
    Given I visit the admin panel
        And I wait for 3 seconds
        And I login in as admin with "<email>" and "<password>"
        And I wait for 1 seconds
        And I click on the post button
        And I wait for 2 seconds
        And I click on the new post button
        And I wait for 2 seconds
        And I enter the title "test post"
        And I wait for 2 seconds
        And I click on the droppable paragraph
        And I wait for 2 seconds
        And I click on the publish button
        And I wait for 3 seconds
        And I click on the continue, final review button
        And I wait for 1 seconds
        And I click on the publish post, right now button
        And I wait for 3 seconds
        And I click on the back to dashboard post button
        And I wait for 2 seconds
        And I click on the post button
        And I wait for 2 seconds
    Then I should see the post "test post"

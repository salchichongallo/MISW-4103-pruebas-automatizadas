Feature: Creación de tag

@user1 @web
Scenario: CREATAG3 - Creación de tag con nombre mayor a 191 caracteres
    Given The login page
        And I sign-in with "<email>" and "<password>"
        And I wait for the dashboard
        And I navigate to tags page
        And I select create New Tag
    When I attempt to create a tag with a name of 200 characters
        And I create the tag description "$string_1"
        And I click on the save Tag
    Then I should see an error message saying "Tag names cannot be longer than 191 characters."

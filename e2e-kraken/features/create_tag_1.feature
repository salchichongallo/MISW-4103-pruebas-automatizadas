Feature: Creación de tag

@user1 @web
Scenario: T1 - Creación de tag con nombre vacío
    Given The login page
        And I sign-in with "<email>" and "<password>"
        And I wait for the dashboard
        And I navigate to tags page
        And I select create New Tag
    When I create the tag name "     "
        And I create slug Tag "$name_1"
        And I create the tag description "$string_2"
        And I click on the save Tag
    Then I should see an error message saying "You must specify a name for the tag."

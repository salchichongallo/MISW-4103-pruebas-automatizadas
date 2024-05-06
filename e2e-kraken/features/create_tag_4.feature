Feature: Creación de tag

@user1 @web
Scenario: T4 - Creación de tag con color no hexadecimal
    Given The login page
        And I sign-in with "<email>" and "<password>"
        And I wait for the dashboard
        And I navigate to tags page
        And I select create New Tag
    When I create the tag name "$name_1"
        And I create slug Tag "$name_2"
        And I create the tag description "$string_2"
        And I create the tag color "GHI789"
        And I click on the save Tag
    Then I should see a color error message saying "The colour should be in valid hex format"

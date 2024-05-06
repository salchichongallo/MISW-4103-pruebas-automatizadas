Feature: Creación de tag

@user1 @web
Scenario: T2 - Creación de tag con caracteres especiales
    Given The login page
        And I sign-in with "<email>" and "<password>"
        And I wait for the dashboard
        And I navigate to tags page
        And I select create New Tag
    When I create the tag name "$string_1"
        And I create the tag description "$$string_1"
        And I click on the save Tag
    Then I navigate to tags page
        And I should see the tag "$$string_1"

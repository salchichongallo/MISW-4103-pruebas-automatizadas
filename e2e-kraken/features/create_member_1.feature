Feature: Member creation

@user1 @web
Scenario: CREAMEM1 - Member is created properly
  Given The login page
    And I sign-in with "<email>" and "<password>"
    And I wait for the dashboard
  When I navigate to members page
    And I click on new member
    And I set the member name to "$name_1"
    And I set the member email to "$email_2"
    And I create the member
  Then I navigate to members page
    And I should see the member name "$$name_1" on the list
    And I should see the member email "$$email_2" on the list

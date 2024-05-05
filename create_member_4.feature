Feature: Member creation

@user2 @web
Scenario: CREAMEM4 - Duplicated member cannot be created
  Given The login page
    And I sign-in with "<email>" and "<password>"
    And I wait for the dashboard
    And I navigate to members page
    And I click on new member
    And I set the member email to "$email_1"
    And I create the member
  When I navigate to members page
    And I click on new member
    And I set the member email to "$$email_1"
    And I create the member
  Then I should see a member already exists error message

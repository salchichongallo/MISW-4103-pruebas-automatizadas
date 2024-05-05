Feature: Member creation

@user2 @web
Scenario: CREAMEM2 - Login successful of new member
  Given The login page
    And I sign-in with "<email>" and "<password>"
    And I wait for the dashboard
    And I navigate to members page
    And I click on new member
    And I set the member name to "$name_1"
    And I set the member email to "$email_2"
  When I create the member
    And I open member actions
    And I impersonate the new member
    And I authenticate as the member
    And I open the member account modal
  Then I should see the member name "$$name_1" in the account modal
    And I should see the member email "$$email_2" in the account modal

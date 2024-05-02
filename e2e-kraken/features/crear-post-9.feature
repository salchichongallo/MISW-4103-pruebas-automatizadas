Feature: Crear un Post

@user1 @web
Scenario: Como usuario inicio sesión, ingreso a la sección de Posts, creo un nuevo Post y verifico su creación en el listado de Posts
    Given I am on the Ghost admin panel 
    And I wait for 3 seconds 
    When I enter my email "l.bogotab@uniandes.edu.co"
    And I wait for 1 seconds
    And I enter my password "l.bogotab123"
    And I wait for 1 seconds
    And I click on the login button
    And I wait for 3 seconds
    And I click on the post button
    And I wait for 2 seconds
    And I click on the new post button
    And I wait for 2 seconds
    And I enter the title "Post de prueba"
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
    Then I should see the post "Post de prueba"
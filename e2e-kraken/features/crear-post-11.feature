Feature: Crear un Post

@user1 @web
Scenario: Como usuario inicio sesión, ingreso a la sección de Posts, creo un nuevo Post solo para miembros y validar su publicación solo para miembros
    Given I visit the admin panel
        And I wait for 3 seconds 
        And I login in as admin with "l.bogotab@uniandes.edu.co" and "l.bogotab123"
        And I wait for 1 seconds
        And I click on the post button
        And I wait for 2 seconds
        And I click on the new post button
        And I wait for 2 seconds
        And I enter the title "Members only"
        And I wait for 2 seconds
        And I click on the settings button
        And I wait for 1 seconds
        And I select the Members only option
        And I wait for 1 seconds
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
        And I click the post "Members only"
        And I wait for 2 seconds
        And I click on the settings button
        And I wait for 1 seconds
        And I click on the View post link
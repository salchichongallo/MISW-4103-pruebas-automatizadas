// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
let stepIndex = 1;
Cypress.Commands.add('step', stepName => {
  const test = Cypress.mocha.getRunner().suite.ctx.test;
  const parent = test.parent ? test.parent.title : '';
  const name = `${parent}---${stepIndex}---${stepName}`;
  cy.screenshot(name, {
    capture: 'viewport',
    disableTimersAndAnimations: false,
    overwrite: true,
    scale: false,
    onAfterScreenshot() {
      stepIndex += 1;
    },
  });
});
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

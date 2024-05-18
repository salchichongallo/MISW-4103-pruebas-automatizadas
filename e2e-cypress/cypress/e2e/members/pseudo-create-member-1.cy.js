import { CreateMember1Steps } from './steps-definition/create-member-1-steps';
import { PseudoMemberProvider } from './src/pseudo-member-provider';

/** @type {CreateMember1Steps} */
let pseudoStepsDefinition;

beforeEach(() => {
  cy.wrap('load data').then(async () => {
    const provider = new PseudoMemberProvider();
    pseudoStepsDefinition = await CreateMember1Steps.prepare(provider);
  });
});

it('PRIORI::CREAMEM1 - Member is created properly', () =>
  pseudoStepsDefinition.run());

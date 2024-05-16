import { CreateMember1Steps } from './steps-definition/create-member-1-steps';
import { RandomMemberProvider } from './src/random-member-provider';

/** @type {CreateMember1Steps} */
let stepsDefinition;

beforeEach(() => {
  cy.wrap('load data').then(async () => {
    const provider = new RandomMemberProvider();
    stepsDefinition = await CreateMember1Steps.prepare(provider);
  });
});

it('RANDOM::CREAMEM1 - Member is created properly', () =>
  stepsDefinition.run());

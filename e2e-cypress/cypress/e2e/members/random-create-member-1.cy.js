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

it('RANDOM::CREAMEM2 - Member is created properly', () =>
  stepsDefinition.run());

it('RANDOM::CREAMEM3 - Member is created properly', () =>
  stepsDefinition.run());

it('RANDOM::CREAMEM4 - Member is created properly', () =>
  stepsDefinition.run());

it('RANDOM::CREAMEM5 - Member is created properly', () =>
  stepsDefinition.run());

it('RANDOM::CREAMEM6 - Member is created properly', () =>
  stepsDefinition.run());

it('RANDOM::CREAMEM7 - Member is created properly', () =>
  stepsDefinition.run());

it('RANDOM::CREAMEM8 - Member is created properly', () =>
  stepsDefinition.run());

it('RANDOM::CREAMEM9 - Member is created properly', () =>
  stepsDefinition.run());

it('RANDOM::CREAMEM10 - Member is created properly', () =>
  stepsDefinition.run());

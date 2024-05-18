import { CreateMember1Steps } from './steps-definition/create-member-1-steps';
import { PrioriMemberProvider } from './src/priori-member-provider';

/** @type {CreateMember1Steps} */
let prioriStepsDefinition;

beforeEach(() => {
  cy.wrap('load data').then(async () => {
    const provider = new PrioriMemberProvider();
    prioriStepsDefinition = await CreateMember1Steps.prepare(provider);
  });
});

it('PRIORI::CREAMEM1 - Member is created properly', () =>
  prioriStepsDefinition.run());

it('PRIORI::CREAMEM2 - Member is created properly', () =>
  prioriStepsDefinition.run());

it('PRIORI::CREAMEM3 - Member is created properly', () =>
  prioriStepsDefinition.run());

it('PRIORI::CREAMEM4 - Member is created properly', () =>
  prioriStepsDefinition.run());

it('PRIORI::CREAMEM5 - Member is created properly', () =>
  prioriStepsDefinition.run());

it('PRIORI::CREAMEM6 - Member is created properly', () =>
  prioriStepsDefinition.run());

it('PRIORI::CREAMEM7 - Member is created properly', () =>
  prioriStepsDefinition.run());

it('PRIORI::CREAMEM8 - Member is created properly', () =>
  prioriStepsDefinition.run());

it('PRIORI::CREAMEM9 - Member is created properly', () =>
  prioriStepsDefinition.run());

it('PRIORI::CREAMEM10 - Member is created properly', () =>
  prioriStepsDefinition.run());

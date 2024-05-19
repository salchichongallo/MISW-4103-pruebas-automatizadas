import { RandomMemberProvider } from './src/random-member-provider';
import { PrioriMemberProvider } from './src/priori-member-provider';
import { PseudoMemberProvider } from './src/pseudo-member-provider';
import { CreateMember1Steps } from './src/create-member-steps';

const runScenarioSteps = member =>
  CreateMember1Steps.givenTheLoginPage()
    .andISignIn()
    .andIWaitForTheDashboard()
    .whenINavigateToMembersPage()
    .andIClickOnNewMember()
    .andFillEmail(member.email)
    .andFillNote(member.note)
    .andIClickCreate()
    .thenINavigateToMembersPage()
    .thenIShouldSeeMemberEmailInList(member.email);

const runScenario = member => () =>
  cy.wrap('load member').then(async () => runScenarioSteps(await member));

it(
  'CREAMEM::7::RANDOM - Longitud máxima de nota',
  runScenario(RandomMemberProvider.getMember({ maxNote: true })),
);

it(
  'CREAMEM::7::PRIORI - Longitud máxima de nota',
  runScenario(PrioriMemberProvider.getMember({ maxNote: true })),
);

it(
  'CREAMEM::7::PSEUDO - Longitud máxima de nota',
  runScenario(PseudoMemberProvider.getMember({ maxNote: true })),
);

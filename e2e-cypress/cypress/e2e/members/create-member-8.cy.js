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
    .andFillNote(member.note + '1')
    .andIClickCreate()
    .thenIShouldSeeNoteTooLongError(member.email);

const runScenario = member => () =>
  cy.wrap('load member').then(async () => runScenarioSteps(await member));

it(
  'CREAMEM::8::RANDOM - Nota demasiado larga',
  runScenario(RandomMemberProvider.getMember({ maxNote: true })),
);

it(
  'CREAMEM::8::PRIORI - Nota demasiado larga',
  runScenario(PrioriMemberProvider.getMember({ maxNote: true })),
);

it(
  'CREAMEM::8::PSEUDO - Nota demasiado larga',
  runScenario(PseudoMemberProvider.getMember({ maxNote: true })),
);

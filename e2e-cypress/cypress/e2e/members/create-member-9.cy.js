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
    .andIClickCreate()
    .thenIShouldSeeEmailInvalidError();

const runScenario = member => () =>
  cy.wrap('load member').then(async () => runScenarioSteps(await member));

it(
  'CREAMEM::9::RANDOM - Correo demasiado largo',
  runScenario(RandomMemberProvider.getMember({ longEmail: true })),
);

it(
  'CREAMEM::9::PRIORI - Correo demasiado largo',
  runScenario(PrioriMemberProvider.getMember({ longEmail: true })),
);

it(
  'CREAMEM::9::PSEUDO - Correo demasiado largo',
  runScenario(PseudoMemberProvider.getMember({ longEmail: true })),
);

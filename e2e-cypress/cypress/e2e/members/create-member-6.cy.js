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
  'CREAMEM::6::RANDOM - Correo no válido',
  runScenario(RandomMemberProvider.getMember({ invalidEmail: true })),
);

it(
  'CREAMEM::6::PRIORI - Correo no válido',
  runScenario(PrioriMemberProvider.getMember({ invalidEmail: true })),
);

it(
  'CREAMEM::6::PSEUDO - Correo no válido',
  runScenario(PseudoMemberProvider.getMember({ invalidEmail: true })),
);

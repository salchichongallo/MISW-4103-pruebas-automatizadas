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
    .thenINavigateToMembersPage()
    .thenIShouldSeeMemberEmailInList(member.email);

const runScenario = member => () =>
  cy.wrap('load member').then(async () => runScenarioSteps(await member));

it(
  'CREAMEM::3::RANDOM - Miembro creado con solo el correo',
  runScenario(RandomMemberProvider.getMember()),
);

it(
  'CREAMEM::3::PRIORI - Miembro creado con solo el correo',
  runScenario(PrioriMemberProvider.getMember()),
);

it(
  'CREAMEM::3::PSEUDO - Miembro creado con solo el correo',
  runScenario(PseudoMemberProvider.getMember()),
);

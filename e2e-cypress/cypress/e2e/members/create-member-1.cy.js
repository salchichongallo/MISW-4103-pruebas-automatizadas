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
    .andFillTheMemberForm(member)
    .andIClickCreate()
    .thenINavigateToMembersPage()
    .thenIShouldSeeTheMemberOnTheList(member);

const runScenario = member => () =>
  cy.wrap('load member').then(async () => runScenarioSteps(await member));

it(
  'CREAMEM::1::RANDOM - Miembro creado con todos los campos',
  runScenario(RandomMemberProvider.getMember()),
);

it(
  'CREAMEM::1::PRIORI - Miembro creado con todos los campos',
  runScenario(PrioriMemberProvider.getMember()),
);

it(
  'CREAMEM::1::PSEUDO - Miembro creado con todos los campos',
  runScenario(PseudoMemberProvider.getMember()),
);

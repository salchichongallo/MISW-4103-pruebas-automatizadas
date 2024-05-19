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
    .andIClickOnNewMember()
    .andFillEmail(member.email)
    .andIClickCreate()
    .thenIShouldSeeMemAlreadyExistsError(member.email)
    .thenICancelCreation()
    .thenIDeleteMember(member.email);

const runScenario = member => () =>
  cy.wrap('load member').then(async () => runScenarioSteps(await member));

it(
  'CREAMEM::4::RANDOM - Miembro ya existe',
  runScenario(RandomMemberProvider.getMember()),
);

it(
  'CREAMEM::4::PRIORI - Miembro ya existe',
  runScenario(PrioriMemberProvider.getMember()),
);

it(
  'CREAMEM::4::PSEUDO - Miembro ya existe',
  runScenario(PseudoMemberProvider.getMember()),
);

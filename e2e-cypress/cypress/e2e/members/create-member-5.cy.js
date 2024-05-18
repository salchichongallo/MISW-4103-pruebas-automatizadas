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
    .andFillTheMemberForm(member, { screenshot: true })
    .andIClickCreate()
    .thenINavigateToMembersPage()
    .thenIShouldSeeTheMemberOnTheList(member);

const runScenario = member => () =>
  cy.wrap('load member').then(async () => runScenarioSteps(await member));

describe('CREAMEM::5', () => {
  it(
    'CREAMEM::5::RANDOM - Nombre demasiado largo',
    runScenario(RandomMemberProvider.getMember({ longName: true })),
  );

  it(
    'CREAMEM::5::PRIORI - Nombre demasiado largo',
    runScenario(PrioriMemberProvider.getMember({ longName: true })),
  );

  it(
    'CREAMEM::5::PSEUDO - Nombre demasiado largo',
    runScenario(PseudoMemberProvider.getMember({ longName: true })),
  );
});

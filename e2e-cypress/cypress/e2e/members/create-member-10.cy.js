import { PrioriMemberProvider } from './src/priori-member-provider';
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
    .thenIEditMember(member.email)
    .andFillNote(' '.repeat(501))
    .thenIShouldSeeNoteUsageOf(501, { screenshot: true })
    .andIClickCreate()
    .thenNoteIsEmpty();

const runScenario = member => () =>
  cy.wrap('load member').then(async () => runScenarioSteps(await member));

describe('CREAMEM::10', () => {
  it(
    'CREAMEM::10::PRIORI - Nota en blanco superada valida pero deja guardar',
    runScenario(PrioriMemberProvider.getMember()),
  );
});

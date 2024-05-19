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
    .andFillLabels(member.labels)
    .andFillEmail(member.email)
    .andFillName(member.name)
    .andIClickCreate()
    .thenIShouldSeeNameErrorMessage();

const runScenario = member => () =>
  cy.wrap('load member').then(async () => runScenarioSteps(await member));

describe('CREAMEM::11', () => {
  it(
    'CREAMEM::11::RANDOM - Label demasiado largo no permite guardar miembro con nombre',
    runScenario(RandomMemberProvider.getMember({ longLabel: true })),
  );

  it(
    'CREAMEM::11::PRIORI - Label demasiado largo no permite guardar miembro con nombre',
    runScenario(PrioriMemberProvider.getMember({ longLabel: true })),
  );

  it(
    'CREAMEM::11::PSEUDO - Label demasiado largo no permite guardar miembro con nombre',
    runScenario(PseudoMemberProvider.getMember({ longLabel: true })),
  );
});

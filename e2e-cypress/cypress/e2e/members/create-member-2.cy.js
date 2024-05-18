import { CreateMember1Steps } from './src/create-member-steps';

it('CREAMEM::2::PRIORI - Formulario vacío no crea el miembro', () => {
  CreateMember1Steps.givenTheLoginPage()
    .andISignIn()
    .andIWaitForTheDashboard()
    .whenINavigateToMembersPage()
    .andIClickOnNewMember()
    .andIClickCreate()
    .thenIShouldSeeTheSaveFailureButton()
    .thenIShouldSeeEmailRequiredError();
});

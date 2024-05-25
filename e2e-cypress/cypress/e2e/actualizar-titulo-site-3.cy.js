import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';
import { SettingsPage } from './pages/settings-page';


describe('Insertar titulo vacio en configuracion', () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();
  const profilePage = new SettingsPage();

  beforeEach(() => {
    loginPage.visit();
    loginPage.fillEmail(Cypress.env('email'));
    loginPage.fillPassword(Cypress.env('password'));
    loginPage.submit();
    dashboardPage.waitFor();
  });

  it(`When I visit the Ghost page, l
  og in with email and password,
  go to settings,
  select title & description,
  and i edit title with an empty string,
  when i click on send,
  then I should see void ttile`, () => {
    profilePage.visit();
    profilePage.editButtonTitle();
    profilePage.fillSiteTitle(" ");
    profilePage.saveButtonTitle();
    profilePage.isEmptyTitle();
  });
});

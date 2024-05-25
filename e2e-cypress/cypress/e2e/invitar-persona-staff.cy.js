import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/dashboard-page';
import { SettingsPage } from './pages/settings-page';
import { faker } from '@faker-js/faker';

describe('Staff invitation process', () => {
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
  select staff,
  enter an invitation email invalid,
  when i send the invitation,
  then I should see a message: Please enter a valid email address.`, () => {
    profilePage.visit();
    profilePage.clickInvitePeople();
    profilePage.fillEmail(faker.string.uuid());
    profilePage.clickSendInvitation();
    profilePage.alertMessageStaff()
  });
});

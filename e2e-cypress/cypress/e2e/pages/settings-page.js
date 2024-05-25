export class SettingsPage {
    elements = {
        viewProfileButton: () => cy.get('button[type="button"].ml-2.inline-block.text-sm.font-bold.text-green').contains('View profile'),
        Element: () => cy.get('div.text-white.inline-flex.items-center.justify-center.rounded-full.p-2.font-semibold.w-12.h-12.text-xl.undefined'),
        locationField: () => cy.get('label').contains('Location').parent().find('input'),
        websiteField: () => cy.get('label').contains('Website').parent().find('input'),
        facebookField: () => cy.get('label').contains('Facebook profile').parent().find('input'),
        xField: () => cy.get('label').contains('X (formerly Twitter) profile').parent().find('input'),
        bioField: () => cy.get('label').contains('Bio').parent().find('textarea'),
        saveAndCloseButton: () => cy.get('button[type="button"]').contains('Save & close'),
        alertMessage: () => cy.contains("Can't save user, please double check that you've filled all mandatory fields."),
        alertMessageDescrption: () => cy.contains("ValidationError: Value in [settings.description] exceeds maximum length of 200 characters."),
        alertMessageTitle: () => cy.contains("ValidationError: Value in [settings.title] exceeds maximum length of 150 characters."),
        alertMessageFacebook: () => cy.contains("The URL must be in a format like https://www.facebook.com/yourPage"),
        alertMessageX: () => cy.contains("Your Username is not a valid Twitter Username"),
        alertMessageNewsletters: () => cy.contains("Value in [newsletters.name] exceeds maximum length of 191 characters. newsletters.name"),

        editButtonTitle: () => cy.get('[data-testid="title-and-description"]').contains('button', 'Edit'),
        siteTitleField: () => cy.get('label').contains('Site title').parent().find('input'),
        siteDescriptionField: () => cy.get('label').contains('Site description').parent().find('input'),
        saveButtonTitle: () => cy.get('[data-testid="title-and-description"]').contains('button', 'Save'),
        titleIsEmpty: () => cy.contains('h6', 'Site title').next().should('have.text', ' '),

        editButtonLanguage: () => cy.get('[data-testid="publication-language"]').contains('button', 'Edit'),
        siteLanguageField: () => cy.get('label').contains('Site language').parent().find('input'),
        saveButtonLanguage: () => cy.get('[data-testid="publication-language"]').contains('button', 'Save'),

        editButtonSocial: () => cy.get('[data-testid="social-accounts"]').contains('button', 'Edit'),
        siteSocialFacebookField: () => cy.get('label').contains(`URL of your publication's Facebook Page`).parent().find('input'),
        siteSocialXField: () => cy.get('label').contains('URL of your X (formerly Twitter) profile').parent().find('input'),
        saveButtonSocial: () => cy.get('[data-testid="social-accounts"]').contains('button', 'Save'),

        addButtonNewsletters: () => cy.get('[data-testid="newsletters"]').contains('button', 'Add newsletter'),
        siteNameNewsletters: () => cy.get('label').contains(`Name`).parent().find('input'),
        siteDescriptionNewsletters: () => cy.get('label').contains(`Description`).parent().find('textarea'),
        saveButtonNewsletters: () => cy.contains('button', 'Create'),
        closButtonNewsletters: () => cy.contains('button', 'Close'),

        invitePeopleButton: () => cy.contains('button', 'Invite people'),
        emailAddressField: () => cy.get('label').contains('Email address').parent().find('input'),
        sendInvitationButton: () => cy.contains('button', 'Send invitation now'),
        alertMessageError: () => cy.contains('Please enter a valid email address.'),



    }

    visit() {
        cy.visit('/ghost/#/settings/staff/');
        cy.wait(1000);
    }

    clickViewProfile() {
        this.elements.viewProfileButton().click();
        cy.wait(1000);
    }

    clickElement() {
        this.elements.Element().click();
    }

    fillLocation(location) {
        this.elements.locationField().clear().type(location);
    }

    fillWebsite(website) {
        this.elements.websiteField().clear().type(website);
    }

    fillFacebook(facebook) {
        this.elements.facebookField().clear().type(facebook);
    }

    fillX(x) {
        this.elements.xField().clear().type(x);
    }

    fillBio(bio) {
        this.elements.bioField().clear().type(bio);
    }

    saveAndClose() {
        this.elements.saveAndCloseButton().click();
    }

    alertMessage() {
        this.elements.alertMessage().should('be.visible');
    }

    editButtonTitle() {
        this.elements.editButtonTitle().click();
    }

    fillSiteTitle(siteTitle) {
        this.elements.siteTitleField().clear().type(siteTitle);
    }

    fillSiteDescription(siteDescription) {
        this.elements.siteDescriptionField().clear().type(siteDescription);
    }

    saveButtonTitle() {
        this.elements.saveButtonTitle().click();
    }

    alertMessageDescrption() {
        this.elements.alertMessageDescrption().should('be.visible');
    }

    alertMessageTitle() {
        this.elements.alertMessageTitle().should('be.visible');
    }

    editButtonLanguage() {
        this.elements.editButtonLanguage().click();
    }

    fillSiteLanguage(siteLanguage) {
        this.elements.siteLanguageField().clear().type(siteLanguage);
    }

    saveButtonLanguage() {
        this.elements.saveButtonLanguage().click();
    }

    editButtonSocial() {
        this.elements.editButtonSocial().click();
    }

    fillSiteSocialFacebook(siteSocialFacebook) {
        this.elements.siteSocialFacebookField().clear().type(siteSocialFacebook);
    }

    fillSiteSocialX(siteSocialX) {
        this.elements.siteSocialXField().clear().type(siteSocialX);
    }

    saveButtonSocial() {
        this.elements.saveButtonSocial().click();
    }

    alertMessageFacebook() {
        this.elements.alertMessageFacebook().should('be.visible');
    }

    alertMessageX() {
        this.elements.alertMessageX().should('be.visible');
    }

    addButtonNewsletters() {
        this.elements.addButtonNewsletters().click();
        cy.wait(1000);
    }

    fillSiteNameNewsletters(siteNameNewsletters) {
        this.elements.siteNameNewsletters().clear().type(siteNameNewsletters);
    }

    fillSiteDescriptionNewsletters(siteDescriptionNewsletters) {
        this.elements.siteDescriptionNewsletters().clear().type(siteDescriptionNewsletters);
    }

    saveButtonNewsletters() {
        this.elements.saveButtonNewsletters().click();
    }

    alertMessageNewsletters() {
        this.elements.alertMessageNewsletters().should('be.visible');
    }

    closButtonNewsletters() {
        this.elements.closButtonNewsletters().click();
    }

    clickInvitePeople() {
      this.elements.invitePeopleButton().click();
      cy.wait(1000);
    }

    fillEmail(email) {
      this.elements.emailAddressField().clear().type(email);
      cy.wait(1000);
  }
  clickSendInvitation() {
    this.elements.sendInvitationButton().click();
    cy.wait(1000);
}

  alertMessageStaff() {
    this.elements.alertMessageError().should('be.visible');
  }

  isEmptyTitle() {
    this.elements.titleIsEmpty();
  }

}

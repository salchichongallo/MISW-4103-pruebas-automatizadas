const GhostPage = require('./ghost-page');

class MemberAccountModal extends GhostPage {
  async getName() {
    return this.driver.$('.account-home .gh-portal-list-detail h3');
  }

  async getEmail() {
    return this.driver.$('.account-home .gh-portal-list-detail p');
  }
}

module.exports = MemberAccountModal;

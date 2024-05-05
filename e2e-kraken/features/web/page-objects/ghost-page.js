class GhostPage {
  constructor(world) {
    /** @type {import('webdriverio').Browser<async>} driver */
    this.driver = world.driver;
  }
}

module.exports = GhostPage;

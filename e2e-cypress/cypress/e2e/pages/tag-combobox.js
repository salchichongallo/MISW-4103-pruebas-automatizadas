export class TagCombobox {
  select(tagName) {
    cy.get('#tag-input input')
      .type(tagName)
      .then($input => {
        const dropdownId = $input.attr('aria-controls');
        const options = cy.wrap($input).get(`#${dropdownId} li`);
        options.first().click();
      });
  }
}

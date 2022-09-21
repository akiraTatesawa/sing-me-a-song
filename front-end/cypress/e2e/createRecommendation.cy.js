/* eslint-disable no-undef */

describe("empty spec", () => {
  it("Should be able to create a test", () => {
    cy.visit("http://localhost:3000");

    cy.get("[data-cy='name-input']").type("Ado 2");
  });
});

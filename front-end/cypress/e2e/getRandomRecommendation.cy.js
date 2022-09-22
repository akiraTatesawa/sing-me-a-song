/* eslint-disable no-undef */

describe("Random Recommendation", () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it("Should be able to navigate to random recommendation page", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-cy='random']").click();

    cy.url().should("equal", "http://localhost:3000/random");
  });

  it("Should be able to get a random recommendation", () => {
    cy.createRecommendation().then(() => {
      cy.visit("http://localhost:3000/random");

      cy.intercept("GET", "/recommendations/random").as(
        "getRandomRecommendation"
      );

      cy.wait("@getRandomRecommendation");

      cy.get("[data-cy='recommendation-name']").should("be.visible");
    });
  });
});

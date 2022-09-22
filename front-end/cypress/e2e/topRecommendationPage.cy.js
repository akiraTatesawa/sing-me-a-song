/* eslint-disable no-undef */

describe("Top Recommendation Page", () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it("Should be able to navigate to top recommendation page from homepage", () => {
    cy.visit("http://localhost:3000/");

    cy.get("[data-cy='top']").click();

    cy.url().should("equal", "http://localhost:3000/top");
  });

  it("Should be able to navigate to top recommendation page from random page", () => {
    cy.visit("http://localhost:3000/random");

    cy.get("[data-cy='top']").click();

    cy.url().should("equal", "http://localhost:3000/top");
  });

  it("Should be able to get a random recommendation", () => {
    cy.createRecommendation().then(() => {
      cy.visit("http://localhost:3000/top");

      cy.intercept("GET", "/recommendations/top/10").as("getTopRecommendation");

      cy.wait("@getTopRecommendation");

      cy.get("[data-cy='recommendation-name']").should("be.visible");
    });
  });

  it("Should show 'No recommendations yet!' message if there is no recommendations", () => {
    cy.intercept("GET", "/recommendations/top/10").as("getTopRecommendation");

    cy.visit("http://localhost:3000/top");

    cy.wait("@getTopRecommendation");

    cy.get("[data-cy='no-recommendations']").should(($div) => {
      expect($div).to.contain("No recommendations yet! Create your own :)");
    });
  });
});

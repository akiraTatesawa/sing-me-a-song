/* eslint-disable no-undef */

describe("Downvote Recommendation", () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it("Should be able to downvote a recommendation on homepage", () => {
    cy.visit("http://localhost:3000");

    cy.createRecommendation().then((recommendation) => {
      cy.intercept("GET", "/recommendations").as("refreshRecommendations");

      cy.wait("@refreshRecommendations");

      cy.contains(recommendation.name).get("[data-cy='downvote']").click();

      cy.get("[data-cy='score']").should(($span) => {
        expect($span).to.contain("-1");
      });
    });
  });

  it("Should be able to downvote a recommendation on top page", () => {
    cy.visit("http://localhost:3000/top");

    cy.createRecommendation().then((recommendation) => {
      cy.intercept("GET", "/recommendations/top/10").as(
        "refreshRecommendations"
      );

      cy.wait("@refreshRecommendations");

      cy.contains(recommendation.name).get("[data-cy='downvote']").click();

      cy.get("[data-cy='score']").should(($span) => {
        expect($span).to.contain("-1");
      });
    });
  });

  it("Should be able to downvote a recommendation on random page", () => {
    cy.visit("http://localhost:3000/random");

    cy.createRecommendation().then((recommendation) => {
      cy.intercept("GET", "/recommendations/random").as(
        "refreshRecommendations"
      );

      cy.wait("@refreshRecommendations");

      cy.contains(recommendation.name).get("[data-cy='downvote']").click();

      cy.get("[data-cy='score']").should(($span) => {
        expect($span).to.contain("-1");
      });
    });
  });
});

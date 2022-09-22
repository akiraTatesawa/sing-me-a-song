/* eslint-disable no-undef */

describe("Upvote Recommendation", () => {
  it("Should be able to upvote a recommendation on homepage", () => {
    cy.visit("http://localhost:3000");

    cy.createRecommendation().then((recommendation) => {
      cy.intercept("GET", "/recommendations").as("refreshRecommendations");

      cy.wait("@refreshRecommendations");

      cy.contains(recommendation.name).get("[data-cy='upvote']").click();

      cy.get("[data-cy='score']").should(($span) => {
        expect($span).to.contain("1");
      });
    });
  });
  // it.todo("Should be able to upvote a recommendation on top page");
  //   it.todo("Should be able to upvote a recommendation on random page");
});

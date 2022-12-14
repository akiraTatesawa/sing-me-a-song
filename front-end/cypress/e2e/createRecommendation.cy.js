/* eslint-disable no-undef */

import { randGitBranch, randVerb } from "@ngneat/falso";

describe("Create Recommendation", () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it("Should be able to create a test", () => {
    const recommendation = {
      name: randGitBranch(),
      youtubeLink: `https://www.youtube.com/${randVerb()}`,
    };

    cy.visit("http://localhost:3000");

    cy.get("[data-cy='name-input']").type(recommendation.name);
    cy.get("[data-cy='youtube-link-input']").type(recommendation.youtubeLink);

    cy.intercept("POST", "/recommendations").as("createRecommendation");

    cy.get("[data-cy='submit-recommendation']").click();

    cy.wait("@createRecommendation");

    cy.url().should("equal", "http://localhost:3000/");
  });

  it("Should not be able to create a recommendation with a non-unique name", () => {
    cy.visit("http://localhost:3000");

    cy.createRecommendation().then((recommendation) => {
      cy.get("[data-cy='name-input']").type(recommendation.name);
      cy.get("[data-cy='youtube-link-input']").type(recommendation.youtubeLink);

      cy.intercept("POST", "/recommendations").as("createRecommendation");

      cy.get("[data-cy='submit-recommendation']").click();

      cy.wait("@createRecommendation");

      cy.on("window:alert", (str) => {
        expect(str).to.equal(`Error creating recommendation!`);
      });
    });
  });

  it("Should not be able to create a recommendation with invalid youtube link", () => {
    cy.visit("http://localhost:3000");

    const invalidRecommendation = {
      name: randGitBranch(),
      youtubeLink: "http://invalid.com",
    };

    cy.get("[data-cy='name-input']").type(invalidRecommendation.name);
    cy.get("[data-cy='youtube-link-input']").type(
      invalidRecommendation.youtubeLink
    );

    cy.intercept("POST", "/recommendations").as("createRecommendation");

    cy.get("[data-cy='submit-recommendation']").click();

    cy.wait("@createRecommendation");

    cy.on("window:alert", (str) => {
      expect(str).to.equal(`Error creating recommendation!`);
    });
  });
});

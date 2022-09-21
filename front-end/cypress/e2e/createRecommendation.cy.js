/* eslint-disable no-undef */

import { randGitBranch, randVerb } from "@ngneat/falso";

describe("Create Recommendation", () => {
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

    cy.contains(recommendation.name).should("be.visible");
  });
});

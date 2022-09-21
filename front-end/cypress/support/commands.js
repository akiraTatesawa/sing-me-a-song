/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import { randGitBranch, randVerb } from "@ngneat/falso";

Cypress.Commands.add("createRecommendation", () => {
  const recommendation = {
    name: randGitBranch(),
    youtubeLink: `https://www.youtube.com/${randVerb()}`,
  };

  cy.request({
    method: "POST",
    url: "http://localhost:4000/recommendations",
    body: recommendation,
    failOnStatusCode: false,
  }).then((res) => cy.wrap(JSON.parse(res.requestBody)));
});

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

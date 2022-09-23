/* eslint-disable no-undef */

import { randVehicle } from "@ngneat/falso";

describe("Top Recommendation Page", () => {
  beforeEach(() => {
    cy.resetDatabase();
  });

  it('Should render "Not Found!" message if the page does not exist', () => {
    cy.visit(`http://localhost:3000/${randVehicle()}`);

    cy.contains("Not found!").should("be.visible");
  });
});

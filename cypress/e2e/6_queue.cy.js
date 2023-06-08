import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  CIRCLE,
  CIRCLE_BOX,
  DEFAULT_STATE,
  CHANGING_STATE,
  SUBMIT_BUTTON,
  RESET_BUTTON,
  BUTTON,
} from "../constant/constant";

describe("Страница очередь работает корректно", function () {
  beforeEach(function () {
    cy.visit("/");
    cy.get("[href='/queue']").click();
    cy.location("pathname").should("eq", "/queue");
  });
  it("Кнопки выкл при пустом инпуте", function () {
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("input").clear();
    cy.get("button").eq(1).should("be.disabled");
    cy.get("button").eq(2).should("be.disabled");
    cy.get("button").eq(3).should("be.disabled");
  });

  it("Добавление эл-та работает корректно", function () {
    for (let i = 1; i < 4; i++) {
      cy.get("input").type(i);
      cy.get("button").eq(1).should("be.enabled").click();
      cy.get('[class^="queue-page_list"]')
        .find(CIRCLE_BOX)
        .find(CIRCLE)
        .as("allCircle");

      cy.get("@allCircle").should(async ($allCircle) => {
        expect($allCircle[i - 1]).to.have.css("border", CHANGING_STATE);

        await new Cypress.Promise((resolve) =>
          setTimeout(resolve, SHORT_DELAY_IN_MS)
        );

        expect($allCircle[i - 1]).to.contain(i);
        expect($allCircle[i - 1]).to.have.css("border", DEFAULT_STATE);
      });

      cy.get('[class^="queue-page_list"]')
        .find(CIRCLE_BOX)
        .eq(0)
        .should("contain", "head");

      cy.get('[class^="queue-page_list"]')
        .find(CIRCLE_BOX)
        .eq(i - 1)
        .should("contain", "tail");
    }
  });

  it("Удаление эл-та работает корректно", function () {
    for (let i = 1; i < 4; i++) {
      cy.get("input[type='text']").type(i);
      cy.get(SUBMIT_BUTTON).should("not.be.disabled").click();
      cy.wait(2000);
    }
   
    cy.get(`${BUTTON}[class^="text"]`).should("not.be.disabled").click();
    cy.get('[class^="queue-page_list"]')
      .find(CIRCLE_BOX)
      .find(CIRCLE)
      .as("allCircle");

    cy.get("@allCircle").should(async ($allCircle) => {
      expect($allCircle[0]).to.have.css("border", CHANGING_STATE);

      await new Cypress.Promise((resolve) =>
        setTimeout(resolve, SHORT_DELAY_IN_MS)
      );

      expect($allCircle[0]).to.contain("");
    });

    cy.get('[class^="queue-page_list"]')
      .find(CIRCLE_BOX)
      .eq(1)
      .should("contain", "head");
  });

  it("Очистка очереди работает корректно", function () {
    for (let i = 1; i < 4; i++) {
      cy.get("input").type(i);
      cy.get(SUBMIT_BUTTON).should("not.be.disabled").click();
      cy.wait(SHORT_DELAY_IN_MS);
    }

    cy.get(RESET_BUTTON).should("not.be.disabled").click();

    cy.get('[class^="queue-page_list"]')
      .find(CIRCLE_BOX)
      .find(CIRCLE)
      .as("allCircle");

    cy.get("@allCircle").should("contain", "");
  });
});

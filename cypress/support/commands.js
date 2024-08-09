// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
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

// -- My first Custom command
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    const text = "Help text";
    cy.get('input#firstName').type('Lucas', {delay:0});
    cy.get('input#lastName').type('Mateus', {delay:0});
    cy.get('input#email').type('lucas_email@domain.com', {delay:0});
    cy.get('#open-text-area').type(text, {delay:0});
    cy.contains('button', 'Enviar').click();
})
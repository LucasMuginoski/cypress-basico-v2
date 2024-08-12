/// <reference types="Cypress" />

describe('Testa a página de política de privacidade', function(){
    
    this.beforeEach(function() {
        cy.visit('./src/privacy.html');
    })

    it('Testa a página de privacidade de forma independente', function(){
        cy.get('#title').should('be.visible')
        cy.get('#title').should('have.text', "CAC TAT - Política de privacidade");
    })
})
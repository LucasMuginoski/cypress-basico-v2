/// <reference types="Cypress" />

describe('Central de atendimento ao cliente TAT', function(){

    this.beforeEach(function() {
        cy.visit('./src/index.html');
    })

    it('Verifica o título da aplicação', function(){
        cy.title().should('eq','Central de Atendimento ao Cliente TAT');
    })

    it('Preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('input#firstName').type('Lucas');
        cy.get('input#lastName').type('Mateus');
        cy.get('input#email').type('lucas_email@domain.com');
        cy.get('#open-text-area').type('Help text');
        cy.get('button.button').click();

        //verificações
        cy.get('.success strong').should('be.visible');
    })
    //extras
    it('Preenche os campos obrigatórios com delay zerado e envia o formulário', function(){
        const longText = "Help text Help text Help text Help text Help text Help text Help text Help text Help text Help text Help text Help text Help text Help text Help text Help text Help text Help text Help text Help text Help text";
        cy.get('input#firstName').type('Lucas', {delay:0});
        cy.get('input#lastName').type('Mateus', {delay:0});
        cy.get('input#email').type('lucas_email@domain.com', {delay:0});
        cy.get('#open-text-area').type(longText, {delay:0});
        cy.get('button.button').click();

        //verificações
        cy.get('.success strong').should('be.visible');
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('input#firstName').type('Lucas', {delay:0});
        cy.get('input#lastName').type('Mateus', {delay:0});
        cy.get('input#email').type('lucas_email@domain,com', {delay:0});
        cy.get('#open-text-area').type('Help text', {delay:0});
        cy.get('button.button').click();

        //verificações
        cy.get('.error strong').should('be.visible');
    })
    it('Validar campo telefone continua vazio quando preenchido com valor não numerico', function(){
        cy.get('input#phone')
            .type('abcdefghij')
            .should('have.value', '');
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('input#firstName').type('Lucas', {delay:0});
        cy.get('input#lastName').type('Mateus', {delay:0});
        cy.get('input#email').type('lucas_email@domain.com', {delay:0});

        cy.get('#phone-checkbox').click();

        cy.get('#open-text-area').type('Help text', {delay:0});
        cy.get('button.button').click();

        //verificações
        cy.get('.error strong').should('be.visible');
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('input#firstName').type('Lucas', {delay:0}).should('have.value', 'Lucas')
            .clear().should('have.value', '');

        cy.get('input#lastName').type('Mateus', {delay:0}).should('have.value', 'Mateus')
            .clear().should('have.value', '');

        cy.get('input#email').type('lucas_email@domain.com', {delay:0}).should('have.value', 'lucas_email@domain.com')
            .clear().should('have.value', '');

        cy.get('#phone').type('33332222', {delay:0}).should('have.value', '33332222')
            .clear().should('have.value', '');
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button.button').click();

        //verificações
        cy.get('.error strong').should('be.visible');
        cy.get('.error strong').should('have.text', 'Valide os campos obrigatórios!')
    })
    it('Envia formulário com sucesso usando comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit();
        //verificações
        cy.get('.success strong').should('be.visible');
    })
    it('Uso do contains dentro do meu custom command', function(){
        cy.fillMandatoryFieldsAndSubmit();
        //verificações
        cy.get('.success strong').should('be.visible');
    })


})
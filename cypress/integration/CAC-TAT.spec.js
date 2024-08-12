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
    it('Seleciona youtube pelo seu texto', function(){
        cy.get('#product').select('youtube')
            .should('have.value', 'youtube'); //vai no elemento select (tag html, e seleciona o valor "Blog")
        //cy.get('select').select(1); // seleciona pelo indice (começa em 0);
    })
    it('Seleciona um produto (Mentoria) pelo seu valor', function(){
        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria');
    })
    it('Seleciona produto (Blog) pelo seu indice', function(){
        cy.get('#product').select(1) //opcao 'seleicone' = 0 porém ela está desabilitada;
            .should('have.value', 'blog');
    })
    it('Deve marcar o tipo de atendimento "Feedback"', function(){
        cy.get('input[value="feedback"]').check() //opções de seleção é semanticamente mais correto usar check porém click tbm funciona, e também é mais robusto, evita marcar/desmarcar algo de maneira inapropriada
            .should('have.value', 'feedback'); //semanticamente mais correto;
    })
    it('Marca cada tipo de atendimento', function(){
        //seleciona todos, depois usamos o each para percorre 1 a 1 dos elementos (função q recebe cada elemento a cada iteração)
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check();
                cy.wrap($radio).should('be.checked');
            })
    })
    it('Marca ambos os checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check().should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked');
    })
    it('Exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário (usando .check)', function(){
        cy.get('input#firstName').type('Lucas', {delay:0});
        cy.get('input#lastName').type('Mateus', {delay:0});
        cy.get('input#email').type('lucas_email@domain.com', {delay:0});

        cy.get('#phone-checkbox').check(); //mudando de .click() para um .check();

        cy.get('#open-text-area').type('Help text', {delay:0});
        cy.get('button.button').click();

        //verificações
        cy.get('.error strong').should('be.visible');
    })
    it('Seleciona um arquivo da pasta fixture', function(){
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json');
            });
    })
    it('Seleciona um arquivo simulando um drag and drop', function(){
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: "drag-drop"})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json');
            });
    })
    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile');

        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json');
            });
    })
    it('Verifica que a política de privacidade abre em outra aba sem necessidade de um clique', function(){
        //limitação => cypress funcionar apenas em 1 aba. Um dos Tradeoffs do cypress
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank');
    })
    it('Acessa a página de privacidade removendo o atributo target e clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click();
        cy.get('#title').should('have.text', "CAC TAT - Política de privacidade");
    })
    
})
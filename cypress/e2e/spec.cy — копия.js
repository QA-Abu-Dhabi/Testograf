import 'cypress-iframe';

describe('Feedback Form Test - Empty Fields', () => {
  it('should interact with empty fields', () => {
    cy.visit('/');

    cy.get('#ttgraf-33').then((iframedata) => {
      const idata = iframedata.contents().find('body')
      cy.wrap(idata).as('iframe')
    });

    cy.get('@iframe').contains('Форма обратной связи для сайта').should('be.visible');


    cy.iframe('#ttgraf-33').within(() => {
      cy.contains('Форма обратной связи для сайта').should('be.visible');
      // Взаимодействие с пустыми полями
      cy.get('.question.question_107.question_type_1.question___df23e051d300eb092d0d')
        .find('input.control___e16bbac759474cb49f55')
        .should('be.visible').type('Test Name');
      /*cy.get('.question.question_108.question_type_1.question___df23e051d300eb092d0d')
        .find('input.control___e16bbac759474cb49f55')
        .should('be.visible').type('EMail@mail.com');
      cy.get('.question.question_109.question_type_1.question___df23e051d300eb092d0d')
        .find('input.control___e16bbac759474cb49f55')
        .should('be.visible').type('+7 999 56 78 111');
      cy.get('.question.question_56519.question_type_15.question___df23e051d300eb092d0d')
        .find('.dropdown___df511e4c595349c5c308')
        .find('.label___d2136eb582d9c1b93bd8')
        .click();
      cy.get('.item___a66a0ae47d8145dee2ff')
        .contains('Другое')
        .click();
      cy.get('.multiline___cc6bb61529c652f37050').type('Текст тестового сообщения');*/

      // Отправка формы
      //cy.get('.button.button___fd25a2fb454e3f726adc.blue___f42ee3b7578def392092.fluid___b8ec6d1bc6ffd588c6ef').click();

      // Проверка успешной отправки
      //.contains('Благодарим за обращение!').should('be.visible');
    });
  });
});
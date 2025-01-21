// Чтобы включить кросс-доменный доступ iFrame, установим свойство 
// chromeWebSecurity в значение false в файле cypress.config.js
// Для работы с iframe используем плагин cypress-iframe

import 'cypress-iframe';

describe('Feedback Form Test', () => {
  let TestData = null;

  before(() => {
    cy.fixture("TestData").then((data) => {
      TestData = data;
    });
  });

  it('test iframe', () => {
    cy.visit('/');

    // Проверяем, что iframe загружен
    cy.frameLoaded('#ttgraf-33');

    // Переключаемся в контекст iframe
    cy.iframe('#ttgraf-33').within(() => {
      TestData.forEach((data) => {
        // Ввод значений в текстовые поля
        cy.get('.question_107')
          .find('input.control___e16bbac759474cb49f55')
          .should('be.visible').then(($input) => {
            if (data.name == '') {
              cy.wrap($input).clear();
            } else {
              cy.wrap($input).clear().type(data.name);
            }
          });
        cy.get('.question_108')
          .find('input.control___e16bbac759474cb49f55')
          .should('be.visible').then(($input) => {
            if (data.email == '') {
              cy.wrap($input).clear();
            } else {
              cy.wrap($input).clear().type(data.email);
            }
          });
        cy.get('.question_109')
          .find('input.control___e16bbac759474cb49f55')
          .should('be.visible').then(($input) => {
            if (data.phone == '') {
              cy.wrap($input).clear();
            } else {
              cy.wrap($input).clear().type(data.phone);
            }
          });
        if (data.purpose == '') {
          cy.get('.clear___c5a80878fba8fe5a9cc1').click({force: true});
        } else {
          cy.get('.question_56519')
            .find('.dropdown___df511e4c595349c5c308')
            .find('.label___d2136eb582d9c1b93bd8')
            .click();
          cy.get('.item___a66a0ae47d8145dee2ff')
            .contains(data.purpose)
            .click();
        }
        cy.get('.multiline___cc6bb61529c652f37050').then(($input) => {
          if (data.message == '') {
            cy.wrap($input).clear();
          } else {
            cy.wrap($input).clear().type(data.message);
          }
        });
        // Отправка формы
        cy.get('.fluid___b8ec6d1bc6ffd588c6ef').click({force: true});

        // проверяем фактический и ожидаемый результат
        switch (data.expected) {
          case 'nameFailed':
            cy.get('.question.question_107.question_type_1.question___df23e051d300eb092d0d')
              .find('.requiredText___b6919613c3a5622fab86')
              .should('be.visible').and('contain.text', 'Вопрос является обязательным.');
            break;
          case 'emailFailed':
            cy.get('.question.question_108.question_type_1.question___df23e051d300eb092d0d')
              .find('.requiredText___b6919613c3a5622fab86')
              .should('be.visible').and('contain.text', 'Вопрос является обязательным.');
            break;
          case 'purposeFailed':
            cy.get('.question.question_56519.question_type_15.question___df23e051d300eb092d0d')
              .find('.requiredText___b6919613c3a5622fab86')
              .should('be.visible').and('contain.text', 'Вопрос является обязательным.');
            break;
          case 'messageFailed':
            cy.get('.question_110')
              .find('.requiredText___b6919613c3a5622fab86')
              .should('be.visible').and('contain.text', 'Вопрос является обязательным.');
            break;
          case 'passed':
            // Проверка успешной отправки
            cy.contains('Благодарим за обращение!').should('be.visible');
            break;
        };
      });
    });
  });
});
Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://www.saucedemo.com/');
  cy.get('input[name="user-name"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('input[type="submit"]').click();
});

describe('Funcionalidade: Checkout - Frontend', () => {

  const user = 'standard_user';
  const pass = 'secret_sauce';
  const firstName = 'Oliver';
  const lastName = 'Tree';
  const postalCode = '45687';

  beforeEach(() => {
    cy.login(user, pass);
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();
  });

  it('Dado que estou no checkout, Quando preencho todos os campos válidos, Então prossigo para a confirmação da compra', () => {
    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);
    cy.get('[data-test="postalCode"]').type(postalCode);
    cy.get('[data-test="continue"]').click();
    cy.url().should('include', '/checkout-step-two.html');
  });

  it('Dado que deixo os campos de checkout vazios, Então é exibido um erro impedindo a continuação', () => {
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain', 'Error');
  });

  it('Dado que preencho os dados válidos, Quando finalizo a compra, Então a confirmação é exibida', () => {
    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);
    cy.get('[data-test="postalCode"]').type(postalCode);
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
  });

  it('Dado que estou no checkout, Quando cancelo a compra, Então volto para a página de produtos', () => {
    cy.get('[data-test="cancel"]').click();
    cy.url().should('include', '/cart.html');
  });

});

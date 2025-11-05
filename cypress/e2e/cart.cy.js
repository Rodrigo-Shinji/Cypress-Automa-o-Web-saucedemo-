Cypress.Commands.add('login', (username, password) => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
});

describe('Funcionalidade: Carrinho', () => {
    const user = 'standard_user';
    const pass = 'secret_sauce';

    beforeEach(() => {
        cy.login(user, pass);
    });

    it('Adicionar 1 produto ao carrinho', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');
    });

    it('Adicionar 2 produtos ao carrinho', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        cy.get('.shopping_cart_badge').should('have.text', '2');
    });

    it('Remover produto do carrinho', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
        cy.get('.shopping_cart_badge').should('not.exist');
    });

    it('Visualizar carrinho', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
        cy.get('.cart_item').should('have.length', 1);
    });
});
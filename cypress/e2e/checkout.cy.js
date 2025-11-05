Cypress.Commands.add('login', (username, password) => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
});

describe('Funcionalidade: Checkout', () => {
    const user = 'standard_user';
    const pass = 'secret_sauce';
    const firstName = 'Guilherme';
    const lastName = 'Britto';
    const postalCode = '12345';

    beforeEach(() => {
        cy.login(user, pass);
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('.shopping_cart_link').click();
        cy.get('[data-test="checkout"]').click();
    });

    it('Preencher dados válidos', () => {
        cy.get('[data-test="firstName"]').type(firstName);
        cy.get('[data-test="lastName"]').type(lastName);
        cy.get('[data-test="postalCode"]').type(postalCode);
        cy.get('[data-test="continue"]').click();
        cy.url().should('include', '/checkout-step-two.html');
    });

    it('Campos vazios no checkout', () => {
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="error"]').should('contain', 'Error');
    });

    it('Finalizar compra', () => {
        cy.get('[data-test="firstName"]').type(firstName);
        cy.get('[data-test="lastName"]').type(lastName);
        cy.get('[data-test="postalCode"]').type(postalCode);
        cy.get('[data-test="continue"]').click();
        cy.get('[data-test="finish"]').click();
        cy.get('.complete-header').should('have.text', 'Thank you for your order!');
    });

    it('Cancelar checkout', () => {
        cy.get('[data-test="cancel"]').click();
        cy.url().should('include', '/inventory.html');
    });
});
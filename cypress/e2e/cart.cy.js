describe('Teste de Carrinho - Frontend', () => {

  const url = 'https://www.saucedemo.com/'
  const usernameInput = 'input[name="user-name"]'
  const passwordInput = 'input[name="password"]'
  const submitButton = 'input[type="submit"]'

  const cartBadge = '.shopping_cart_badge'
  const cartLink = '.shopping_cart_link'
  const cartItem = '.cart_item'

  const addBackpackBtn = '[data-test="add-to-cart-sauce-labs-backpack"]'
  const removeBackpackBtn = '[data-test="remove-sauce-labs-backpack"]'
  const addBikeLightBtn = '[data-test="add-to-cart-sauce-labs-bike-light"]'

  const validUser = { username: 'standard_user', password: 'secret_sauce' }

  beforeEach(() => {
    cy.visit(url)
    cy.get(usernameInput).type(validUser.username)
    cy.get(passwordInput).type(validUser.password)
    cy.get(submitButton).click()
    cy.url().should('include', '/inventory.html')
  })

  it('Dado que estou logado, Quando adiciono 1 produto ao carrinho, Então o carrinho deve exibir a quantidade 1', () => {
    cy.get(addBackpackBtn).click()
    cy.get(cartBadge).should('have.text', '1')
  })

  it('Dado que estou logado, Quando adiciono 2 produtos ao carrinho, Então o carrinho deve exibir a quantidade 2', () => {
    cy.get(addBackpackBtn).click()
    cy.get(addBikeLightBtn).click()
    cy.get(cartBadge).should('have.text', '2')
  })

   it('Dado que estou logado, Quando adiciono um produto e depois removo, Então o carrinho deve ficar vazio', () => {
    cy.get(addBackpackBtn).click()
    cy.get(cartBadge).should('have.text', '1')
    cy.get(removeBackpackBtn).click()
    cy.get(cartBadge).should('not.exist')
})


  it('Dado que tenho um produto no carrinho, Quando acesso o carrinho, Então devo visualizar o produto adicionado', () => {
    cy.get(addBackpackBtn).click()
    cy.get(cartLink).click()
    cy.url().should('include', '/cart.html')
    cy.get(cartItem).should('have.length', 1)
  })

})

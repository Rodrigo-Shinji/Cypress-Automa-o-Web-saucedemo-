describe('Teste de Produtos - Frontend (BDD sem DDT)', () => {

  const url = 'https://www.saucedemo.com/'
  const usernameInput = 'input[name="user-name"]'
  const passwordInput = 'input[name="password"]'
  const submitButton = 'input[type="submit"]'
  const productNames = '.inventory_item_name'
  const productPrices = '.inventory_item_price'
  const sortDropdown = '[data-test="product-sort-container"]'

  const validUser = { username: 'standard_user', password: 'secret_sauce' }

  beforeEach(() => {
    cy.visit(url)
    cy.get(usernameInput).type(validUser.username)
    cy.get(passwordInput).type(validUser.password)
    cy.get(submitButton).click()
    cy.url().should('include', '/inventory.html')
  })

  it('Dado que estou logado na página de produtos, Quando acesso a lista de produtos, Então todos os produtos devem ser exibidos', () => {
    cy.get(productNames).should('have.length', 6)
    cy.get(productNames).each(($el) => cy.wrap($el).should('be.visible'))
  })

  it('Dado que estou logado, Quando seleciono a ordenação Nome A → Z, Então os produtos devem aparecer em ordem alfabética crescente', () => {
    cy.get(sortDropdown).select('az')
    cy.get(productNames).then(($items) => {
      const list = $items.map((i, el) => Cypress.$(el).text()).get()
      const sorted = [...list].sort()
      expect(list).to.deep.equal(sorted)
    })
  })

  it('Dado que estou logado, Quando seleciono a ordenação Nome Z → A, Então os produtos devem aparecer em ordem alfabética decrescente', () => {
    cy.get(sortDropdown).select('za')
    cy.get(productNames).then(($items) => {
      const list = $items.map((i, el) => Cypress.$(el).text()).get()
      const sorted = [...list].sort().reverse()
      expect(list).to.deep.equal(sorted)
    })
  })

  it('Dado que estou logado, Quando seleciono a ordenação Preço baixo → alto, Então os produtos devem aparecer do menor para o maior preço', () => {
    cy.get(sortDropdown).select('lohi')
    cy.get(productPrices).then(($items) => {
      const list = $items.map((i, el) => parseFloat(Cypress.$(el).text().replace('$', ''))).get()
      const sorted = [...list].sort((a,b) => a-b)
      expect(list).to.deep.equal(sorted)
    })
  })

  it('Dado que estou logado, Quando seleciono a ordenação Preço alto → baixo, Então os produtos devem aparecer do maior para o menor preço', () => {
    cy.get(sortDropdown).select('hilo')
    cy.get(productPrices).then(($items) => {
      const list = $items.map((i, el) => parseFloat(Cypress.$(el).text().replace('$', ''))).get()
      const sorted = [...list].sort((a,b) => b-a)
      expect(list).to.deep.equal(sorted)
    })
  })

})

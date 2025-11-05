describe('Teste de Login - Frontend', () => {

  const url = 'https://www.saucedemo.com/'
  const usernameInput = 'input[name="user-name"]'
  const passwordInput = 'input[name="password"]'
  const submitButton = 'input[type="submit"]'

  beforeEach(() => {
    cy.visit(url)
  })

  it('Dado que desejo fazer login, Quando insiro dados válidos, Então o login será efetuado com sucesso', () => {
    cy.get(usernameInput).type('standard_user')
    cy.get(passwordInput).type('secret_sauce')
    cy.get(submitButton).should('be.visible').click()
    cy.url().should('include', '/inventory')
  })

  it('Dado que desejo fazer login, Quando insiro dados inválidos, Então o login irá falhar', () => {
    cy.get(usernameInput).type('error')
    cy.get(passwordInput).type('error')
    cy.get(submitButton).should('be.visible').click()
    cy.get('[data-test="error"]').should('be.visible')
  })

  it('Dado que desejo fazer login, Quando insiro dados de um usuário bloqueado, Então será mostrada a mensagem (user has been locked out)', () => {
    cy.get(usernameInput).type('locked_out_user')
    cy.get(passwordInput).type('secret_sauce')
    cy.get(submitButton).should('be.visible').click()
    cy.get('[data-test="error"]').should('contain', 'locked out')
  })

  it('Dado que deixo os campos de login vazios, Então o login é impedido e é exibido um alerta', () => {
    cy.get(submitButton).should('be.visible').click()
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Username is required')
})

})

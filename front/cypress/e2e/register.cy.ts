describe('Register spec', () => {
  it('Register successfull', () => {
    cy.visit('/register')

    cy.intercept('POST', '/api/auth/register', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/auth/login',
      },
      []).as('login')

    cy.get('input[formControlName=firstName]').type("lara")
    cy.get('input[formControlName=lastName]').type("cerqueira")
    cy.get('input[formControlName=email]').type("lara@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.url().should('include', '/login')
  })
});
describe('Register spec', () => {

  const USER_ADMIN = {
    token: 'jwt',
    type: 'Bearer',
    id: 1,
    email: 'yoga@studio.com',
    firstName: 'Admin',
    lastName: 'ADMIN',
    admin: true,
    createdAt: '2024-01-12T15:33:42',
    updatedAt: '2024-01-12T15:33:42',
  };

  beforeEach(() => {

    cy.visit('/register')

    cy.intercept(
      {
        method: 'POST',
        url: '/api/auth/register',
      },
      []).as('register')

  })
  it('Register successfull', () => {

    cy.get('input[formControlName=firstName]').type(USER_ADMIN.firstName);
    cy.get('input[formControlName=lastName]').type(USER_ADMIN.lastName);
    cy.get('input[formControlName=email]').type(USER_ADMIN.email);
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`);

    cy.url().should('include', '/login');

  })

  it('it should send error message for a required field', () => {

    cy.get('input[formControlName=firstName]').type("lara")
    cy.get('input[formControlName=lastName]').type("cerqueira")
    cy.get('input[formControlName=email]').type("invalid")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)


    cy.get('button[type=submit]').should('be.disabled');

  })
});
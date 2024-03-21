describe('Login spec', () => {
  it('Login successfull', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
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
        url: '/api/session',
      },
      []).as('session')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.url().should('include', '/sessions')
  })
  
});

it('should log out', () => {

  cy.visit('/login');
  
  cy.intercept('POST', '/api/auth/login', {
    body: {
      id: 1,
      username: 'userName',
      firstName: 'firstName',
      lastName: 'lastName',
      admin: true,
    },
  });

  cy.intercept(
    {
      method: 'GET',
      url: '/api/session',
    },
    []
  ).as('session');

  cy.get('input[formControlName=email]').type('yoga@studio.com');
  cy.get('input[formControlName=password]').type(
    `${'test!1234'}{enter}{enter}`
  );

  cy.url().should('include', '/session');

  cy.get('.link').contains('Logout').click();

  cy.url().should('include', '/');

});

it('should return message error when inputs is not valid', () => {
  
  cy.visit('/login');
  
  cy.get('input[formControlName=email]').type('yoga@studio.com');
  cy.get('input[formControlName=password]').type(`'invalid' {enter}{enter}`);

  cy.get('.error').should('be.visible');
});
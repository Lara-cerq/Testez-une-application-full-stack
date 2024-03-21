describe('Account page', () => {
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
    cy.visit('/login')
    cy.intercept('POST', '/api/auth/login', USER_ADMIN);

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session')

    cy.intercept('GET', `/api/user/${USER_ADMIN.id}`, (req) => {
      req.reply(USER_ADMIN);
    });

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
    cy.url().should('include', '/sessions')
  })

  it('test user information', () => {

    cy.get('span.link').contains('Account').click();

    cy.url().should('include', '/me');

    cy.get('mat-card-title h1').should('contain', 'User information');
    cy.get('p').eq(0).should('contain', `Name: ${USER_ADMIN.firstName} ${USER_ADMIN.lastName}`);
    cy.get('p').eq(1).should('contain', `Email: ${USER_ADMIN.email}`);

    cy.get('button[mat-raised-button]').should('not.exist');
  })
})
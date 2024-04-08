const SESSION = {
  id: 1,
  name: 'TEST session',
  date: '2024-01-13',
  teacher_id: 1,
  description: 'TEST description for the session',
  users: [2],
  createdAt: '2024-01-13T14:24:33',
  updatedAt: '2024-01-26T09:20:22',
};

const TEACHERS = [
  {
    id: 1,
    lastName: 'DELAHAYE',
    firstName: 'Margot',
    createdAt: '2024-01-12T15:33:42',
    updatedAt: '2024-01-12T15:33:42',
  },
  {
    id: 2,
    lastName: 'THIERCELIN',
    firstName: 'Hélène',
    createdAt: '2024-01-12T15:33:42',
    updatedAt: '2024-01-12T15:33:42',
  },
];

const SESSIONS = [SESSION];

describe('session test as ADMIN ', () => {

  const SESSION_EDIT = {
    id: 1,
    name: 'TEST session edit',
    date: '2024-01-13',
    teacher_id: 1,
    description: 'TEST description for the session',
    users: [2],
    createdAt: '2024-01-13T14:24:33',
    updatedAt: '2024-01-26T09:20:22',
  };

  const USER_ADMIN = {
    id: 1,
    username: 'user',
    firstName: 'user',
    lastName: 'user',
    admin: true
  }

  beforeEach(() => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', USER_ADMIN)

    cy.intercept('GET', '/api/session', (req) => {
      req.reply(SESSIONS);
    });

    cy.intercept('GET', `/api/teacher`, TEACHERS);

    cy.intercept(
      'GET',
      `/api/teacher/${TEACHERS[0].id}`,
      TEACHERS[0]
    );
    cy.intercept('POST', '/api/session', (req) => {
      SESSIONS.push(SESSION);

      req.reply(SESSION);
    });

    cy.intercept('POST', '/api/session', (req) => {
      SESSIONS.push(SESSION);

      req.reply(SESSION);
    });

    cy.intercept('GET', `/api/session/${SESSION.id}`, SESSION);

    cy.intercept('POST', '/api/session', (req) => {
      SESSIONS.push(SESSION);

      req.reply(SESSION);
    });

    cy.intercept('PUT', `/api/session/${SESSION.id}`, (req) => {

      req.reply(SESSION_EDIT);
    });

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
    cy.url().should('include', '/sessions')

  })

  it('show session page and button create and detail', () => {

    cy.get('mat-card').should('have.length', 2);
    cy.get('mat-card-title').should('contain', SESSION.name);

    cy.get('button[routerLink]').contains('Create');

    cy.get('button[mat-raised-button] span').contains('Detail');

  })

  it('create session page', () => {

    cy.get('button[routerLink=create]').click();


    cy.get('input[formControlName=name]').type("yoga")
    cy.get('input[formControlName=date]').type("2024-01-01")

    cy.get('mat-select[formControlName="teacher_id"]').click();

    cy.get('mat-option').contains(TEACHERS[0].firstName).click();

    cy.get('textarea[formControlName=description]').type(`${"test"}`)
    cy.get('button[type=submit]').click();

    cy.get('snack-bar-container')
      .contains('Session created !')
      .should('exist');
    cy.get('snack-bar-container button span').contains('Close').click();

  })

  it('create session with message error', () => {

    cy.get('button[routerLink=create]').click();


    cy.get('input[formControlName=name]').type(SESSION.name)
    cy.get('input[formControlName=date]').type(SESSION.date)

    cy.get('textarea[formControlName=description]').type(`${SESSION.description}`)

    cy.get('button[type=submit]').should('be.disabled');

  })

  it('detail page', () => {

    cy.get('button[mat-raised-button] span').contains('Detail').click();

    cy.get('mat-card-content').contains(SESSION.description).click();

    // button delete in ADMIN
    cy.get('button').contains('Delete').click();

  })

  
  it('edit page', () => {

    cy.get('button[mat-raised-button] span').contains('Edit').click();

    cy.get('input[formControlName=name]').type("yoga")
    cy.get('input[formControlName=date]').type("2024-01-01")

    cy.get('mat-select[formControlName="teacher_id"]').click();

    cy.get('mat-option').contains(TEACHERS[0].firstName).click();

    cy.get('textarea[formControlName=description]').type(`${"test update"}`)
    cy.get('button[type=submit]').click();

    cy.get('snack-bar-container')
      .contains('Session updated !')
      .should('exist');
    cy.get('snack-bar-container button span').contains('Close').click();


  })

  
  it('edit page with message error', () => {

    cy.get('button[mat-raised-button] span').contains('Edit').click();

    cy.get('input[formControlName=name]').type("yoga").clear()
    cy.get('input[formControlName=date]').type("2024-01-01")

    cy.get('textarea[formControlName=description]').type(`${"test update"}`)

    cy.get('button[type=submit]').should('be.disabled');


  })
})

describe('session test as user', () => {

  const USER = {
    id: 1,
    username: 'user',
    firstName: 'user',
    lastName: 'user',
    admin: false
  }

  beforeEach(() => {
    cy.visit('/login')
    cy.intercept('POST', '/api/auth/login', USER)

    cy.intercept('GET', '/api/session', (req) => {
      req.reply(SESSIONS);
    });

    cy.intercept('POST', '/api/session', (req) => {
      SESSIONS.push(SESSION);

      req.reply(SESSION);
    });

    cy.intercept('GET', `/api/session/${SESSION.id}`, SESSION);

    cy.intercept(
      'GET',
      `/api/teacher/${TEACHERS[0].id}`,
      TEACHERS[0]
    );

    cy.intercept(
      'POST',
      `/api/session/${SESSION.id}/participate/${USER.id}`,
      (req) => {
        req.reply({
          statusCode: 200,
          body: {},
        });
      }
    );

    cy.intercept(
      'DELETE',
      `/api/session/${SESSION.id}/participate/${USER.id}`,
      (req) => {
        req.reply({
          statusCode: 200,
          body: {},
        });
      }
    );

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
    cy.url().should('include', '/sessions')

  })

  it('detail page', () => {

    cy.get('button[mat-raised-button] span').contains('Detail').click();

    cy.get('button').contains('Delete').should('not.exist');

    cy.get('button[mat-raised-button] span').contains('Participate').click();

  })
})

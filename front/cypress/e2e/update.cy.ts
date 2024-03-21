describe('session test', ()=> {
  beforeEach(() => {
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
  
  it('create page', () => {
     cy.intercept('GET', '/api/session', {
          body: {
            name: "yoga",
            description: "session test",
            date: '2024-03-25',
            teacher_id: 1,
            users: [],
          },
        })

        cy.get('button[routerLink=update,session.id]').click(); 

   
      
        cy.get('input[formControlName=name]').type("yoga")
        cy.get('input[formControlName=date]').type("2024-01-01")
          

        cy.get('mat-select[formControlName=teacher_id]').click();   
        cy.get('mat-option').contains('Margot DELAHAYE').click(); 
          // cy.get('mat-select').first().click(); // opens the drop down
          // cy.get('#teacher').select('Margot DELAHAYE', {
          //   force: true
          // });
          // cy.contains('mat-option', 'Margot DELAHAYE').click()   
// simulate click event on the drop down item (mat-option)
  //         cy.get('mat-option')
  // .contains('Margot DELAHAYE')
  // .then(option => {
  //           option[0].click();  // this is jquery click() not cypress click()
        // });
          cy.get('textarea[formControlName=description]').type(`${"test"}`)
          cy.get('button[type=submit]').click(); 
          // cy.url().should('include', '/sessions')
  
        //   cy.include('Session created !') 
      })
})
import { wait } from "@testing-library/user-event/dist/utils"

describe('CRUD_API testing with Cypress', () => { 
  
  it('Test viewing the main page', () => {
    cy.visit('localhost:3000')
    
    cy.get('h1').should('contain', 'Comments')
    cy.get('h3').should('contain', 'Add Comment')
    cy.get('[placeholder="Name"]').should('be.visible', true)
    cy.get('[placeholder="Email"]').should('be.visible', true)
    cy.get('[placeholder="Body"]').should('be.visible', true)
    cy.get('form > button').should('be.visible', true)

    cy.get(':nth-child(1) > .user > .user-name').should('have.text', 'id labore ex et quam laborum')
    cy.get(':nth-child(1) > .user > .user-email').should('have.text', 'Eliseo@gardner.bi')
    cy.get(':nth-child(1) > .user > .user-body').should('have.text', 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium')
    cy.get(':nth-child(1) > .user > div > :nth-child(1)').should('be.visible', true)
    cy.get(':nth-child(1) > .user > div > :nth-child(2)').should('be.visible', true)
  })

  it('Test adding a comment', () => {
    cy.get('[placeholder="Name"]').type('Sample name')
    cy.get('[placeholder="Email"]').type('sample@email.com')
    cy.get('[placeholder="Body"]').type('Sample body')
    cy.get('form > button').click()
    cy.wait(1000)
    cy.get(':nth-child(11) > .user')
    cy.get(':nth-child(11) > .user > .user-name').should('contain', 'Sample name')
    cy.get(':nth-child(11) > .user > .user-email').should('contain', 'sample@email.com')
    cy.get(':nth-child(11) >.user >.user-body').should('contain', 'Sample body')
  })

  it('Test editing a comment', () => {
    cy.get(':nth-child(11) > .user > div > :nth-child(1)').click()
    cy.wait(500)
    cy.get(':nth-child(11) > form > [placeholder="Name"]').clear()
    cy.get(':nth-child(11) > form > [placeholder="Name"]').type('Alias').should('have.value', 'Alias')
    cy.get(':nth-child(11) > form > [placeholder="Email"]').clear()
    cy.get(':nth-child(11) > form > [placeholder="Email"]').type('Alias@gmail.com').should('have.value', 'Alias@gmail.com')
    cy.get(':nth-child(11) > form > [placeholder="Body"]').clear()
    cy.get(':nth-child(11) > form > [placeholder="Body"]').type('Alias is my name').should('have.value', 'Alias is my name')
    cy.get(':nth-child(11) > form > button').should('contain.text', 'Save').click()
  })

  it('Test deleting a comment', () => {
    cy.get(':nth-child(11) > .user > div > :nth-child(2)').click()
    wait(1000)
    cy.get(':nth-child(11) > .user').should('not.exist')
  })
  
})
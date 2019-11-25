// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Comment System')
    cy.get('data-cy="comment-input').type('First')
    cy.click('data-cy="submit-comment"')
    
  })
})

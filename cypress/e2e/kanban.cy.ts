describe('Kanban Board', () => {
  beforeEach(() => {
    cy.fixture('cards.json').then(({ GET, PUT }) => {
      cy.intercept('GET', '/api/cards', GET)
      cy.intercept('PUT', '/api/cards/*', PUT)
    })
    cy.visit('//localhost:3000')
  })
  it('Should display Kanban columns and cards', () => {
    cy.get('.kanban-column').should('have.length', 4)
    cy.get('.kanban-card').should('have.length', 4)
    cy.get('#kanban-column-TODO .kanban-card').should('have.length', 1)
    cy.get('#kanban-column-DOING .kanban-card').should('have.length', 1)
    cy.get('#kanban-column-DONE .kanban-card').should('have.length', 1)
  })
  it('Should change card in columns', () => {
    cy.get('.kanban-column').should('have.length', 4)
    cy.get('.kanban-card').should('have.length', 4)
    cy.get('#kanban-column-TODO .kanban-card').should('have.length', 1)
    cy.get('#kanban-column-DOING .kanban-card').should('have.length', 1)
    cy.get('#kanban-column-DONE .kanban-card').should('have.length', 1)

    cy.dragToRight('#kanban-column-TODO .kanban-card')
    cy.get('#kanban-column-TODO .kanban-card').should('have.length', 0)
    cy.get('#kanban-column-DOING .kanban-card').should('have.length', 2)
    cy.get('#kanban-column-DONE .kanban-card').should('have.length', 1)

    cy.dragToRight('#kanban-column-DOING .kanban-card:first-of-type')
    cy.dragToRight('#kanban-column-DOING .kanban-card:first-of-type')

    cy.get('#kanban-column-TODO .kanban-card').should('have.length', 0)
    cy.get('#kanban-column-DOING .kanban-card').should('have.length', 0)
    cy.get('#kanban-column-DONE .kanban-card').should('have.length', 3)
  })
})

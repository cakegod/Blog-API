describe('Post', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/blog');
  });

  it('renders correctly', () => {
    cy.findByRole('main').first().click();
    cy.findByRole('article').should('be.visible');
    cy.findByRole('heading').should('be.visible');
    cy.get('giscus-widget').should('be.visible');
  });
});

export {};

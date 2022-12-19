describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/blog');
  });
  it('should check toggle theme', () => {
    cy.get('html').should('have.class', 'light');

    cy.get('[aria-label="theme toggler"]').click();
    cy.get('html').should('have.class', 'dark');
    cy.reload();
    cy.get('html').should('have.class', 'dark');

    cy.get('[aria-label="theme toggler"]').click();
    cy.get('html').should('have.class', 'light');
    cy.reload();
    cy.get('html').should('have.class', 'light');

    cy.get('[aria-label="theme toggler"]').click();
    cy.get('html').should('have.class', 'dark');
  });

  it('should checks all links status', () => {
    cy.get('a').each((page) => {
      cy.request(page.prop('href'));
    });
  });
});

export {};

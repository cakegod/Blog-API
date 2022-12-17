import RootLayout from '../../src/app/layout';

describe('homepage', () => {
  beforeEach(() => cy.mount(<RootLayout />));

  it('toggle theme', () => {
    cy.get('html').should('have.class', 'light');

    cy.get('[aria-label="theme toggler"]').click();
    cy.get('html').should('have.class', 'dark');

    cy.get('[aria-label="theme toggler"]').click();
    cy.get('html').should('have.class', 'light');

    cy.get('[aria-label="theme toggler"]').click();
    cy.get('html').should('have.class', 'dark');
  });

  it('renders all links and text logo', () => {
    const links = [
      { name: `Cake's Blog`, path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: 'Projects', path: '/projects' },
      { name: 'Github', path: 'https://github.com/cakegod' },
      { name: 'Contact', path: '/contact' },
    ];

    links.forEach((link) => {
      cy.get(`a[href="${link.path}"]`)
        .should('be.visible')
        .and('have.text', link.name)
        .and('have.attr', 'href')
        .and('include', link.path);
    });
  });

  it('renders theme toggler', () => {
    cy.get("[aria-label='theme toggler']").should('be.visible');
  });

  it('renders footer', () => {
    cy.get('footer')
      .should('be.visible')
      .contains(/All rights reserved © Cake 2022 - Present/);
  });
});

import RootLayout from '../../src/app/layout';
import '@testing-library/cypress/add-commands';

describe('homepage', () => {
  beforeEach(() => cy.mount(<RootLayout />));

  it('toggle theme', () => {
    cy.findByRole('button').as('themeButton');

    cy.get('html').should('have.class', 'light');

    cy.get('@themeButton').click();
    cy.get('html').should('have.class', 'dark');

    cy.get('@themeButton').click();
    cy.get('html').should('have.class', 'light');

    cy.get('@themeButton').click();
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
      cy.findByRole(`link`, { name: link.name })
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', link.path);
    });
  });

  it('renders theme toggler', () => {
    cy.findByRole('button').should('be.visible');
  });

  it('renders footer', () => {
    cy.get('footer')
      .should('be.visible')
      .contains(/All rights reserved © Cake 2022 - Present/);
  });
});

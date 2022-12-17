import AboutMe from '@/components/blog/AboutMe';

describe('header.cy.ts', () => {
  beforeEach(() => cy.mount(<AboutMe />));

  it('renders', () => {
    cy.get('p')
      .should('have.length', 2)
      .first()
      .contains(/hi 👋, i'm cake from france 🇫🇷/i);
    cy.get('p')
      .last()
      .contains(
        /i'm an aspiring web developer with a passion for react\. welcome to my personal blog 📚, where i write about all things react, javascript and typescript\./i
      );
  });
});

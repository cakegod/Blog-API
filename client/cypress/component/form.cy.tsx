import Form from '@/components/blog/contact/Form';

describe('form', () => {
  beforeEach(() => cy.mount(<Form />));

  it('allow typing', () => {
    cy.get('form');
    cy.get('input[name="email"]').type('hello');
    cy.get('input[name="subject"]').type('hello');
    cy.get('textarea[name="message"]').type('A very large and big message...');
    cy.get('button').click();
  });
});

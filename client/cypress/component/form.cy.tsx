import Form from '@/components/blog/contact/Form';
import '@testing-library/cypress/add-commands';

describe('form', () => {
  beforeEach(() => cy.mount(<Form />));

  it('allow typing', () => {
    const form = [
      { name: 'email', text: 'hello' },
      { name: 'subject', text: 'hello' },
      { name: 'message', text: 'A very large and big message...' },
    ];

    cy.findByRole('form');
    form.forEach((input) => {
      cy.findByRole('textbox', { name: input.name })
        .should('be.visible')
        .type(input.text);
    });
  });
});

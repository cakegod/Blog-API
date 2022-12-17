import FormInput from '@/components/blog/contact/FormInput';
import '@testing-library/cypress/add-commands';

const obj = {
  name: 'email',
  value: 'hello',
  label: 'Your email',
  placeholder: 'your-email-adress@gmail.com',
  textarea: false,
};

describe('form', () => {
  it('renders label', () => {
    const labels = ['email', 'contact', 'message', 'fish', 'bird'];
    labels.forEach((label) => {
      cy.mount(<FormInput data={{ ...obj, label }} />);
      cy.findByText(label).should('be.visible');
    });
  });

  it('renders input', () => {
    cy.mount(<FormInput data={obj} />);
    cy.findByRole('textbox', { name: /email/i })
      .should('be.visible')
      .and('have.value', 'hello');
  });

  it('renders textarea', () => {
    cy.mount(<FormInput data={{ ...obj, textarea: true }} />);
    cy.findByRole('textbox').should('be.visible').and('have.value', 'hello');
  });
});

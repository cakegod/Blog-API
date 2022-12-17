import FormInput from '@/components/blog/contact/FormInput';

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
      cy.screenshot();
      cy.get('label').should('be.visible').contains(label);
    });
  });

  it('renders input', () => {
    cy.mount(<FormInput data={obj} />);
    cy.get('input').should('be.visible').should('have.value', 'hello');
  });

  it('renders textarea', () => {
    cy.mount(<FormInput data={{ ...obj, textarea: true }} />);
    cy.get('textarea').should('be.visible').should('have.value', 'hello');
  });
});

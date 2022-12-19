import Contact from '@/app/contact/page';


const form = [
  {
    name: 'email',
    value: '',
    label: 'Your email',
    placeholder: 'your-email-adress@gmail.com',
    textarea: false,
  },
  {
    name: 'subject',
    value: '',
    label: 'Subject',
    placeholder: 'Let me know how I can help you',
    textarea: false,
  },
  {
    name: 'message',
    value: '',
    label: 'Your message',
    placeholder: 'Leave a comment...',
    textarea: true,
  },
];

describe('contact page', () => {
  beforeEach(() => cy.mount(<Contact />));

  it('allows form typing', () => {
    form.forEach((input) => {
      cy.findByRole('textbox', { name: input.name })
        .should('be.visible')
        .type('hello');
    });
  });
  it('renders form labels', () => {
    form.forEach((input) => {
      cy.findByText(input.label).should('be.visible');
    });
  });

  it('renders form inputs', () => {
    form.forEach((input) => {
      cy.findByRole('textbox', { name: input.name }).should('be.visible');
    });
  });

  it('renders from button', () => {
    cy.findByRole('button').should('be.visible').contains(/send/i);
  });

  it('renders page heading ', () => {
    cy.findByRole('heading')
      .should('be.visible')
      .contains(/contact me/i)
      .next()
      .should('be.visible')
      .contains(
        /Want to hire me\? Got feedback or potential features for this blog\?/i
      );
  });
});

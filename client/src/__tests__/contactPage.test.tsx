import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form from '@/components/blog/contact/Form';
import useEvent from '@testing-library/user-event';

it('renders form and allows typing', async () => {
  render(<Form />);

  const user = useEvent.setup();

  expect(screen.getByRole('form')).toBeVisible();

  // EMPTY by default
  expect(screen.getByRole('form')).toHaveFormValues({
    email: '',
    subject: '',
    message: '',
  });

  // TYPE
  await user.type(screen.getByRole('textbox', { name: /email/i }), 'foo');
  await user.type(screen.getByRole('textbox', { name: /subject/i }), 'bar');
  await user.type(screen.getByRole('textbox', { name: /message/i }), 'foobar');

  expect(screen.getByRole('form')).toHaveFormValues({
    email: 'foo',
    subject: 'bar',
    message: 'foobar',
  });
});

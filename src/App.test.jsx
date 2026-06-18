import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders the heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /todo/i })).toBeInTheDocument();
});

test('adds a todo when the form is submitted', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.type(screen.getByLabelText(/new todo/i), 'Buy milk');
  await user.click(screen.getByRole('button', { name: /add/i }));

  expect(screen.getByText('Buy milk')).toBeInTheDocument();
});

test('does not add an empty todo', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole('button', { name: /add/i }));

  expect(screen.queryAllByRole('listitem')).toHaveLength(0);
});

test('toggles a todo done state', async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.type(screen.getByLabelText(/new todo/i), 'Walk dog');
  await user.click(screen.getByRole('button', { name: /add/i }));

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
  await user.click(checkbox);
  expect(checkbox).toBeChecked();
});

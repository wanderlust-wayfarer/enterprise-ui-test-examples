// @vitest-environment happy-dom

import { screen, fireEvent } from '@testing-library/react';
import { render } from './test/utilities';
import userEvent from '@testing-library/user-event';
import Counter from '.';

test('it should render the component', () => {
  render(<Counter />);
  const currentCount = screen.getByTestId('current-count');
  expect(currentCount.textContent).toBe('0');
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter />);

  const currentCount = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });
  // Alternatively: fireEvent.click(incrementButton);
  // However, user better mirrors a sequence of actions a user would do
  // (such as key down, then key up) to perform the action.
  await user.click(incrementButton);
  // Using testing library extensions imported in ./test/setup.ts
  expect(currentCount).toHaveTextContent('1');
});

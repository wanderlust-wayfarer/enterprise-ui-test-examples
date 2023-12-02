import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { render as baseRender, screen, waitFor } from 'test/utilities';
import PackingList from '.';
import { createStore } from './store';

const render: typeof baseRender = (Component, options) => {
  const store = createStore();

  const Wrapper = ({ children }: PropsWithChildren) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return baseRender(Component, { ...options, wrapper: Wrapper });
};

const renderPackingList = () => {
  const { user } = render(<PackingList />);

  const packingList = screen.getByText('Packing List');
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemButton = screen.getByRole('button', {
    name: /add new item/i,
  });

  return { user, packingList, newItemInput, addNewItemButton };
};

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  renderPackingList();
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  renderPackingList();
  screen.getByLabelText('New Item Name');
});

it('has a "Add New Item" button that is disabled when the input is empty', () => {
  const { newItemInput, addNewItemButton } = renderPackingList();
  expect(newItemInput).toHaveValue('');
  expect(addNewItemButton).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user, newItemInput, addNewItemButton } = renderPackingList();

  await user.type(newItemInput, 'MacBook Pro');
  expect(addNewItemButton).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user, newItemInput, addNewItemButton } = renderPackingList();

  await user.type(newItemInput, 'iPad Pro');
  await user.click(addNewItemButton);

  expect(screen.getByLabelText('iPad Pro')).not.toBeChecked();
});

it('removes an item when "Remove" button is selected', async () => {
  const { user, newItemInput, addNewItemButton } = renderPackingList();

  await user.type(newItemInput, 'iPhone');
  await user.click(addNewItemButton);

  const removeItem = screen.getByRole('button', { name: 'Remove iPhone' });

  await user.click(removeItem);

  waitFor(() => expect(removeItem).not.toBeInTheDocument());
});

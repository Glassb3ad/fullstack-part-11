import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListNumbers from '../src/components/ListNumbers';
import { vi, test } from 'vitest';

test('renders a list of contacts with delete buttons', () => {
  const mockDeleteName = vi.fn();
  const contacts = [
    { name: 'Alice', number: '12345' },
    { name: 'Bob', number: '67890' },
  ];

  render(
    <ListNumbers filteredPersons={contacts} deleteName={mockDeleteName} />
  );

  expect(screen.getByText('Alice 12345')).toBeInTheDocument();
  expect(screen.getByText('Bob 67890')).toBeInTheDocument();

  const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
  expect(deleteButtons).toHaveLength(2);

  fireEvent.click(deleteButtons[0]);
  expect(mockDeleteName).toHaveBeenCalledWith(contacts[0]);
});

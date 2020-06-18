import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders intro', () => {
  const { getByText } = render(<App />);
  const element = getByText(/CouchSpinner/i);
  expect(element).toBeInTheDocument();
});

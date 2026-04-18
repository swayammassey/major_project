import { render, screen } from '@testing-library/react';
import App from './App';

test('renders department analytics portal heading', () => {
  render(<App />);
  const heading = screen.getByText(/department analytics portal/i);
  expect(heading).toBeInTheDocument();
});

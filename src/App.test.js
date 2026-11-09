import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => localStorage.clear());

test('converts text to upper and lower case and counts words', () => {
  render(<App />);
  const box = screen.getByLabelText(/enter your text below/i);
  fireEvent.change(box, { target: { value: 'Hello World' } });
  expect(screen.getByText('2')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /uppercase/i }));
  expect(box).toHaveValue('HELLO WORLD');

  fireEvent.click(screen.getByRole('button', { name: /lowercase/i }));
  expect(box).toHaveValue('hello world');
});

test('toggles dark mode', () => {
  render(<App />);
  fireEvent.click(screen.getByLabelText(/dark mode/i));
  expect(document.documentElement).toHaveAttribute('data-bs-theme', 'dark');
});

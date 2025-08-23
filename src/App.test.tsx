import { describe, it, expect } from 'vitest';
import { render, screen } from './test/utils';
import App from './App';

describe('App', () => {
  it('renders the app with InputField component', () => {
    render(<App />);
    // Check if an input element is rendered (from InputField component)
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});

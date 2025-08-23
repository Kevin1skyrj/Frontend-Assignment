import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/utils';
import InputField from './InputField';

describe('InputField', () => {
  it('renders with label and placeholder', () => {
    render(
      <InputField
        label="Email"
        placeholder="Enter your email"
      />
    );
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const handleChange = vi.fn();
    render(
      <InputField
        label="Email"
        onChange={handleChange}
      />
    );
    
    const input = screen.getByLabelText('Email');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('shows error message when invalid', () => {
    render(
      <InputField
        label="Email"
        invalid
        errorMessage="Email is required"
      />
    );
    
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows helper text when provided', () => {
    render(
      <InputField
        label="Password"
        helperText="Must be at least 8 characters"
      />
    );
    
    expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
  });

  it('renders as disabled when disabled prop is true', () => {
    render(
      <InputField
        label="Email"
        disabled
      />
    );
    
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('renders clear button when showClearButton is true and has value', () => {
    const handleClear = vi.fn();
    render(
      <InputField
        label="Search"
        value="test"
        showClearButton
        onClear={handleClear}
      />
    );
    
    const clearButton = screen.getByLabelText('Clear input');
    expect(clearButton).toBeInTheDocument();
    
    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('renders password toggle when showPasswordToggle is true', () => {
    render(
      <InputField
        label="Password"
        type="password"
        showPasswordToggle
      />
    );
    
    const toggleButton = screen.getByLabelText('Show password');
    expect(toggleButton).toBeInTheDocument();
  });

  it('toggles password visibility when toggle button is clicked', () => {
    render(
      <InputField
        label="Password"
        type="password"
        showPasswordToggle
      />
    );
    
    const input = screen.getByLabelText('Password');
    const toggleButton = screen.getByLabelText('Show password');
    
    expect(input).toHaveAttribute('type', 'password');
    
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
    
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('applies correct size classes', () => {
    const { rerender } = render(
      <InputField
        label="Test"
        size="sm"
      />
    );
    
    let input = screen.getByLabelText('Test');
    expect(input).toHaveClass('px-3', 'py-1.5', 'text-sm');
    
    rerender(
      <InputField
        label="Test"
        size="lg"
      />
    );
    
    input = screen.getByLabelText('Test');
    expect(input).toHaveClass('px-4', 'py-3', 'text-lg');
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(
      <InputField
        label="Test"
        variant="filled"
      />
    );
    
    let input = screen.getByLabelText('Test');
    expect(input).toHaveClass('bg-gray-100');
    
    rerender(
      <InputField
        label="Test"
        variant="ghost"
      />
    );
    
    input = screen.getByLabelText('Test');
    expect(input).toHaveClass('bg-transparent', 'border-b-2');
  });

  it('shows loading spinner when loading', () => {
    render(
      <InputField
        label="Test"
        loading
      />
    );
    
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
    expect(screen.getByLabelText('Test')).toBeDisabled();
  });
});

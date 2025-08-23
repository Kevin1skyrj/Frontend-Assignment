import type { ReactNode } from 'react';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'text' | 'password' | 'email' | 'number' | 'tel';
  id?: string;
  className?: string;
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
  onClear?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}

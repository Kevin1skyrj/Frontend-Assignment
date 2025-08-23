import React, { useState, useId } from 'react';
import type { InputFieldProps } from '../../types/InputField';
import { cn } from '../../utils/cn';

const InputField: React.FC<InputFieldProps> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  id,
  className,
  showClearButton = false,
  showPasswordToggle = false,
  onClear,
  leftIcon,
  rightIcon,
  loading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();
  const inputId = id || generatedId;

  const actualType = type === 'password' && showPassword ? 'text' : type;
  const hasError = invalid || !!errorMessage;

  // Size classes
  const sizeClasses = {
    sm: {
      input: 'px-3 py-1.5 text-sm',
      icon: 'w-4 h-4',
      label: 'text-sm',
    },
    md: {
      input: 'px-4 py-2.5 text-base',
      icon: 'w-5 h-5',
      label: 'text-sm',
    },
    lg: {
      input: 'px-4 py-3 text-lg',
      icon: 'w-6 h-6',
      label: 'text-base',
    },
  };

  // Variant classes
  const variantClasses = {
    filled: {
      base: 'bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500',
      error: 'bg-red-50 focus:bg-white focus:ring-red-500',
      disabled: 'bg-gray-50 text-gray-400',
    },
    outlined: {
      base: 'bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500',
      error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
      disabled: 'bg-gray-50 border-gray-200 text-gray-400',
    },
    ghost: {
      base: 'bg-transparent border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 focus:ring-0',
      error: 'border-red-500 focus:border-red-500',
      disabled: 'border-gray-200 text-gray-400',
    },
  };

  const getInputClasses = () => {
    const base = 'w-full rounded-lg transition-all duration-200 outline-none';
    const sizeClass = sizeClasses[size].input;
    
    let variantClass;
    if (disabled) {
      variantClass = variantClasses[variant].disabled;
    } else if (hasError) {
      variantClass = variantClasses[variant].error;
    } else {
      variantClass = variantClasses[variant].base;
    }

    return cn(base, sizeClass, variantClass, {
      'pr-10': showClearButton || showPasswordToggle || rightIcon,
      'pl-10': leftIcon,
    });
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const EyeIcon = ({ show }: { show: boolean }) => (
    <svg
      className={cn(sizeClasses[size].icon, 'text-gray-400')}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {show ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
        />
      )}
    </svg>
  );

  const XIcon = () => (
    <svg
      className={cn(sizeClasses[size].icon, 'text-gray-400')}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const LoadingSpinner = () => (
    <div className={cn(sizeClasses[size].icon, 'animate-spin')}>
      <svg className="w-full h-full text-gray-400" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            'block font-medium text-gray-700 mb-2',
            sizeClasses[size].label,
            {
              'text-gray-400': disabled,
              'text-red-700': hasError,
            }
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          type={actualType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={getInputClasses()}
          aria-invalid={hasError}
          aria-describedby={
            helperText || errorMessage
              ? `${inputId}-description`
              : undefined
          }
        />

        {(showClearButton || showPasswordToggle || rightIcon || loading) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {loading && <LoadingSpinner />}
            
            {!loading && showClearButton && value && (
              <button
                type="button"
                onClick={handleClear}
                disabled={disabled}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Clear input"
              >
                <XIcon />
              </button>
            )}

            {!loading && showPasswordToggle && type === 'password' && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                disabled={disabled}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon show={showPassword} />
              </button>
            )}

            {!loading && rightIcon && <div>{rightIcon}</div>}
          </div>
        )}
      </div>

      {(helperText || errorMessage) && (
        <p
          id={`${inputId}-description`}
          className={cn(
            'mt-2 text-sm',
            {
              'text-gray-600': !hasError,
              'text-red-600': hasError,
            }
          )}
        >
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;

import type { Meta, StoryObj } from '@storybook/react';
import InputField from '../components/InputField/InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with validation states, multiple variants, and accessibility features. Built with React, TypeScript, and TailwindCSS.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
      description: 'Visual style variant of the input field',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
      description: 'HTML input type',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
    },
    invalid: {
      control: { type: 'boolean' },
      description: 'Whether the input has validation errors',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the input is in loading state',
    },
    showClearButton: {
      control: { type: 'boolean' },
      description: 'Show clear button when input has value',
    },
    showPasswordToggle: {
      control: { type: 'boolean' },
      description: 'Show password visibility toggle (only for password type)',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96 p-4 bg-gray-50 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    helperText: 'We\'ll never share your email with anyone',
    onChange: (e) => console.log('Input changed:', e.target.value),
  },
};

export const Playground: Story = {
  args: {
    label: 'Interactive Input',
    placeholder: 'Try different props...',
    helperText: 'Use the controls panel to test different configurations',
    onChange: (e) => console.log('Input changed:', e.target.value),
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Input Variants</h3>
        
        <div className="p-4 bg-white rounded-lg border">
          <InputField
            label="Outlined (Default)"
            placeholder="Outlined input style"
            variant="outlined"
            helperText="Clean and professional outlined style"
            onChange={(e) => console.log('Outlined changed:', e.target.value)}
          />
        </div>

        <div className="p-4 bg-white rounded-lg border">
          <InputField
            label="Filled"
            placeholder="Filled input style"
            variant="filled"
            helperText="Modern filled background style"
            onChange={(e) => console.log('Filled changed:', e.target.value)}
          />
        </div>

        <div className="p-4 bg-white rounded-lg border">
          <InputField
            label="Ghost"
            placeholder="Minimalist ghost style"
            variant="ghost"
            helperText="Minimal underlined style"
            onChange={(e) => console.log('Ghost changed:', e.target.value)}
          />
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Input Sizes</h3>
        
        <div className="p-4 bg-white rounded-lg border">
          <InputField
            label="Small Size"
            placeholder="Small input field"
            size="sm"
            helperText="Compact size for tight layouts"
            onChange={(e) => console.log('Small changed:', e.target.value)}
          />
        </div>

        <div className="p-4 bg-white rounded-lg border">
          <InputField
            label="Medium Size (Default)"
            placeholder="Medium input field"
            size="md"
            helperText="Standard size for most use cases"
            onChange={(e) => console.log('Medium changed:', e.target.value)}
          />
        </div>

        <div className="p-4 bg-white rounded-lg border">
          <InputField
            label="Large Size"
            placeholder="Large input field"
            size="lg"
            helperText="Prominent size for important fields"
            onChange={(e) => console.log('Large changed:', e.target.value)}
          />
        </div>
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-8 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Input States</h3>
        
        <div className="p-4 bg-white rounded-lg border">
          <InputField
            label="Normal State"
            placeholder="Ready for input"
            helperText="Everything is working perfectly"
            onChange={(e) => console.log('Normal changed:', e.target.value)}
          />
        </div>

        <div className="p-4 bg-white rounded-lg border">
          <InputField
            label="Error State"
            placeholder="Something went wrong"
            invalid
            errorMessage="This field is required and cannot be empty"
            onChange={(e) => console.log('Error changed:', e.target.value)}
          />
        </div>

        <div className="p-4 bg-white rounded-lg border">
          <InputField
            label="Disabled State"
            placeholder="Cannot interact"
            disabled
            helperText="This field is currently disabled"
            onChange={(e) => console.log('Disabled changed:', e.target.value)}
          />
        </div>

        <div className="p-4 bg-white rounded-lg border">
          <InputField
            label="Loading State"
            placeholder="Processing..."
            loading
            helperText="Please wait while we process your request"
            onChange={(e) => console.log('Loading changed:', e.target.value)}
          />
        </div>
      </div>
    </div>
  ),
};

export const WithClearButton: Story = {
  args: {
    label: 'Search Field',
    placeholder: 'Type to search...',
    value: 'Sample search text',
    showClearButton: true,
    helperText: 'Click the × button to clear the field',
    onChange: (e) => console.log('Search changed:', e.target.value),
    onClear: () => console.log('Clear clicked'),
  },
};

export const PasswordField: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    showPasswordToggle: true,
    helperText: 'Click the eye icon to toggle visibility',
    onChange: (e) => console.log('Password changed:', e.target.value),
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-8 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Input Fields with Icons</h3>
        
        <div className="p-4 bg-white rounded-lg border">
          <InputField
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            leftIcon={
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            }
            helperText="We'll send you updates via email"
            onChange={(e) => console.log('Email changed:', e.target.value)}
          />
        </div>

        <div className="p-4 bg-white rounded-lg border">
          <InputField
            label="Search Products"
            placeholder="Search our catalog..."
            rightIcon={
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
            helperText="Find exactly what you're looking for"
            onChange={(e) => console.log('Search changed:', e.target.value)}
          />
        </div>

        <div className="p-4 bg-white rounded-lg border">
          <InputField
            label="Phone Number"
            placeholder="+1 (555) 123-4567"
            type="tel"
            leftIcon={
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            }
            helperText="Include country code for international numbers"
            onChange={(e) => console.log('Phone changed:', e.target.value)}
          />
        </div>
      </div>
    </div>
  ),
};

export const ComplexExample: Story = {
  render: () => (
    <div className="space-y-8 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Advanced Example</h3>
        
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <InputField
            label="Username"
            placeholder="Choose a unique username"
            value="john_doe_2024"
            helperText="Username must be unique and contain only letters, numbers, and underscores"
            showClearButton
            variant="filled"
            size="lg"
            leftIcon={
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            onChange={(e) => console.log('Username changed:', e.target.value)}
            onClear={() => console.log('Username cleared')}
          />
        </div>
      </div>
    </div>
  ),
};

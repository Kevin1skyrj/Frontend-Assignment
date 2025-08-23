# React Component Library

A modern, accessible React component library built with TypeScript, TailwindCSS, and Storybook.

## 🚀 Live Demo

- **Demo Application**: [Ready for deployment](http://localhost:5173/)
- **Storybook Documentation**: [Ready for deployment](http://localhost:6006/)

> **Deploy to Vercel**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Kevin1skyrj/Frontend-Assignment)

## 📦 Components

### 🎯 InputField Component

A flexible, accessible input component with multiple variants and states.

**Features:**
- ✅ Multiple variants: `filled`, `outlined`, `ghost`
- ✅ Different sizes: `sm`, `md`, `lg`
- ✅ Validation states: `error`, `disabled`, `loading`
- ✅ Password toggle functionality
- ✅ Clear button support
- ✅ Left and right icons
- ✅ Full accessibility (ARIA labels)
- ✅ TypeScript support

**Usage:**
```tsx
import { InputField } from './components/InputField';

<InputField
  label="Email"
  placeholder="Enter your email"
  type="email"
  variant="outlined"
  size="md"
  onChange={(e) => console.log(e.target.value)}
/>
```

### 📊 DataTable Component

A powerful data table component with sorting and selection capabilities.

**Features:**
- ✅ Column sorting (ascending/descending)
- ✅ Row selection (single/multiple)
- ✅ Custom column rendering
- ✅ Loading states
- ✅ Empty state handling
- ✅ Responsive design
- ✅ Full accessibility
- ✅ TypeScript generics

**Usage:**
```tsx
import { DataTable } from './components/DataTable';

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
];

<DataTable
  data={users}
  columns={columns}
  selectable
  onRowSelect={(selectedRows) => console.log(selectedRows)}
/>
```

## 📁 Project Structure

```
src/
├── components/           # Reusable components
│   ├── InputField/      # InputField component
│   │   ├── InputField.tsx
│   │   ├── InputField.test.tsx
│   │   └── index.ts
│   └── DataTable/       # DataTable component
│       ├── DataTable.tsx
│       ├── DataTable.test.tsx
│       └── index.ts
├── stories/             # Storybook stories
│   ├── InputField.stories.tsx
│   └── DataTable.stories.tsx
├── types/               # TypeScript type definitions
│   ├── InputField.ts
│   └── DataTable.ts
├── utils/               # Utility functions
│   └── cn.ts           # Class name utility
├── test/               # Test configuration
│   ├── setup.ts
│   └── utils.tsx
├── App.tsx             # Demo application
└── main.tsx           # Application entry point
```

## � Screenshots

### InputField Component - All Variants & States
- Multiple input variants (filled, outlined, ghost)
- Different sizes and validation states
- Password toggle and clear button functionality

### DataTable Component - Interactive Features  
- Sortable columns with visual indicators
- Row selection with checkboxes
- Loading and empty states
- Responsive design

### Storybook Documentation
- Interactive component playground
- Comprehensive documentation
- Live code examples
- Accessibility testing

### Demo Application
- Real-world usage examples
- Combined component showcase
- Professional UI design

> **Note**: Screenshots can be captured from the running Storybook at http://localhost:6006/

## �🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Kevin1skyrj/Frontend-Assignment.git
cd Frontend-Assignment

# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook
```

### Available Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run storybook` - Start Storybook (http://localhost:6006)
- `npm run build-storybook` - Build Storybook for deployment
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run unit tests only
npm run test -- --project unit

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

**Test Coverage:**
- ✅ 24 unit tests passing
- ✅ 15 Storybook tests passing
- ✅ Full component coverage

## 📖 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook for deployment
- `npm test` - Run all tests
- `npm run lint` - Run ESLint

### Component Development Guidelines

1. **TypeScript First** - All components must have proper TypeScript definitions
2. **Accessibility** - Include proper ARIA labels and keyboard navigation
3. **Testing** - Write comprehensive unit tests for all components
4. **Documentation** - Create Storybook stories showing all component variants
5. **Responsive** - Ensure components work on all screen sizes

## 🎨 Design System

### Color Palette
- Primary: Blue (`blue-500`, `blue-600`)
- Success: Green (`green-100`, `green-800`)
- Error: Red (`red-100`, `red-800`)
- Neutral: Gray (`gray-50` to `gray-900`)

### Typography
- Font: System font stack
- Sizes: `text-sm`, `text-base`, `text-lg`
- Weights: `font-medium`, `font-semibold`

### Spacing
- Consistent spacing using Tailwind's spacing scale
- Component padding: `px-3`, `px-4`
- Margins: `mb-2`, `mb-4`, `mb-6`

## 🚀 Deployment

### Storybook Deployment

Deploy to Chromatic:
```bash
npm run build-storybook
npx chromatic --project-token=<your-project-token>
```

Deploy to Vercel:
```bash
npm run build-storybook
# Upload storybook-static folder to Vercel
```

### Application Deployment

```bash
npm run build
# Deploy dist folder to your hosting provider
```

## 📝 Approach & Architecture

### Component Design Philosophy

1. **Composition over Inheritance** - Components are designed to be composable and reusable
2. **Props Interface** - Clear, well-typed props with sensible defaults
3. **Controlled Components** - All form components support controlled usage
4. **Accessibility First** - WCAG compliance built into every component
5. **Performance** - Optimized for minimal re-renders and bundle size

### State Management

- Local component state using `useState`
- Props for external control and data flow
- Event callbacks for parent communication

### Styling Strategy

- **TailwindCSS** for utility-first styling
- **Responsive design** with mobile-first approach
- **Dark mode ready** with CSS custom properties
- **Consistent spacing** using design tokens

### Testing Strategy

- **Unit tests** for all component logic
- **Integration tests** for component interactions
- **Accessibility tests** using testing-library
- **Visual regression** via Storybook

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ using React, TypeScript, and TailwindCSS**
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

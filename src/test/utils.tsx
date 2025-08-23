import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';

// Custom render function that includes providers if needed
const customRender = (ui: ReactElement, options?: RenderOptions) => {
  return render(ui, {
    // Add any providers here if needed (like ThemeProvider, etc.)
    ...options,
  });
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

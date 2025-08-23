import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/utils';
import DataTable from './DataTable';
import type { Column } from '../../types/DataTable';

interface TestUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

const testData: TestUser[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
];

const testColumns: Column<TestUser>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role' },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    // Check headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    
    // Check data
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Editor')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DataTable data={[]} columns={testColumns} loading />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    render(<DataTable data={[]} columns={testColumns} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('shows custom empty message', () => {
    render(
      <DataTable 
        data={[]} 
        columns={testColumns} 
        emptyMessage="No users found" 
      />
    );
    
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('handles column sorting', () => {
    render(<DataTable data={testData} columns={testColumns} />);
    
    const nameHeader = screen.getByText('Name');
    
    // First click - sort ascending
    fireEvent.click(nameHeader);
    const rows = screen.getAllByRole('row').slice(1); // Skip header row
    expect(rows[0]).toHaveTextContent('Bob Johnson');
    
    // Second click - sort descending
    fireEvent.click(nameHeader);
    const rowsDesc = screen.getAllByRole('row').slice(1);
    expect(rowsDesc[0]).toHaveTextContent('John Doe');
  });

  it('renders selectable table with checkboxes', () => {
    const onRowSelect = vi.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable 
        onRowSelect={onRowSelect}
      />
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(4); // 1 header + 3 rows
    
    // Select first row
    fireEvent.click(checkboxes[1]);
    expect(onRowSelect).toHaveBeenCalledWith([testData[0]]);
  });

  it('handles select all functionality', () => {
    const onRowSelect = vi.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable 
        onRowSelect={onRowSelect}
      />
    );
    
    const selectAllCheckbox = screen.getAllByRole('checkbox')[0];
    
    // Select all
    fireEvent.click(selectAllCheckbox);
    expect(onRowSelect).toHaveBeenCalledWith(testData);
    
    // Deselect all
    fireEvent.click(selectAllCheckbox);
    expect(onRowSelect).toHaveBeenCalledWith([]);
  });

  it('renders custom column content', () => {
    const customColumns: Column<TestUser>[] = [
      {
        key: 'name',
        title: 'User',
        dataIndex: 'name',
        render: (name: string, record: TestUser) => (
          <div>
            <strong>{name}</strong>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        ),
      },
    ];
    
    render(<DataTable data={testData} columns={customColumns} />);
    
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('John Doe').tagName).toBe('STRONG');
  });

  it('handles row click when selectable', () => {
    const onRowSelect = vi.fn();
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable 
        onRowSelect={onRowSelect}
      />
    );
    
    const firstRow = screen.getByText('John Doe').closest('tr');
    if (firstRow) {
      fireEvent.click(firstRow);
      expect(onRowSelect).toHaveBeenCalledWith([testData[0]]);
    }
  });

  it('applies correct aria labels', () => {
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable 
      />
    );
    
    expect(screen.getByLabelText('Select all rows')).toBeInTheDocument();
    expect(screen.getByLabelText('Select row 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Select row 2')).toBeInTheDocument();
  });

  it('handles custom rowKey function', () => {
    const customRowKey = (record: TestUser) => `user-${record.id}`;
    const onRowSelect = vi.fn();
    
    render(
      <DataTable 
        data={testData} 
        columns={testColumns} 
        selectable 
        rowKey={customRowKey}
        onRowSelect={onRowSelect}
      />
    );
    
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);
    
    expect(onRowSelect).toHaveBeenCalledWith([testData[0]]);
  });
});

import type { Meta, StoryObj } from '@storybook/react';
import DataTable from '../components/DataTable/DataTable';
import type { Column } from '../types/DataTable';

// Sample data for stories
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  avatar?: string;
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-15',
    avatar: 'JD'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2024-01-14',
    avatar: 'JS'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Viewer',
    status: 'inactive',
    lastLogin: '2024-01-10',
    avatar: 'BJ'
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'Editor',
    status: 'active',
    lastLogin: '2024-01-16',
    avatar: 'AB'
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'Admin',
    status: 'active',
    lastLogin: '2024-01-12',
    avatar: 'CW'
  },
  {
    id: 6,
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    role: 'Manager',
    status: 'active',
    lastLogin: '2024-01-17',
    avatar: 'DP'
  },
];

const userColumns: Column<User>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true,
  },
  {
    key: 'role',
    title: 'Role',
    dataIndex: 'role',
    sortable: true,
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    sortable: true,
    render: (status: string) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          status === 'active' ? 'bg-green-400' : 'bg-red-400'
        }`} />
        {status}
      </span>
    ),
  },
  {
    key: 'lastLogin',
    title: 'Last Login',
    dataIndex: 'lastLogin',
    sortable: true,
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible data table component with sorting, selection, and customizable columns. Built with React, TypeScript, and TailwindCSS for modern applications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    selectable: {
      control: { type: 'boolean' },
      description: 'Enable row selection with checkboxes',
    },
    emptyMessage: {
      control: { type: 'text' },
      description: 'Custom message when no data is available',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleUsers as any,
    columns: userColumns as any,
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">User Management Table</h3>
        <Story />
      </div>
    ),
  ],
};

export const WithSelection: Story = {
  args: {
    data: sampleUsers as any,
    columns: userColumns as any,
    selectable: true,
    onRowSelect: (selectedRows) => console.log('Selected rows:', selectedRows),
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Selectable Table</h3>
          <span className="text-sm text-gray-600">Click checkboxes to select rows</span>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const Loading: Story = {
  args: {
    data: [] as any,
    columns: userColumns as any,
    loading: true,
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Loading State</h3>
        <Story />
      </div>
    ),
  ],
};

export const EmptyState: Story = {
  args: {
    data: [] as any,
    columns: userColumns as any,
    emptyMessage: 'No users found. Try adjusting your search criteria.',
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Empty State</h3>
        <Story />
      </div>
    ),
  ],
};

export const CustomColumns: Story = {
  render: () => {
    const customColumns: Column<User>[] = [
      {
        key: 'id',
        title: 'ID',
        dataIndex: 'id',
        width: '60px',
        sortable: true,
        render: (id: number) => (
          <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
            {id}
          </span>
        ),
      },
      {
        key: 'user',
        title: 'User',
        dataIndex: 'name',
        sortable: true,
        render: (name: string, record: User) => (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm">
              {record.avatar}
            </div>
            <div>
              <div className="font-medium text-gray-900">{name}</div>
              <div className="text-sm text-gray-500">{record.email}</div>
            </div>
          </div>
        ),
      },
      {
        key: 'role',
        title: 'Role',
        dataIndex: 'role',
        sortable: true,
        render: (role: string) => {
          const roleColors = {
            Admin: 'bg-purple-100 text-purple-800 border-purple-200',
            Manager: 'bg-blue-100 text-blue-800 border-blue-200',
            Editor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            Viewer: 'bg-gray-100 text-gray-800 border-gray-200',
          };
          return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${roleColors[role as keyof typeof roleColors] || roleColors.Viewer}`}>
              {role}
            </span>
          );
        },
      },
      {
        key: 'status',
        title: 'Status',
        dataIndex: 'status',
        sortable: true,
        render: (status: string) => (
          <div className="flex items-center">
            <div
              className={`w-2.5 h-2.5 rounded-full mr-2 ${
                status === 'active' ? 'bg-green-400' : 'bg-red-400'
              }`}
            />
            <span className={`text-sm font-medium ${
              status === 'active' ? 'text-green-700' : 'text-red-700'
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        ),
      },
      {
        key: 'lastLogin',
        title: 'Last Login',
        dataIndex: 'lastLogin',
        sortable: true,
        render: (date: string) => (
          <div className="text-sm">
            <div className="text-gray-900">{new Date(date).toLocaleDateString()}</div>
            <div className="text-gray-500">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
          </div>
        ),
      },
      {
        key: 'actions',
        title: 'Actions',
        dataIndex: 'id',
        render: (id: number) => (
          <div className="flex space-x-2">
            <button
              className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
              onClick={() => console.log('Edit user:', id)}
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button
              className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-colors"
              onClick={() => console.log('Delete user:', id)}
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        ),
      },
    ];

    return (
      <div className="p-6 bg-gray-50 rounded-lg">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Advanced Table with Custom Columns</h3>
          <p className="text-sm text-gray-600">
            Demonstrates custom rendering, avatars, styled badges, and action buttons
          </p>
        </div>
        <DataTable
          data={sampleUsers as any}
          columns={customColumns as any}
          className="shadow-sm"
        />
      </div>
    );
  },
};

export const WithSelectionAndActions: Story = {
  render: () => {
    const handleRowSelect = (selectedRows: User[]) => {
      console.log('Selected users:', selectedRows.map(user => user.name));
    };

    return (
      <div className="p-6 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">User Management Dashboard</h3>
            <p className="text-sm text-gray-600">Select users to perform bulk actions</p>
          </div>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add User
            </button>
          </div>
        </div>
        <DataTable
          data={sampleUsers as any}
          columns={userColumns as any}
          selectable
          onRowSelect={handleRowSelect}
          className="shadow-sm"
        />
        <div className="mt-4 text-xs text-gray-500">
          💡 Tip: Click the header checkbox to select all rows, or individual checkboxes to select specific users.
        </div>
      </div>
    );
  },
};

// Large dataset for performance testing
const largeDataset = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@company.com`,
  role: ['Admin', 'Manager', 'Editor', 'Viewer'][index % 4],
  status: index % 5 === 0 ? 'inactive' : 'active' as const,
  lastLogin: `2024-01-${String((index % 30) + 1).padStart(2, '0')}`,
  avatar: `U${index + 1}`,
}));

export const LargeDataset: Story = {
  args: {
    data: largeDataset as any,
    columns: userColumns as any,
    selectable: true,
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-gray-50 rounded-lg">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Performance Test - Large Dataset</h3>
          <p className="text-sm text-gray-600">
            Testing with 50 rows to demonstrate performance and scrolling behavior
          </p>
        </div>
        <div className="max-h-96 overflow-auto">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const Playground: Story = {
  args: {
    data: sampleUsers as any,
    columns: userColumns as any,
    selectable: false,
    loading: false,
    emptyMessage: 'No data available',
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-gray-50 rounded-lg">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Interactive Playground</h3>
          <p className="text-sm text-gray-600">
            Use the controls panel to experiment with different props and configurations
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};

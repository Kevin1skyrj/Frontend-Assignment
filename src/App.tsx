import { useState } from 'react'
import InputField from './components/InputField'
import DataTable from './components/DataTable'
import type { Column } from './types/DataTable'

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  // Sample data for DataTable
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'active' },
  ];

  const columns: Column<User>[] = [
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
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  const handleRowSelect = (selectedRows: User[]) => {
    console.log('Selected users:', selectedRows);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            React Component Library Demo
          </h1>
          
          {/* InputField Demo Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">InputField Component</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Basic Examples</h3>
                
                <InputField
                  label="Search"
                  placeholder="Search users..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  showClearButton
                  onClear={() => setSearchValue('')}
                  leftIcon={
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                />

                <InputField
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  helperText="We'll never share your email"
                />

                <InputField
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  showPasswordToggle
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Variants & States</h3>
                
                <InputField
                  label="Filled Variant"
                  placeholder="Filled input"
                  variant="filled"
                />

                <InputField
                  label="Ghost Variant"
                  placeholder="Ghost input"
                  variant="ghost"
                />

                <InputField
                  label="Error State"
                  placeholder="Invalid input"
                  invalid
                  errorMessage="This field is required"
                />

                <InputField
                  label="Disabled State"
                  placeholder="Disabled input"
                  disabled
                />
              </div>
            </div>
          </section>

          {/* DataTable Demo Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">DataTable Component</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  Interactive data table with sorting and selection capabilities
                </p>
                <span className="text-sm text-gray-500">
                  Click headers to sort • Select rows with checkboxes
                </span>
              </div>
              
              <DataTable
                data={users}
                columns={columns}
                selectable
                onRowSelect={handleRowSelect}
                className="border border-gray-200 rounded-lg overflow-hidden"
              />
            </div>
          </section>

          {/* Features Section */}
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">InputField Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>✅ Multiple variants (filled, outlined, ghost)</li>
                  <li>✅ Different sizes (sm, md, lg)</li>
                  <li>✅ Validation states (error, disabled, loading)</li>
                  <li>✅ Password toggle functionality</li>
                  <li>✅ Clear button support</li>
                  <li>✅ Left and right icons</li>
                  <li>✅ Full accessibility (ARIA labels)</li>
                  <li>✅ TypeScript support</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">DataTable Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>✅ Column sorting (ascending/descending)</li>
                  <li>✅ Row selection (single/multiple)</li>
                  <li>✅ Custom column rendering</li>
                  <li>✅ Loading states</li>
                  <li>✅ Empty state handling</li>
                  <li>✅ Responsive design</li>
                  <li>✅ Full accessibility</li>
                  <li>✅ TypeScript generics</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
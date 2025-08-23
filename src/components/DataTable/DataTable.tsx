import { useState, useMemo } from 'react';
import type { DataTableProps, Column } from '../../types/DataTable';
import { cn } from '../../utils/cn';

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  column: string | null;
  direction: SortDirection;
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className,
  emptyMessage = 'No data available',
  rowKey = 'id',
}: DataTableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });

  // Get row key function
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return record[rowKey] || index;
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return data;
    }

    const column = columns.find(col => col.key === sortState.column);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aValue = a[column.dataIndex];
      const bValue = b[column.dataIndex];

      if (aValue === bValue) return 0;

      let comparison = 0;
      if (aValue == null) comparison = -1;
      else if (bValue == null) comparison = 1;
      else if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortState.direction === 'desc' ? -comparison : comparison;
    });
  }, [data, sortState, columns]);

  // Handle sort
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    setSortState(prev => {
      if (prev.column !== column.key) {
        return { column: column.key, direction: 'asc' };
      }
      
      if (prev.direction === 'asc') {
        return { column: column.key, direction: 'desc' };
      }
      
      if (prev.direction === 'desc') {
        return { column: null, direction: null };
      }
      
      return { column: column.key, direction: 'asc' };
    });
  };

  // Handle row selection
  const handleRowSelect = (record: T, index: number) => {
    if (!selectable) return;

    const key = getRowKey(record, index);
    const newSelectedRows = new Set(selectedRows);
    
    if (newSelectedRows.has(key)) {
      newSelectedRows.delete(key);
    } else {
      newSelectedRows.add(key);
    }
    
    setSelectedRows(newSelectedRows);
    
    if (onRowSelect) {
      const selectedRecords = data.filter((record, idx) => 
        newSelectedRows.has(getRowKey(record, idx))
      );
      onRowSelect(selectedRecords);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (!selectable) return;

    const allKeys = new Set(data.map((record, index) => getRowKey(record, index)));
    const isAllSelected = selectedRows.size === data.length && 
      [...selectedRows].every(key => allKeys.has(key));
    
    if (isAllSelected) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      setSelectedRows(allKeys);
      onRowSelect?.(data);
    }
  };

  // Check if all rows are selected
  const isAllSelected = selectable && selectedRows.size === data.length && data.length > 0;
  const isIndeterminate = selectable && selectedRows.size > 0 && selectedRows.size < data.length;

  // Sort icon component
  const SortIcon = ({ column }: { column: Column<T> }) => {
    if (!column.sortable) return null;
    
    const isActive = sortState.column === column.key;
    const direction = isActive ? sortState.direction : null;
    
    return (
      <span className="ml-2 inline-flex flex-col">
        <svg
          className={cn(
            'w-3 h-3',
            direction === 'asc' ? 'text-blue-600' : 'text-gray-400'
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        <svg
          className={cn(
            'w-3 h-3 -mt-1',
            direction === 'desc' ? 'text-blue-600' : 'text-gray-400'
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    );
  };

  // Loading spinner
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <span className="ml-2 text-gray-600">Loading...</span>
    </div>
  );

  // Empty state
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <svg
        className="w-12 h-12 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <p className="text-lg font-medium">{emptyMessage}</p>
    </div>
  );

  if (loading) {
    return (
      <div className={cn('bg-white rounded-lg border border-gray-200', className)}>
        <LoadingSpinner />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={cn('bg-white rounded-lg border border-gray-200', className)}>
        <EmptyState />
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-lg border border-gray-200 overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {selectable && (
                <th className="w-12 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = isIndeterminate;
                    }}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                    column.sortable && 'cursor-pointer hover:bg-gray-100 transition-colors',
                    column.width && `w-[${column.width}]`
                  )}
                  onClick={() => handleSort(column)}
                  style={column.width ? { width: column.width } : undefined}
                >
                  <div className="flex items-center">
                    {column.title}
                    <SortIcon column={column} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((record, index) => {
              const key = getRowKey(record, index);
              const isSelected = selectedRows.has(key);
              
              return (
                <tr
                  key={key}
                  className={cn(
                    'hover:bg-gray-50 transition-colors',
                    isSelected && 'bg-blue-50',
                    selectable && 'cursor-pointer'
                  )}
                  onClick={() => handleRowSelect(record, index)}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleRowSelect(record, index)}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-4 py-3 text-sm text-gray-900"
                    >
                      {column.render
                        ? column.render(record[column.dataIndex], record, index)
                        : String(record[column.dataIndex] || '')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;

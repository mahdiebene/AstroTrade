import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, ArrowUpDown, TrendingUp, TrendingDown } from 'lucide-react';

interface ExploreMoreProps {
  title: string;
  data: any[];
  columns: Array<{
    key: string;
    label: string;
    sortable?: boolean;
    render?: (item: any) => React.ReactNode;
    mobileHidden?: boolean;
  }>;
  searchKeys: string[];
  defaultSort?: string;
  className?: string;
}

const ExploreMore: React.FC<ExploreMoreProps> = ({
  title,
  data,
  columns,
  searchKeys,
  defaultSort = 'name',
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(defaultSort);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showCount, setShowCount] = useState(10);

  // Filter and sort data
  const filteredData = data
    .filter(item => 
      searchKeys.some(key => 
        item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      // Handle different data types
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const displayedData = filteredData.slice(0, showCount);

  if (!isExpanded) {
    return (
      <div className={`bg-slate-800 rounded-lg p-4 sm:p-6 ${className}`}>
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-between text-left hover:bg-slate-700 p-3 sm:p-4 rounded-lg transition-colors"
        >
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-white truncate">{title}</h3>
            <p className="text-gray-400 text-xs sm:text-sm truncate">View all {data.length} items with advanced filtering and sorting</p>
          </div>
          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-slate-800 rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-white truncate pr-2">{title}</h3>
          <button
            onClick={() => setIsExpanded(false)}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-slate-700 transition-colors flex-shrink-0"
          >
            <ChevronUp className="h-5 w-5" />
          </button>
        </div>
        
        {/* Search and Controls */}
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          
          <select
            value={showCount}
            onChange={(e) => setShowCount(Number(e.target.value))}
            className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value={10}>Show 10</option>
            <option value={25}>Show 25</option>
            <option value={50}>Show 50</option>
            <option value={100}>Show All</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider ${
                    column.sortable !== false ? 'cursor-pointer hover:bg-slate-600' : ''
                  } ${column.mobileHidden ? 'hidden sm:table-cell' : ''}`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span className="truncate">{column.label}</span>
                    {column.sortable !== false && <ArrowUpDown className="h-3 w-3 flex-shrink-0" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {displayedData.map((item, index) => (
              <tr key={item.id || item.code || item.symbol || index} className="hover:bg-slate-750">
                {columns.map((column) => (
                  <td key={column.key} className={`px-3 sm:px-6 py-4 ${column.mobileHidden ? 'hidden sm:table-cell' : ''}`}>
                    {column.render ? column.render(item) : (
                      <div className="text-sm text-white truncate">
                        {item[column.key]?.toString() || 'N/A'}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 sm:p-6 border-t border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-400 space-y-2 sm:space-y-0">
          <span className="truncate">
            Showing {displayedData.length} of {filteredData.length} items
            {searchTerm && ` (filtered from ${data.length} total)`}
          </span>
          {filteredData.length > showCount && (
            <button
              onClick={() => setShowCount(Math.min(showCount + 25, filteredData.length))}
              className="text-blue-400 hover:text-blue-300 text-sm flex-shrink-0"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
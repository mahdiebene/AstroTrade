import React, { useState } from 'react';
import { useFinancialData } from '../hooks/useFinancialData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ExploreMore from '../components/ExploreMore';
import { Search, ArrowUpDown, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const Currencies: React.FC = () => {
  const { currencies, loading, error, refetch } = useFinancialData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'rate' | 'change'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  // Filter and sort currencies for main display (top 10)
  const mainCurrencies = currencies
    .filter(currency => 
      currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'rate':
          aValue = a.rate;
          bValue = b.rate;
          break;
        case 'change':
          aValue = a.changePercent;
          bValue = b.changePercent;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    })
    .slice(0, 10);

  const handleSort = (field: 'name' | 'rate' | 'change') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Columns for ExploreMore component
  const exploreColumns = [
    {
      key: 'name',
      label: 'Currency',
      render: (currency: any) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">{currency.symbol}</span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-white">{currency.name}</div>
            <div className="text-sm text-gray-400">{currency.code}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'rate',
      label: 'Rate (USD)',
      render: (currency: any) => (
        <div className="text-sm font-medium text-white">
          {currency.symbol}{currency.rate.toFixed(4)}
        </div>
      ),
    },
    {
      key: 'change',
      label: '24h Change',
      render: (currency: any) => (
        <div className={`text-sm font-medium ${currency.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {currency.change >= 0 ? '+' : ''}{currency.change.toFixed(4)}
        </div>
      ),
    },
    {
      key: 'changePercent',
      label: 'Change %',
      render: (currency: any) => (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          currency.changePercent >= 0 
            ? 'bg-green-900 text-green-200' 
            : 'bg-red-900 text-red-200'
        }`}>
          {currency.changePercent >= 0 ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1" />
          )}
          {currency.changePercent >= 0 ? '+' : ''}{currency.changePercent.toFixed(2)}%
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Currency Exchange Rates</h1>
        <p className="text-gray-400">
          Real-time exchange rates for major global currencies against USD
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search currencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-gray-400">Total Currencies</span>
          </div>
          <div className="text-2xl font-bold text-white">{currencies.length}</div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-gray-400">Biggest Gainer</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {currencies.sort((a, b) => b.changePercent - a.changePercent)[0]?.code}
          </div>
          <div className="text-sm text-green-400">
            +{currencies.sort((a, b) => b.changePercent - a.changePercent)[0]?.changePercent.toFixed(2)}%
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingDown className="h-5 w-5 text-red-400" />
            <span className="text-sm font-medium text-gray-400">Biggest Loser</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {currencies.sort((a, b) => a.changePercent - b.changePercent)[0]?.code}
          </div>
          <div className="text-sm text-red-400">
            {currencies.sort((a, b) => a.changePercent - b.changePercent)[0]?.changePercent.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Main Currency Table */}
      <div className="bg-slate-800 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Top Currencies</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-slate-600"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Currency</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-slate-600"
                  onClick={() => handleSort('rate')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Rate (USD)</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-slate-600"
                  onClick={() => handleSort('change')}
                >
                  <div className="flex items-center space-x-1">
                    <span>24h Change</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Change %
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {mainCurrencies.map((currency) => (
                <tr key={currency.code} className="hover:bg-slate-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {currency.symbol}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{currency.name}</div>
                        <div className="text-sm text-gray-400">{currency.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {currency.symbol}{currency.rate.toFixed(4)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${currency.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {currency.change >= 0 ? '+' : ''}{currency.change.toFixed(4)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      currency.changePercent >= 0 
                        ? 'bg-green-900 text-green-200' 
                        : 'bg-red-900 text-red-200'
                    }`}>
                      {currency.changePercent >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {currency.changePercent >= 0 ? '+' : ''}{currency.changePercent.toFixed(2)}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Explore More Section */}
      <ExploreMore
        title={`Explore All ${currencies.length} Currencies`}
        data={currencies}
        columns={exploreColumns}
        searchKeys={['name', 'code', 'symbol']}
        defaultSort="changePercent"
        className="mb-8"
      />

      {mainCurrencies.length === 0 && (
        <div className="text-center text-gray-400 mt-8">
          No currencies found matching your search.
        </div>
      )}
    </div>
  );
};

export default Currencies;
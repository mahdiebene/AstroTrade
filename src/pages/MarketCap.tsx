import React, { useState } from 'react';
import { useFinancialData } from '../hooks/useFinancialData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ExploreMore from '../components/ExploreMore';
import CompanyLogo from '../components/CompanyLogo';
import { Search, ArrowUpDown, Building2, TrendingUp, TrendingDown, Filter } from 'lucide-react';

const MarketCap: React.FC = () => {
  const { companies, loading, error, refetch } = useFinancialData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'marketCap' | 'change'>('marketCap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<'all' | 'gainers' | 'losers'>('all');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  // Filter and sort companies for main display (top 15)
  let mainCompanies = companies
    .filter(company => 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Apply gain/loss filter
  if (filterType === 'gainers') {
    mainCompanies = mainCompanies.filter(company => company.changePercent > 0);
  } else if (filterType === 'losers') {
    mainCompanies = mainCompanies.filter(company => company.changePercent < 0);
  }

  // Sort companies
  mainCompanies = mainCompanies.sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'marketCap':
        aValue = a.marketCap;
        bValue = b.marketCap;
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
  }).slice(0, 15);

  const handleSort = (field: 'name' | 'price' | 'marketCap' | 'change') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  // Format price for mobile display
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(1)}K`;
    } else {
      return `$${price.toFixed(2)}`;
    }
  };

  const topGainer = companies.sort((a, b) => b.changePercent - a.changePercent)[0];
  const topLoser = companies.sort((a, b) => a.changePercent - b.changePercent)[0];
  const totalVolume = companies.reduce((sum, company) => sum + company.volume, 0);

  // Columns for ExploreMore component
  const exploreColumns = [
    {
      key: 'name',
      label: 'Company',
      render: (company: any) => (
        <div className="flex items-center">
          <CompanyLogo symbol={company.symbol} name={company.name} className="h-6 w-6 sm:h-8 sm:w-8" />
          <div className="ml-2 sm:ml-4 min-w-0">
            <div className="text-sm font-medium text-white truncate">{company.name}</div>
            <div className="text-xs sm:text-sm text-gray-400">{company.symbol}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      render: (company: any) => (
        <div className="text-sm font-medium text-white">
          {formatPrice(company.price)}
        </div>
      ),
    },
    {
      key: 'changePercent',
      label: 'Change',
      render: (company: any) => (
        <div>
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            company.changePercent >= 0 
              ? 'bg-green-900 text-green-200' 
              : 'bg-red-900 text-red-200'
          }`}>
            {company.changePercent >= 0 ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            {company.changePercent >= 0 ? '+' : ''}{company.changePercent.toFixed(2)}%
          </div>
          <div className={`text-xs mt-1 ${company.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {company.change >= 0 ? '+' : ''}${company.change.toFixed(2)}
          </div>
        </div>
      ),
    },
    {
      key: 'marketCap',
      label: 'Market Cap',
      render: (company: any) => (
        <div className="text-sm text-white">{formatNumber(company.marketCap)}</div>
      ),
    },
    {
      key: 'volume',
      label: 'Volume',
      mobileHidden: true,
      render: (company: any) => (
        <div className="text-sm text-gray-400">{formatNumber(company.volume)}</div>
      ),
    },
    {
      key: 'sector',
      label: 'Sector',
      mobileHidden: true,
      render: (company: any) => (
        <div className="text-sm text-gray-400">{company.sector}</div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Company Market Capitalization</h1>
        <p className="text-gray-400 text-sm sm:text-base">
          Real-time stock prices and market cap data for major companies with authentic logos
        </p>
      </div>

      {/* Controls */}
      <div className="mb-4 sm:mb-6 flex flex-col lg:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        
        <div className="flex space-x-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | 'gainers' | 'losers')}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All Companies</option>
            <option value="gainers">Top Gainers</option>
            <option value="losers">Top Losers</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-slate-800 rounded-lg p-3 sm:p-6">
          <div className="flex items-center space-x-2 mb-2">
            <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            <span className="text-xs sm:text-sm font-medium text-gray-400">Total Companies</span>
          </div>
          <div className="text-lg sm:text-2xl font-bold text-white">{companies.length}</div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-3 sm:p-6">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
            <span className="text-xs sm:text-sm font-medium text-gray-400">Top Gainer</span>
          </div>
          <div className="text-lg sm:text-2xl font-bold text-white">{topGainer?.symbol}</div>
          <div className="text-xs sm:text-sm text-green-400">+{topGainer?.changePercent.toFixed(2)}%</div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-3 sm:p-6">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-400" />
            <span className="text-xs sm:text-sm font-medium text-gray-400">Top Loser</span>
          </div>
          <div className="text-lg sm:text-2xl font-bold text-white">{topLoser?.symbol}</div>
          <div className="text-xs sm:text-sm text-red-400">{topLoser?.changePercent.toFixed(2)}%</div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-3 sm:p-6">
          <div className="flex items-center space-x-2 mb-2">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            <span className="text-xs sm:text-sm font-medium text-gray-400">Total Volume</span>
          </div>
          <div className="text-lg sm:text-2xl font-bold text-white">{formatNumber(totalVolume)}</div>
        </div>
      </div>

      {/* Main Companies Table */}
      <div className="bg-slate-800 rounded-lg overflow-hidden mb-6 sm:mb-8">
        <div className="px-4 sm:px-6 py-4 border-b border-slate-700">
          <h2 className="text-lg sm:text-xl font-semibold text-white">Top Companies by Market Cap</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th 
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-slate-600"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Company</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th 
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-slate-600"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Price</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th 
                  className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-slate-600"
                  onClick={() => handleSort('change')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Change</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th 
                  className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-slate-600"
                  onClick={() => handleSort('marketCap')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Market Cap</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Volume
                </th>
                <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Sector
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {mainCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-slate-750">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CompanyLogo symbol={company.symbol} name={company.name} className="h-6 w-6 sm:h-8 sm:w-8" />
                      <div className="ml-2 sm:ml-4 min-w-0">
                        <div className="text-sm font-medium text-white truncate">{company.name}</div>
                        <div className="text-xs sm:text-sm text-gray-400">{company.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {formatPrice(company.price)}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      company.changePercent >= 0 
                        ? 'bg-green-900 text-green-200' 
                        : 'bg-red-900 text-red-200'
                    }`}>
                      {company.changePercent >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {company.changePercent >= 0 ? '+' : ''}{company.changePercent.toFixed(2)}%
                    </div>
                    <div className={`text-xs mt-1 ${company.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {company.change >= 0 ? '+' : ''}${company.change.toFixed(2)}
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{formatNumber(company.marketCap)}</div>
                  </td>
                  <td className="hidden lg:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">{formatNumber(company.volume)}</div>
                  </td>
                  <td className="hidden lg:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">{company.sector}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Explore More Section */}
      <ExploreMore
        title={`Explore All ${companies.length} Companies`}
        data={companies}
        columns={exploreColumns}
        searchKeys={['name', 'symbol', 'sector']}
        defaultSort="marketCap"
        className="mb-6 sm:mb-8"
      />

      {mainCompanies.length === 0 && (
        <div className="text-center text-gray-400 mt-8">
          No companies found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default MarketCap;
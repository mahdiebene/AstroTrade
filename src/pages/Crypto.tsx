import React, { useState } from 'react';
import { useFinancialData } from '../hooks/useFinancialData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ExploreMore from '../components/ExploreMore';
import CryptoIcon from '../components/CryptoIcon';
import { Search, ArrowUpDown, Bitcoin, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const Crypto: React.FC = () => {
  const { cryptocurrencies, loading, error, refetch } = useFinancialData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'rank' | 'price' | 'marketCap' | 'change'>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  // Filter and sort cryptocurrencies for main display (top 15)
  const mainCryptos = cryptocurrencies
    .filter(crypto => 
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
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
          aValue = a.changePercent24h;
          bValue = b.changePercent24h;
          break;
        default:
          aValue = a.rank;
          bValue = b.rank;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    })
    .slice(0, 15);

  const handleSort = (field: 'rank' | 'price' | 'marketCap' | 'change') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const totalMarketCap = cryptocurrencies.reduce((sum, crypto) => sum + crypto.marketCap, 0);

  // Columns for ExploreMore component
  const exploreColumns = [
    {
      key: 'rank',
      label: 'Rank',
      render: (crypto: any) => (
        <div className="text-sm font-medium text-white">#{crypto.rank}</div>
      ),
    },
    {
      key: 'name',
      label: 'Name',
      render: (crypto: any) => (
        <div className="flex items-center">
          <CryptoIcon symbol={crypto.symbol} className="h-8 w-8" />
          <div className="ml-4">
            <div className="text-sm font-medium text-white">{crypto.name}</div>
            <div className="text-sm text-gray-400">{crypto.symbol}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      label: 'Price',
      render: (crypto: any) => (
        <div className="text-sm font-medium text-white">
          ${crypto.price.toLocaleString()}
        </div>
      ),
    },
    {
      key: 'changePercent24h',
      label: '24h Change',
      render: (crypto: any) => (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          crypto.changePercent24h >= 0 
            ? 'bg-green-900 text-green-200' 
            : 'bg-red-900 text-red-200'
        }`}>
          {crypto.changePercent24h >= 0 ? (
            <TrendingUp className="h-3 w-3 mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1" />
          )}
          {crypto.changePercent24h >= 0 ? '+' : ''}{crypto.changePercent24h.toFixed(2)}%
        </div>
      ),
    },
    {
      key: 'marketCap',
      label: 'Market Cap',
      render: (crypto: any) => (
        <div className="text-sm text-white">{formatNumber(crypto.marketCap)}</div>
      ),
    },
    {
      key: 'volume24h',
      label: 'Volume 24h',
      render: (crypto: any) => (
        <div className="text-sm text-gray-400">{formatNumber(crypto.volume24h)}</div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Cryptocurrency Prices</h1>
        <p className="text-gray-400">
          Real-time cryptocurrency prices, market cap, and 24-hour changes with authentic symbols
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-2">
            <Bitcoin className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-gray-400">Total Cryptos</span>
          </div>
          <div className="text-2xl font-bold text-white">{cryptocurrencies.length}</div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-gray-400">Total Market Cap</span>
          </div>
          <div className="text-2xl font-bold text-white">{formatNumber(totalMarketCap)}</div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-gray-400">Biggest Gainer</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {cryptocurrencies.sort((a, b) => b.changePercent24h - a.changePercent24h)[0]?.symbol}
          </div>
          <div className="text-sm text-green-400">
            +{cryptocurrencies.sort((a, b) => b.changePercent24h - a.changePercent24h)[0]?.changePercent24h.toFixed(2)}%
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingDown className="h-5 w-5 text-red-400" />
            <span className="text-sm font-medium text-gray-400">Biggest Loser</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {cryptocurrencies.sort((a, b) => a.changePercent24h - b.changePercent24h)[0]?.symbol}
          </div>
          <div className="text-sm text-red-400">
            {cryptocurrencies.sort((a, b) => a.changePercent24h - b.changePercent24h)[0]?.changePercent24h.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Main Crypto Table */}
      <div className="bg-slate-800 rounded-lg overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white">Top Cryptocurrencies</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-slate-600"
                  onClick={() => handleSort('rank')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Rank</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-slate-600"
                  onClick={() => handleSort('price')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Price</span>
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
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-slate-600"
                  onClick={() => handleSort('marketCap')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Market Cap</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Volume 24h
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {mainCryptos.map((crypto) => (
                <tr key={crypto.id} className="hover:bg-slate-750">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">#{crypto.rank}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CryptoIcon symbol={crypto.symbol} className="h-8 w-8" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{crypto.name}</div>
                        <div className="text-sm text-gray-400">{crypto.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      ${crypto.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      crypto.changePercent24h >= 0 
                        ? 'bg-green-900 text-green-200' 
                        : 'bg-red-900 text-red-200'
                    }`}>
                      {crypto.changePercent24h >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {crypto.changePercent24h >= 0 ? '+' : ''}{crypto.changePercent24h.toFixed(2)}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{formatNumber(crypto.marketCap)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">{formatNumber(crypto.volume24h)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Explore More Section */}
      <ExploreMore
        title={`Explore All ${cryptocurrencies.length} Cryptocurrencies`}
        data={cryptocurrencies}
        columns={exploreColumns}
        searchKeys={['name', 'symbol']}
        defaultSort="rank"
        className="mb-8"
      />

      {mainCryptos.length === 0 && (
        <div className="text-center text-gray-400 mt-8">
          No cryptocurrencies found matching your search.
        </div>
      )}
    </div>
  );
};

export default Crypto;
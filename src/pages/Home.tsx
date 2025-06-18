import React from 'react';
import { useFinancialData } from '../hooks/useFinancialData';
import DataCard from '../components/DataCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { 
  DollarSign, 
  Bitcoin, 
  TrendingUp, 
  Building2, 
  Newspaper, 
  Clock,
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { 
    currencies, 
    cryptocurrencies, 
    companies, 
    news, 
    marketSummary, 
    loading, 
    error, 
    refetch 
  } = useFinancialData();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  // Get top performers
  const topCurrency = currencies.sort((a, b) => b.changePercent - a.changePercent)[0];
  const topCrypto = cryptocurrencies.sort((a, b) => b.changePercent24h - a.changePercent24h)[0];
  const topStock = companies.sort((a, b) => b.changePercent - a.changePercent)[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Real-Time Financial Data Platform
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Stay ahead of the markets with live data on currencies, cryptocurrencies, 
          stock market capitalization, and breaking financial news.
        </p>
      </div>

      {/* Market Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <DataCard
          title="Top Currency Gainer"
          value={`${topCurrency?.symbol}${topCurrency?.rate.toFixed(4)}`}
          changePercent={topCurrency?.changePercent}
          subtitle={topCurrency?.name}
          icon={<DollarSign className="h-5 w-5" />}
        />
        
        <DataCard
          title="Top Crypto Performer"
          value={`$${topCrypto?.price.toLocaleString()}`}
          changePercent={topCrypto?.changePercent24h}
          subtitle={topCrypto?.name}
          icon={<Bitcoin className="h-5 w-5" />}
        />
        
        <DataCard
          title="Top Stock Gainer"
          value={`$${topStock?.price.toFixed(2)}`}
          changePercent={topStock?.changePercent}
          subtitle={topStock?.name}
          icon={<Building2 className="h-5 w-5" />}
        />
        
        <DataCard
          title="Total Market Cap"
          value={`$${(marketSummary?.totalMarketCap || 0) / 1e12}T`}
          changePercent={marketSummary?.marketCapChange}
          subtitle="Global Markets"
          icon={<TrendingUp className="h-5 w-5" />}
        />
      </div>

      {/* Quick Access Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Market Highlights */}
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Market Highlights</h2>
            <TrendingUp className="h-6 w-6 text-blue-400" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div>
                <div className="font-medium text-white">{topCurrency?.name}</div>
                <div className="text-sm text-gray-400">Currency</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">{topCurrency?.symbol}{topCurrency?.rate.toFixed(4)}</div>
                <div className={`text-sm ${topCurrency && topCurrency.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {topCurrency?.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div>
                <div className="font-medium text-white">{topCrypto?.name}</div>
                <div className="text-sm text-gray-400">Cryptocurrency</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">${topCrypto?.price.toLocaleString()}</div>
                <div className={`text-sm ${topCrypto && topCrypto.changePercent24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {topCrypto?.changePercent24h.toFixed(2)}%
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div>
                <div className="font-medium text-white">{topStock?.name}</div>
                <div className="text-sm text-gray-400">Stock</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-white">${topStock?.price.toFixed(2)}</div>
                <div className={`text-sm ${topStock && topStock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {topStock?.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Breaking News */}
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Breaking News</h2>
            <Newspaper className="h-6 w-6 text-blue-400" />
          </div>
          
          <div className="space-y-4">
            {news.slice(0, 3).map((article) => (
              <div key={article.id} className="border-b border-slate-700 last:border-b-0 pb-4 last:pb-0">
                <h3 className="font-medium text-white mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{article.source}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(article.publishedAt).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Link 
            to="/news" 
            className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm mt-4"
          >
            <span>View all news</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link 
          to="/currencies" 
          className="bg-slate-800 hover:bg-slate-700 rounded-lg p-6 transition-colors group"
        >
          <DollarSign className="h-8 w-8 text-blue-400 mb-4 group-hover:text-blue-300" />
          <h3 className="text-lg font-semibold text-white mb-2">Currency Rates</h3>
          <p className="text-gray-400 text-sm">Real-time exchange rates for major global currencies</p>
        </Link>
        
        <Link 
          to="/crypto" 
          className="bg-slate-800 hover:bg-slate-700 rounded-lg p-6 transition-colors group"
        >
          <Bitcoin className="h-8 w-8 text-blue-400 mb-4 group-hover:text-blue-300" />
          <h3 className="text-lg font-semibold text-white mb-2">Cryptocurrency</h3>
          <p className="text-gray-400 text-sm">Live prices and market data for top cryptocurrencies</p>
        </Link>
        
        <Link 
          to="/market-cap" 
          className="bg-slate-800 hover:bg-slate-700 rounded-lg p-6 transition-colors group"
        >
          <Building2 className="h-8 w-8 text-blue-400 mb-4 group-hover:text-blue-300" />
          <h3 className="text-lg font-semibold text-white mb-2">Market Cap</h3>
          <p className="text-gray-400 text-sm">Top rising and falling companies by market capitalization</p>
        </Link>
        
        <Link 
          to="/news" 
          className="bg-slate-800 hover:bg-slate-700 rounded-lg p-6 transition-colors group"
        >
          <Newspaper className="h-8 w-8 text-blue-400 mb-4 group-hover:text-blue-300" />
          <h3 className="text-lg font-semibold text-white mb-2">Financial News</h3>
          <p className="text-gray-400 text-sm">Latest breaking news from the financial world</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
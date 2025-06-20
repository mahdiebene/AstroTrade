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

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    return `$${(value / 1e6).toFixed(1)}M`;
  };

  // Format currency value for mobile
  const formatCurrencyValue = (currency: any) => {
    if (!currency) return 'N/A';
    const rate = currency.rate;
    if (rate < 0.01) {
      return `${currency.symbol}${rate.toFixed(6)}`;
    } else if (rate < 1) {
      return `${currency.symbol}${rate.toFixed(4)}`;
    } else if (rate > 1000) {
      return `${currency.symbol}${(rate / 1000).toFixed(1)}K`;
    } else {
      return `${currency.symbol}${rate.toFixed(2)}`;
    }
  };

  // Format crypto value for mobile
  const formatCryptoValue = (crypto: any) => {
    if (!crypto) return 'N/A';
    const price = crypto.price;
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(1)}K`;
    } else if (price < 0.01) {
      return `$${price.toFixed(6)}`;
    } else {
      return `$${price.toLocaleString()}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Hero Section */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
          Real-Time Financial Data Platform
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4">
          Stay ahead of the markets with live data on currencies, cryptocurrencies, 
          stock market capitalization, and breaking financial news.
        </p>
      </div>

      {/* Market Summary Cards - Mobile Optimized */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12">
        <DataCard
          title="Top Currency"
          value={formatCurrencyValue(topCurrency)}
          changePercent={topCurrency?.changePercent}
          subtitle={topCurrency?.name}
          icon={<DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />}
        />
        
        <DataCard
          title="Top Crypto"
          value={formatCryptoValue(topCrypto)}
          changePercent={topCrypto?.changePercent24h}
          subtitle={topCrypto?.name}
          icon={<Bitcoin className="h-4 w-4 sm:h-5 sm:w-5" />}
        />
        
        <DataCard
          title="Top Stock"
          value={`$${topStock?.price.toFixed(2)}`}
          changePercent={topStock?.changePercent}
          subtitle={topStock?.name}
          icon={<Building2 className="h-4 w-4 sm:h-5 sm:w-5" />}
        />
        
        <DataCard
          title="Market Cap"
          value={formatMarketCap(marketSummary?.totalMarketCap || 0)}
          changePercent={marketSummary?.marketCapChange}
          subtitle="Global Markets"
          icon={<TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />}
        />
      </div>

      {/* Quick Access Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
        {/* Market Highlights */}
        <div className="bg-slate-800 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-white">Market Highlights</h2>
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 flex-shrink-0" />
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div className="min-w-0 flex-1">
                <div className="font-medium text-white truncate text-sm sm:text-base">{topCurrency?.name}</div>
                <div className="text-xs sm:text-sm text-gray-400">Currency</div>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <div className="font-bold text-white text-xs sm:text-sm lg:text-base">
                  {formatCurrencyValue(topCurrency)}
                </div>
                <div className={`text-xs sm:text-sm ${topCurrency && topCurrency.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {topCurrency?.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div className="min-w-0 flex-1">
                <div className="font-medium text-white truncate text-sm sm:text-base">{topCrypto?.name}</div>
                <div className="text-xs sm:text-sm text-gray-400">Cryptocurrency</div>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <div className="font-bold text-white text-xs sm:text-sm lg:text-base">
                  {formatCryptoValue(topCrypto)}
                </div>
                <div className={`text-xs sm:text-sm ${topCrypto && topCrypto.changePercent24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {topCrypto?.changePercent24h.toFixed(2)}%
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div className="min-w-0 flex-1">
                <div className="font-medium text-white truncate text-sm sm:text-base">{topStock?.name}</div>
                <div className="text-xs sm:text-sm text-gray-400">Stock</div>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <div className="font-bold text-white text-xs sm:text-sm lg:text-base">
                  ${topStock?.price.toFixed(2)}
                </div>
                <div className={`text-xs sm:text-sm ${topStock && topStock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {topStock?.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Breaking News */}
        <div className="bg-slate-800 rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-white">Breaking News</h2>
            <Newspaper className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 flex-shrink-0" />
          </div>
          
          <div className="space-y-4">
            {news.slice(0, 3).map((article) => (
              <div key={article.id} className="border-b border-slate-700 last:border-b-0 pb-4 last:pb-0">
                <h3 className="font-medium text-white mb-2 line-clamp-2 text-sm sm:text-base leading-tight">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
                  <span className="truncate flex-1">{article.source}</span>
                  <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(article.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Link 
          to="/currencies" 
          className="bg-slate-800 hover:bg-slate-700 rounded-lg p-4 sm:p-6 transition-colors group"
        >
          <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 mb-3 sm:mb-4 group-hover:text-blue-300" />
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Currency Rates</h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Real-time exchange rates for major global currencies</p>
        </Link>
        
        <Link 
          to="/crypto" 
          className="bg-slate-800 hover:bg-slate-700 rounded-lg p-4 sm:p-6 transition-colors group"
        >
          <Bitcoin className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 mb-3 sm:mb-4 group-hover:text-blue-300" />
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Cryptocurrency</h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Live prices and market data for top cryptocurrencies</p>
        </Link>
        
        <Link 
          to="/market-cap" 
          className="bg-slate-800 hover:bg-slate-700 rounded-lg p-4 sm:p-6 transition-colors group"
        >
          <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 mb-3 sm:mb-4 group-hover:text-blue-300" />
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Market Cap</h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Top rising and falling companies by market capitalization</p>
        </Link>
        
        <Link 
          to="/news" 
          className="bg-slate-800 hover:bg-slate-700 rounded-lg p-4 sm:p-6 transition-colors group"
        >
          <Newspaper className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 mb-3 sm:mb-4 group-hover:text-blue-300" />
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Financial News</h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">Latest breaking news from the financial world</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
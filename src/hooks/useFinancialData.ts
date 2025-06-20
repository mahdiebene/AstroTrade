import { useState, useEffect } from 'react';
import { Currency, Cryptocurrency, Company, NewsItem, MarketSummary } from '../types';
import { apiService } from '../services/api';

// Custom hook for managing real-time financial data with enhanced error handling
export const useFinancialData = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [marketSummary, setMarketSummary] = useState<MarketSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all financial data with better error handling and mobile optimization
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Always provide fallback data first to prevent empty states
      const fallbackData = apiService.getFallbackData();
      setCurrencies(fallbackData.currencies);
      setCryptocurrencies(fallbackData.cryptocurrencies);
      setCompanies(fallbackData.companies);
      setNews(fallbackData.news);
      setMarketSummary(fallbackData.marketSummary);
      
      // Then try to fetch real data with timeout and better error handling
      const fetchPromises = [
        apiService.fetchCurrencies().catch(() => ({ data: fallbackData.currencies, error: 'Currency API unavailable' })),
        apiService.fetchCryptocurrencies().catch(() => ({ data: fallbackData.cryptocurrencies, error: 'Crypto API unavailable' })),
        apiService.fetchStocks().catch(() => ({ data: fallbackData.companies, error: 'Stock API unavailable' })),
        apiService.fetchNews().catch(() => ({ data: fallbackData.news, error: 'News API unavailable' })),
      ];

      // Set a reasonable timeout for all API calls (reduced for mobile)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('API timeout')), 6000)
      );

      try {
        const results = await Promise.race([
          Promise.allSettled(fetchPromises),
          timeoutPromise
        ]) as PromiseSettledResult<any>[];

        let hasRealData = false;

        // Process results and update with real data if available
        results.forEach((result, index) => {
          if (result.status === 'fulfilled' && result.value.data && result.value.data.length > 0) {
            hasRealData = true;
            switch (index) {
              case 0:
                setCurrencies(result.value.data);
                break;
              case 1:
                setCryptocurrencies(result.value.data);
                break;
              case 2:
                setCompanies(result.value.data);
                break;
              case 3:
                setNews(result.value.data);
                break;
            }
          }
        });

        // Generate market summary from available data with real-time sync
        const currentCurrencies = currencies.length > 0 ? currencies : fallbackData.currencies;
        const currentCryptos = cryptocurrencies.length > 0 ? cryptocurrencies : fallbackData.cryptocurrencies;
        const currentStocks = companies.length > 0 ? companies : fallbackData.companies;

        // Update market summary with current timestamp
        const topCurrencyGainer = currentCurrencies.sort((a, b) => b.changePercent - a.changePercent)[0];
        const topCryptoGainer = currentCryptos.sort((a, b) => b.changePercent24h - a.changePercent24h)[0];
        const topStockGainer = currentStocks.sort((a, b) => b.changePercent - a.changePercent)[0];

        const gainers = [
          { name: topCurrencyGainer?.name, change: topCurrencyGainer?.changePercent || 0, type: 'currency' as const },
          { name: topCryptoGainer?.name, change: topCryptoGainer?.changePercent24h || 0, type: 'crypto' as const },
          { name: topStockGainer?.name, change: topStockGainer?.changePercent || 0, type: 'stock' as const },
        ].filter(item => item.name);

        const topGainer = gainers.sort((a, b) => b.change - a.change)[0];
        const topLoser = gainers.sort((a, b) => a.change - b.change)[0];

        const totalCryptoMarketCap = currentCryptos.reduce((sum, crypto) => sum + (crypto.marketCap || 0), 0);
        const totalStockMarketCap = currentStocks.reduce((sum, stock) => sum + (stock.marketCap || 0), 0);
        const totalMarketCap = totalCryptoMarketCap + totalStockMarketCap;

        setMarketSummary({
          topGainer: {
            name: topGainer?.name || 'N/A',
            change: topGainer?.change || 0,
            type: topGainer?.type || 'stock',
          },
          topLoser: {
            name: topLoser?.name || 'N/A',
            change: topLoser?.change || 0,
            type: topLoser?.type || 'stock',
          },
          totalMarketCap,
          marketCapChange: (Math.random() - 0.5) * 4, // Simulated overall market change
        });

      } catch (timeoutError) {
        console.log('API calls timed out, using fallback data with real-time sync');
        // Fallback data is already set with current timestamps, so we just continue
      }

    } catch (err) {
      console.error('Error in fetchData:', err);
      // Don't set error if we have fallback data
      if (currencies.length === 0 && cryptocurrencies.length === 0 && companies.length === 0) {
        setError('Unable to load financial data. Please check your internet connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Set up auto-refresh every 2 minutes for real-time updates (more frequent for better sync)
    const interval = setInterval(fetchData, 120000); // 2 minutes
    
    return () => clearInterval(interval);
  }, []);

  return {
    currencies,
    cryptocurrencies,
    companies,
    news,
    marketSummary,
    loading,
    error,
    refetch: fetchData,
  };
};
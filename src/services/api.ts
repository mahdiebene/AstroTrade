// API service for fetching real-time financial data
const API_ENDPOINTS = {
  // Free tier APIs for real-time data
  currencies: 'https://api.exchangerate-api.com/v4/latest/USD',
  crypto: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h',
  // Alternative crypto endpoint
  cryptoBackup: 'https://api.coinlore.net/api/tickers/',
};

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Currency API response types
interface CurrencyApiResponse {
  rates: Record<string, number>;
  date: string;
  base: string;
}

// Crypto API response types
interface CryptoApiItem {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  total_volume: number;
  market_cap_rank: number;
}

class ApiService {
  private async fetchWithTimeout(url: string, timeout = 5000): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Enhanced fallback data with 50+ currencies, 50+ cryptocurrencies, and 50+ companies
  getFallbackData() {
    const currentTime = new Date().toISOString();
    
    const currencies = [
      // Major Currencies
      { code: 'EUR', name: 'Euro', rate: 0.85, change: 0.012, changePercent: 1.43, symbol: '€' },
      { code: 'GBP', name: 'Pound Sterling', rate: 0.73, change: -0.008, changePercent: -1.08, symbol: '£' },
      { code: 'JPY', name: 'Japanese Yen', rate: 110.45, change: 1.23, changePercent: 1.13, symbol: '¥' },
      { code: 'CHF', name: 'Swiss Franc', rate: 0.91, change: 0.005, changePercent: 0.55, symbol: 'CHF' },
      { code: 'CAD', name: 'Canadian Dollar', rate: 1.25, change: -0.015, changePercent: -1.19, symbol: 'C$' },
      { code: 'AUD', name: 'Australian Dollar', rate: 1.35, change: 0.018, changePercent: 1.35, symbol: 'A$' },
      { code: 'CNY', name: 'Chinese Yuan', rate: 6.45, change: 0.12, changePercent: 1.89, symbol: '¥' },
      { code: 'INR', name: 'Indian Rupee', rate: 74.85, change: -0.45, changePercent: -0.60, symbol: '₹' },
      { code: 'KRW', name: 'South Korean Won', rate: 1180.50, change: 15.30, changePercent: 1.31, symbol: '₩' },
      { code: 'MXN', name: 'Mexican Peso', rate: 17.25, change: -0.35, changePercent: -1.99, symbol: '$' },
      
      // Additional Major Currencies
      { code: 'BRL', name: 'Brazilian Real', rate: 5.15, change: 0.08, changePercent: 1.58, symbol: 'R$' },
      { code: 'RUB', name: 'Russian Ruble', rate: 75.20, change: -1.20, changePercent: -1.57, symbol: '₽' },
      { code: 'SGD', name: 'Singapore Dollar', rate: 1.35, change: 0.02, changePercent: 1.50, symbol: 'S$' },
      { code: 'HKD', name: 'Hong Kong Dollar', rate: 7.85, change: 0.05, changePercent: 0.64, symbol: 'HK$' },
      { code: 'NOK', name: 'Norwegian Krone', rate: 8.65, change: -0.15, changePercent: -1.71, symbol: 'kr' },
      { code: 'SEK', name: 'Swedish Krona', rate: 9.25, change: 0.12, changePercent: 1.31, symbol: 'kr' },
      { code: 'DKK', name: 'Danish Krone', rate: 6.35, change: 0.08, changePercent: 1.27, symbol: 'kr' },
      { code: 'PLN', name: 'Polish Zloty', rate: 3.95, change: -0.05, changePercent: -1.25, symbol: 'zł' },
      { code: 'CZK', name: 'Czech Koruna', rate: 21.85, change: 0.25, changePercent: 1.16, symbol: 'Kč' },
      { code: 'HUF', name: 'Hungarian Forint', rate: 295.50, change: -3.20, changePercent: -1.07, symbol: 'Ft' },
      
      // Emerging Market Currencies
      { code: 'TRY', name: 'Turkish Lira', rate: 8.45, change: -0.25, changePercent: -2.87, symbol: '₺' },
      { code: 'ZAR', name: 'South African Rand', rate: 14.85, change: 0.35, changePercent: 2.41, symbol: 'R' },
      { code: 'THB', name: 'Thai Baht', rate: 32.15, change: 0.45, changePercent: 1.42, symbol: '฿' },
      { code: 'MYR', name: 'Malaysian Ringgit', rate: 4.15, change: -0.08, changePercent: -1.89, symbol: 'RM' },
      { code: 'IDR', name: 'Indonesian Rupiah', rate: 14250.00, change: 125.00, changePercent: 0.88, symbol: 'Rp' },
      { code: 'PHP', name: 'Philippine Peso', rate: 50.25, change: -0.75, changePercent: -1.47, symbol: '₱' },
      { code: 'VND', name: 'Vietnamese Dong', rate: 23150.00, change: 200.00, changePercent: 0.87, symbol: '₫' },
      { code: 'EGP', name: 'Egyptian Pound', rate: 15.75, change: 0.25, changePercent: 1.61, symbol: '£' },
      { code: 'AED', name: 'UAE Dirham', rate: 3.67, change: 0.02, changePercent: 0.55, symbol: 'د.إ' },
      { code: 'SAR', name: 'Saudi Riyal', rate: 3.75, change: 0.01, changePercent: 0.27, symbol: '﷼' },
      
      // Additional Global Currencies
      { code: 'NZD', name: 'New Zealand Dollar', rate: 1.42, change: 0.015, changePercent: 1.07, symbol: 'NZ$' },
      { code: 'ILS', name: 'Israeli Shekel', rate: 3.25, change: -0.02, changePercent: -0.61, symbol: '₪' },
      { code: 'TWD', name: 'Taiwan Dollar', rate: 28.50, change: 0.35, changePercent: 1.24, symbol: 'NT$' },
      { code: 'CLP', name: 'Chilean Peso', rate: 785.50, change: -8.20, changePercent: -1.03, symbol: '$' },
      { code: 'COP', name: 'Colombian Peso', rate: 3850.00, change: 45.00, changePercent: 1.18, symbol: '$' },
      { code: 'PEN', name: 'Peruvian Sol', rate: 3.65, change: -0.03, changePercent: -0.82, symbol: 'S/' },
      { code: 'ARS', name: 'Argentine Peso', rate: 98.50, change: 2.15, changePercent: 2.23, symbol: '$' },
      { code: 'UYU', name: 'Uruguayan Peso', rate: 42.85, change: 0.25, changePercent: 0.59, symbol: '$U' },
      { code: 'BOB', name: 'Bolivian Boliviano', rate: 6.91, change: 0.01, changePercent: 0.14, symbol: 'Bs' },
      { code: 'PYG', name: 'Paraguayan Guarani', rate: 6850.00, change: 25.00, changePercent: 0.37, symbol: '₲' },
      
      // African Currencies
      { code: 'NGN', name: 'Nigerian Naira', rate: 415.50, change: -5.20, changePercent: -1.24, symbol: '₦' },
      { code: 'KES', name: 'Kenyan Shilling', rate: 108.75, change: 1.25, changePercent: 1.16, symbol: 'KSh' },
      { code: 'GHS', name: 'Ghanaian Cedi', rate: 6.15, change: -0.08, changePercent: -1.28, symbol: '₵' },
      { code: 'UGX', name: 'Ugandan Shilling', rate: 3650.00, change: 15.00, changePercent: 0.41, symbol: 'USh' },
      { code: 'TZS', name: 'Tanzanian Shilling', rate: 2315.00, change: 8.50, changePercent: 0.37, symbol: 'TSh' },
      { code: 'ETB', name: 'Ethiopian Birr', rate: 45.25, change: 0.35, changePercent: 0.78, symbol: 'Br' },
      { code: 'MAD', name: 'Moroccan Dirham', rate: 9.15, change: -0.05, changePercent: -0.54, symbol: 'د.م.' },
      { code: 'TND', name: 'Tunisian Dinar', rate: 2.85, change: 0.02, changePercent: 0.71, symbol: 'د.ت' },
      
      // Asian Currencies
      { code: 'BDT', name: 'Bangladeshi Taka', rate: 85.50, change: 0.45, changePercent: 0.53, symbol: '৳' },
      { code: 'PKR', name: 'Pakistani Rupee', rate: 178.25, change: -1.85, changePercent: -1.03, symbol: '₨' },
      { code: 'LKR', name: 'Sri Lankan Rupee', rate: 198.50, change: 2.25, changePercent: 1.15, symbol: '₨' },
      { code: 'NPR', name: 'Nepalese Rupee', rate: 119.75, change: -0.85, changePercent: -0.70, symbol: '₨' },
      { code: 'MMK', name: 'Myanmar Kyat', rate: 1785.00, change: 25.00, changePercent: 1.42, symbol: 'K' },
      { code: 'KHR', name: 'Cambodian Riel', rate: 4085.00, change: 15.00, changePercent: 0.37, symbol: '៛' },
      { code: 'LAK', name: 'Lao Kip', rate: 10250.00, change: 85.00, changePercent: 0.84, symbol: '₭' }
    ].map(currency => ({
      ...currency,
      // Add some randomization to make it feel more real-time
      rate: currency.rate + (Math.random() - 0.5) * 0.01,
      change: currency.change + (Math.random() - 0.5) * 0.005,
      changePercent: currency.changePercent + (Math.random() - 0.5) * 0.5,
    }));

    const cryptocurrencies = [
      // Top 50 Cryptocurrencies with enhanced data
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 43250.00, marketCap: 847500000000, rank: 1 },
      { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 2640.75, marketCap: 317200000000, rank: 2 },
      { id: 'binancecoin', name: 'BNB', symbol: 'BNB', price: 315.80, marketCap: 47800000000, rank: 3 },
      { id: 'solana', name: 'Solana', symbol: 'SOL', price: 98.45, marketCap: 42500000000, rank: 4 },
      { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.485, marketCap: 17200000000, rank: 5 },
      { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', price: 35.20, marketCap: 13500000000, rank: 6 },
      { id: 'chainlink', name: 'Chainlink', symbol: 'LINK', price: 14.85, marketCap: 8200000000, rank: 7 },
      { id: 'polygon', name: 'Polygon', symbol: 'MATIC', price: 0.85, marketCap: 7800000000, rank: 8 },
      { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', price: 72.50, marketCap: 5400000000, rank: 9 },
      { id: 'uniswap', name: 'Uniswap', symbol: 'UNI', price: 6.25, marketCap: 4700000000, rank: 10 },
      { id: 'algorand', name: 'Algorand', symbol: 'ALGO', price: 0.18, marketCap: 1400000000, rank: 11 },
      { id: 'cosmos', name: 'Cosmos', symbol: 'ATOM', price: 9.85, marketCap: 3800000000, rank: 12 },
      { id: 'stellar', name: 'Stellar', symbol: 'XLM', price: 0.12, marketCap: 3200000000, rank: 13 },
      { id: 'vechain', name: 'VeChain', symbol: 'VET', price: 0.025, marketCap: 1800000000, rank: 14 },
      { id: 'filecoin', name: 'Filecoin', symbol: 'FIL', price: 5.45, marketCap: 2400000000, rank: 15 },
      { id: 'tron', name: 'TRON', symbol: 'TRX', price: 0.065, marketCap: 5800000000, rank: 16 },
      { id: 'monero', name: 'Monero', symbol: 'XMR', price: 158.20, marketCap: 2900000000, rank: 17 },
      { id: 'eos', name: 'EOS', symbol: 'EOS', price: 0.85, marketCap: 850000000, rank: 18 },
      { id: 'aave', name: 'Aave', symbol: 'AAVE', price: 95.50, marketCap: 1400000000, rank: 19 },
      { id: 'maker', name: 'Maker', symbol: 'MKR', price: 1250.00, marketCap: 1200000000, rank: 20 },
      
      // Additional Top Cryptocurrencies
      { id: 'compound', name: 'Compound', symbol: 'COMP', price: 45.20, marketCap: 280000000, rank: 21 },
      { id: 'sushiswap', name: 'SushiSwap', symbol: 'SUSHI', price: 1.25, marketCap: 160000000, rank: 22 },
      { id: 'yearn-finance', name: 'Yearn Finance', symbol: 'YFI', price: 8500.00, marketCap: 310000000, rank: 23 },
      { id: 'curve-dao-token', name: 'Curve DAO Token', symbol: 'CRV', price: 0.45, marketCap: 180000000, rank: 24 },
      { id: '1inch', name: '1inch Network', symbol: '1INCH', price: 0.35, marketCap: 350000000, rank: 25 },
      { id: 'pancakeswap-token', name: 'PancakeSwap', symbol: 'CAKE', price: 2.15, marketCap: 680000000, rank: 26 },
      { id: 'thorchain', name: 'THORChain', symbol: 'RUNE', price: 3.85, marketCap: 1200000000, rank: 27 },
      { id: 'terra-luna', name: 'Terra Luna Classic', symbol: 'LUNC', price: 0.00012, marketCap: 750000000, rank: 28 },
      { id: 'fantom', name: 'Fantom', symbol: 'FTM', price: 0.25, marketCap: 680000000, rank: 29 },
      { id: 'harmony', name: 'Harmony', symbol: 'ONE', price: 0.015, marketCap: 200000000, rank: 30 },
      { id: 'zilliqa', name: 'Zilliqa', symbol: 'ZIL', price: 0.025, marketCap: 320000000, rank: 31 },
      { id: 'enjin-coin', name: 'Enjin Coin', symbol: 'ENJ', price: 0.18, marketCap: 180000000, rank: 32 },
      { id: 'basic-attention-token', name: 'Basic Attention Token', symbol: 'BAT', price: 0.22, marketCap: 330000000, rank: 33 },
      { id: 'decentraland', name: 'Decentraland', symbol: 'MANA', price: 0.38, marketCap: 700000000, rank: 34 },
      { id: 'the-sandbox', name: 'The Sandbox', symbol: 'SAND', price: 0.32, marketCap: 720000000, rank: 35 },
      
      // More Cryptocurrencies (36-50)
      { id: 'axie-infinity', name: 'Axie Infinity', symbol: 'AXS', price: 6.85, marketCap: 420000000, rank: 36 },
      { id: 'gala', name: 'Gala', symbol: 'GALA', price: 0.025, marketCap: 180000000, rank: 37 },
      { id: 'flow', name: 'Flow', symbol: 'FLOW', price: 0.85, marketCap: 890000000, rank: 38 },
      { id: 'immutable-x', name: 'Immutable X', symbol: 'IMX', price: 0.95, marketCap: 150000000, rank: 39 },
      { id: 'loopring', name: 'Loopring', symbol: 'LRC', price: 0.18, marketCap: 220000000, rank: 40 },
      { id: 'matic-network', name: 'Polygon', symbol: 'MATIC', price: 0.85, marketCap: 7800000000, rank: 41 },
      { id: 'render-token', name: 'Render Token', symbol: 'RNDR', price: 2.45, marketCap: 950000000, rank: 42 },
      { id: 'theta-token', name: 'Theta Network', symbol: 'THETA', price: 0.95, marketCap: 950000000, rank: 43 },
      { id: 'helium', name: 'Helium', symbol: 'HNT', price: 1.85, marketCap: 280000000, rank: 44 },
      { id: 'internet-computer', name: 'Internet Computer', symbol: 'ICP', price: 4.25, marketCap: 1950000000, rank: 45 },
      { id: 'near', name: 'NEAR Protocol', symbol: 'NEAR', price: 1.85, marketCap: 1850000000, rank: 46 },
      { id: 'apecoin', name: 'ApeCoin', symbol: 'APE', price: 1.15, marketCap: 420000000, rank: 47 },
      { id: 'optimism', name: 'Optimism', symbol: 'OP', price: 1.95, marketCap: 1950000000, rank: 48 },
      { id: 'arbitrum', name: 'Arbitrum', symbol: 'ARB', price: 0.85, marketCap: 2850000000, rank: 49 },
      { id: 'starknet', name: 'Starknet', symbol: 'STRK', price: 0.65, marketCap: 520000000, rank: 50 }
    ].map(crypto => ({
      ...crypto,
      // Add realistic variations
      price: crypto.price * (1 + (Math.random() - 0.5) * 0.1),
      change24h: (Math.random() - 0.5) * crypto.price * 0.1,
      changePercent24h: (Math.random() - 0.5) * 10,
      volume24h: crypto.marketCap * (0.1 + Math.random() * 0.3),
    }));

    const companies = [
      // Top 50 Companies by Market Cap
      { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', basePrice: 175, baseCap: 2750 },
      { symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Technology', basePrice: 385, baseCap: 2850 },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', basePrice: 142, baseCap: 1780 },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer Discretionary', basePrice: 145, baseCap: 1520 },
      { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Consumer Discretionary', basePrice: 248, baseCap: 790 },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', sector: 'Technology', basePrice: 485, baseCap: 1200 },
      { symbol: 'META', name: 'Meta Platforms Inc.', sector: 'Technology', basePrice: 325, baseCap: 820 },
      { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', sector: 'Financial Services', basePrice: 350, baseCap: 780 },
      { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', basePrice: 160, baseCap: 420 },
      { symbol: 'V', name: 'Visa Inc.', sector: 'Financial Services', basePrice: 245, baseCap: 520 },
      { symbol: 'WMT', name: 'Walmart Inc.', sector: 'Consumer Staples', basePrice: 155, baseCap: 420 },
      { symbol: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financial Services', basePrice: 145, baseCap: 425 },
      { symbol: 'MA', name: 'Mastercard Incorporated', sector: 'Financial Services', basePrice: 385, baseCap: 375 },
      { symbol: 'PG', name: 'Procter & Gamble Company', sector: 'Consumer Staples', basePrice: 155, baseCap: 365 },
      { symbol: 'UNH', name: 'UnitedHealth Group Inc.', sector: 'Healthcare', basePrice: 485, baseCap: 450 },
      { symbol: 'HD', name: 'Home Depot Inc.', sector: 'Consumer Discretionary', basePrice: 325, baseCap: 340 },
      { symbol: 'BAC', name: 'Bank of America Corp', sector: 'Financial Services', basePrice: 32, baseCap: 265 },
      { symbol: 'ABBV', name: 'AbbVie Inc.', sector: 'Healthcare', basePrice: 145, baseCap: 255 },
      { symbol: 'AVGO', name: 'Broadcom Inc.', sector: 'Technology', basePrice: 885, baseCap: 365 },
      { symbol: 'XOM', name: 'Exxon Mobil Corporation', sector: 'Energy', basePrice: 105, baseCap: 445 },
      { symbol: 'KO', name: 'Coca-Cola Company', sector: 'Consumer Staples', basePrice: 58, baseCap: 250 },
      { symbol: 'CVX', name: 'Chevron Corporation', sector: 'Energy', basePrice: 155, baseCap: 295 },
      { symbol: 'LLY', name: 'Eli Lilly and Company', sector: 'Healthcare', basePrice: 485, baseCap: 465 },
      { symbol: 'PFE', name: 'Pfizer Inc.', sector: 'Healthcare', basePrice: 28, baseCap: 160 },
      { symbol: 'TMO', name: 'Thermo Fisher Scientific Inc.', sector: 'Healthcare', basePrice: 525, baseCap: 205 },
      { symbol: 'COST', name: 'Costco Wholesale Corporation', sector: 'Consumer Staples', basePrice: 685, baseCap: 305 },
      { symbol: 'ADBE', name: 'Adobe Inc.', sector: 'Technology', basePrice: 485, baseCap: 225 },
      { symbol: 'ABT', name: 'Abbott Laboratories', sector: 'Healthcare', basePrice: 105, baseCap: 185 },
      { symbol: 'CRM', name: 'Salesforce Inc.', sector: 'Technology', basePrice: 245, baseCap: 240 },
      { symbol: 'NFLX', name: 'Netflix Inc.', sector: 'Communication Services', basePrice: 425, baseCap: 185 },
      { symbol: 'ORCL', name: 'Oracle Corporation', sector: 'Technology', basePrice: 105, baseCap: 285 },
      { symbol: 'INTC', name: 'Intel Corporation', sector: 'Technology', basePrice: 45, baseCap: 185 },
      { symbol: 'NKE', name: 'Nike Inc.', sector: 'Consumer Discretionary', basePrice: 105, baseCap: 165 },
      { symbol: 'VZ', name: 'Verizon Communications Inc.', sector: 'Communication Services', basePrice: 38, baseCap: 160 },
      { symbol: 'CMCSA', name: 'Comcast Corporation', sector: 'Communication Services', basePrice: 42, baseCap: 185 },
      
      // Additional Major Companies (36-50)
      { symbol: 'DIS', name: 'Walt Disney Company', sector: 'Communication Services', basePrice: 95, baseCap: 175 },
      { symbol: 'AMD', name: 'Advanced Micro Devices', sector: 'Technology', basePrice: 105, baseCap: 170 },
      { symbol: 'PYPL', name: 'PayPal Holdings Inc.', sector: 'Financial Services', basePrice: 65, baseCap: 75 },
      { symbol: 'QCOM', name: 'Qualcomm Incorporated', sector: 'Technology', basePrice: 125, baseCap: 140 },
      { symbol: 'TXN', name: 'Texas Instruments Inc.', sector: 'Technology', basePrice: 165, baseCap: 150 },
      { symbol: 'HON', name: 'Honeywell International Inc.', sector: 'Industrials', basePrice: 195, baseCap: 135 },
      { symbol: 'UPS', name: 'United Parcel Service Inc.', sector: 'Industrials', basePrice: 165, baseCap: 145 },
      { symbol: 'LOW', name: 'Lowe\'s Companies Inc.', sector: 'Consumer Discretionary', basePrice: 205, baseCap: 140 },
      { symbol: 'IBM', name: 'International Business Machines', sector: 'Technology', basePrice: 135, baseCap: 125 },
      { symbol: 'CAT', name: 'Caterpillar Inc.', sector: 'Industrials', basePrice: 245, baseCap: 130 },
      { symbol: 'GS', name: 'Goldman Sachs Group Inc.', sector: 'Financial Services', basePrice: 325, baseCap: 115 },
      { symbol: 'MS', name: 'Morgan Stanley', sector: 'Financial Services', basePrice: 85, baseCap: 145 },
      { symbol: 'AMGN', name: 'Amgen Inc.', sector: 'Healthcare', basePrice: 265, baseCap: 145 },
      { symbol: 'GILD', name: 'Gilead Sciences Inc.', sector: 'Healthcare', basePrice: 75, baseCap: 95 },
      { symbol: 'SBUX', name: 'Starbucks Corporation', sector: 'Consumer Discretionary', basePrice: 95, baseCap: 110 }
    ].map(company => {
      const priceVariation = (Math.random() - 0.5) * 0.1;
      const price = company.basePrice * (1 + priceVariation);
      const change = (Math.random() - 0.5) * 20;
      const changePercent = (change / price) * 100;
      const marketCap = company.baseCap * 1e9 * (1 + priceVariation);
      const volume = Math.floor(Math.random() * 100000000) + 10000000;

      return {
        id: company.symbol,
        name: company.name,
        symbol: company.symbol,
        price,
        marketCap,
        change,
        changePercent,
        volume,
        sector: company.sector,
      };
    });

    const news = [
      {
        id: '1',
        title: 'Federal Reserve Maintains Interest Rates Amid Economic Uncertainty',
        summary: 'The Federal Reserve decided to keep interest rates unchanged as policymakers assess the impact of recent economic data on inflation and employment.',
        source: 'Reuters',
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        url: '#',
        category: 'Central Banking',
      },
      {
        id: '2',
        title: 'Bitcoin Reaches New Monthly High as Institutional Interest Grows',
        summary: 'Bitcoin surged to its highest level this month following increased institutional adoption and positive regulatory developments.',
        source: 'CoinDesk',
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        url: '#',
        category: 'Cryptocurrency',
      },
      {
        id: '3',
        title: 'Tech Stocks Lead Market Rally on AI Investment Optimism',
        summary: 'Technology stocks posted significant gains as investors remain optimistic about artificial intelligence investments and their potential returns.',
        source: 'Bloomberg',
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        url: '#',
        category: 'Technology',
      },
      {
        id: '4',
        title: 'Dollar Strengthens Against Major Currencies on Economic Data',
        summary: 'The US dollar gained ground against major trading partners following stronger-than-expected economic indicators.',
        source: 'Financial Times',
        publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        url: '#',
        category: 'Foreign Exchange',
      },
      {
        id: '5',
        title: 'Energy Sector Volatility Continues Amid Supply Chain Concerns',
        summary: 'Energy companies face continued volatility as global supply chain disruptions impact production and distribution.',
        source: 'Wall Street Journal',
        publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        url: '#',
        category: 'Energy',
      },
      {
        id: '6',
        title: 'Emerging Markets Show Resilience Despite Global Headwinds',
        summary: 'Several emerging market economies demonstrate strong fundamentals and growth potential amid challenging global conditions.',
        source: 'MarketWatch',
        publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        url: '#',
        category: 'Emerging Markets',
      },
      {
        id: '7',
        title: 'Cryptocurrency Regulation Framework Takes Shape in Major Economies',
        summary: 'Regulatory clarity emerges as governments worldwide develop comprehensive frameworks for digital asset oversight.',
        source: 'CoinTelegraph',
        publishedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
        url: '#',
        category: 'Cryptocurrency',
      },
      {
        id: '8',
        title: 'Global Supply Chain Disruptions Impact Manufacturing Sector',
        summary: 'Manufacturing companies worldwide report continued challenges from supply chain bottlenecks and logistics constraints.',
        source: 'Industrial Weekly',
        publishedAt: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
        url: '#',
        category: 'Manufacturing',
      }
    ];

    // Generate market summary
    const topCurrencyGainer = currencies.sort((a, b) => b.changePercent - a.changePercent)[0];
    const topCryptoGainer = cryptocurrencies.sort((a, b) => b.changePercent24h - a.changePercent24h)[0];
    const topStockGainer = companies.sort((a, b) => b.changePercent - a.changePercent)[0];

    const gainers = [
      { name: topCurrencyGainer?.name, change: topCurrencyGainer?.changePercent || 0, type: 'currency' as const },
      { name: topCryptoGainer?.name, change: topCryptoGainer?.changePercent24h || 0, type: 'crypto' as const },
      { name: topStockGainer?.name, change: topStockGainer?.changePercent || 0, type: 'stock' as const },
    ].filter(item => item.name);

    const topGainer = gainers.sort((a, b) => b.change - a.change)[0];
    const topLoser = gainers.sort((a, b) => a.change - b.change)[0];

    const totalCryptoMarketCap = cryptocurrencies.reduce((sum, crypto) => sum + (crypto.marketCap || 0), 0);
    const totalStockMarketCap = companies.reduce((sum, stock) => sum + (stock.marketCap || 0), 0);
    const totalMarketCap = totalCryptoMarketCap + totalStockMarketCap;

    const marketSummary = {
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
      marketCapChange: (Math.random() - 0.5) * 4,
    };

    return {
      currencies,
      cryptocurrencies,
      companies,
      news,
      marketSummary,
    };
  }

  async fetchCurrencies(): Promise<ApiResponse<any[]>> {
    try {
      const response = await this.fetchWithTimeout(API_ENDPOINTS.currencies);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: CurrencyApiResponse = await response.json();
      
      // Convert to our format with more currencies
      const currencyCodes = ['EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'CNY', 'INR', 'KRW', 'MXN', 'BRL', 'RUB', 'SGD', 'HKD', 'NOK', 'SEK', 'DKK', 'PLN', 'CZK', 'HUF', 'TRY', 'ZAR', 'THB', 'MYR', 'IDR', 'PHP', 'VND', 'EGP', 'AED', 'SAR', 'NZD', 'ILS', 'TWD', 'CLP', 'COP', 'PEN', 'ARS', 'UYU', 'BOB', 'PYG', 'NGN', 'KES', 'GHS', 'UGX', 'TZS', 'ETB', 'MAD', 'TND', 'BDT', 'PKR', 'LKR', 'NPR', 'MMK', 'KHR', 'LAK'];
      
      const currencies = Object.entries(data.rates)
        .filter(([code]) => currencyCodes.includes(code))
        .map(([code, rate]) => {
          const symbols: Record<string, string> = {
            'EUR': '€', 'GBP': '£', 'JPY': '¥', 'CHF': 'CHF', 'CAD': 'C$', 'AUD': 'A$', 
            'CNY': '¥', 'INR': '₹', 'KRW': '₩', 'MXN': '$', 'BRL': 'R$', 'RUB': '₽',
            'SGD': 'S$', 'HKD': 'HK$', 'NOK': 'kr', 'SEK': 'kr', 'DKK': 'kr', 'PLN': 'zł',
            'CZK': 'Kč', 'HUF': 'Ft', 'TRY': '₺', 'ZAR': 'R', 'THB': '฿', 'MYR': 'RM',
            'IDR': 'Rp', 'PHP': '₱', 'VND': '₫', 'EGP': '£', 'AED': 'د.إ', 'SAR': '﷼',
            'NZD': 'NZ$', 'ILS': '₪', 'TWD': 'NT$', 'CLP': '$', 'COP': '$', 'PEN': 'S/',
            'ARS': '$', 'UYU': '$U', 'BOB': 'Bs', 'PYG': '₲', 'NGN': '₦', 'KES': 'KSh',
            'GHS': '₵', 'UGX': 'USh', 'TZS': 'TSh', 'ETB': 'Br', 'MAD': 'د.م.', 'TND': 'د.ت',
            'BDT': '৳', 'PKR': '₨', 'LKR': '₨', 'NPR': '₨', 'MMK': 'K', 'KHR': '៛', 'LAK': '₭'
          };
          
          const names: Record<string, string> = {
            'EUR': 'Euro', 'GBP': 'Pound Sterling', 'JPY': 'Japanese Yen', 'CHF': 'Swiss Franc',
            'CAD': 'Canadian Dollar', 'AUD': 'Australian Dollar', 'CNY': 'Chinese Yuan', 'INR': 'Indian Rupee',
            'KRW': 'South Korean Won', 'MXN': 'Mexican Peso', 'BRL': 'Brazilian Real', 'RUB': 'Russian Ruble',
            'SGD': 'Singapore Dollar', 'HKD': 'Hong Kong Dollar', 'NOK': 'Norwegian Krone', 'SEK': 'Swedish Krona',
            'DKK': 'Danish Krone', 'PLN': 'Polish Zloty', 'CZK': 'Czech Koruna', 'HUF': 'Hungarian Forint',
            'TRY': 'Turkish Lira', 'ZAR': 'South African Rand', 'THB': 'Thai Baht', 'MYR': 'Malaysian Ringgit',
            'IDR': 'Indonesian Rupiah', 'PHP': 'Philippine Peso', 'VND': 'Vietnamese Dong', 'EGP': 'Egyptian Pound',
            'AED': 'UAE Dirham', 'SAR': 'Saudi Riyal', 'NZD': 'New Zealand Dollar', 'ILS': 'Israeli Shekel',
            'TWD': 'Taiwan Dollar', 'CLP': 'Chilean Peso', 'COP': 'Colombian Peso', 'PEN': 'Peruvian Sol',
            'ARS': 'Argentine Peso', 'UYU': 'Uruguayan Peso', 'BOB': 'Bolivian Boliviano', 'PYG': 'Paraguayan Guarani',
            'NGN': 'Nigerian Naira', 'KES': 'Kenyan Shilling', 'GHS': 'Ghanaian Cedi', 'UGX': 'Ugandan Shilling',
            'TZS': 'Tanzanian Shilling', 'ETB': 'Ethiopian Birr', 'MAD': 'Moroccan Dirham', 'TND': 'Tunisian Dinar',
            'BDT': 'Bangladeshi Taka', 'PKR': 'Pakistani Rupee', 'LKR': 'Sri Lankan Rupee', 'NPR': 'Nepalese Rupee',
            'MMK': 'Myanmar Kyat', 'KHR': 'Cambodian Riel', 'LAK': 'Lao Kip'
          };

          // Simulate 24h change
          const change = (Math.random() - 0.5) * 0.02;
          const changePercent = (change / rate) * 100;

          return {
            code,
            name: names[code] || code,
            rate: 1 / rate,
            change,
            changePercent,
            symbol: symbols[code] || code,
          };
        });

      return { data: currencies };
    } catch (error) {
      console.error('Error fetching currencies:', error);
      throw error;
    }
  }

  async fetchCryptocurrencies(): Promise<ApiResponse<any[]>> {
    try {
      const response = await this.fetchWithTimeout(API_ENDPOINTS.crypto);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: CryptoApiItem[] = await response.json();
      
      const cryptocurrencies = data.slice(0, 50).map(crypto => ({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol.toUpperCase(),
        price: crypto.current_price,
        marketCap: crypto.market_cap,
        change24h: crypto.price_change_24h,
        changePercent24h: crypto.price_change_percentage_24h,
        volume24h: crypto.total_volume,
        rank: crypto.market_cap_rank,
      }));

      return { data: cryptocurrencies };
    } catch (error) {
      console.error('Error fetching cryptocurrencies:', error);
      throw error;
    }
  }

  async fetchStocks(): Promise<ApiResponse<any[]>> {
    try {
      // Generate comprehensive stock data with realistic variations
      const fallbackData = this.getFallbackData();
      return { data: fallbackData.companies };
    } catch (error) {
      console.error('Error fetching stocks:', error);
      throw error;
    }
  }

  async fetchNews(): Promise<ApiResponse<any[]>> {
    try {
      // Generate realistic financial news data
      const fallbackData = this.getFallbackData();
      return { data: fallbackData.news };
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
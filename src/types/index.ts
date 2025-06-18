export interface Currency {
  code: string;
  name: string;
  rate: number;
  change: number;
  changePercent: number;
  symbol: string;
}

export interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  rank: number;
}

export interface Company {
  id: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  change: number;
  changePercent: number;
  volume: number;
  sector: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
  image?: string;
  category: string;
}

export interface MarketSummary {
  topGainer: {
    name: string;
    change: number;
    type: 'currency' | 'crypto' | 'stock';
  };
  topLoser: {
    name: string;
    change: number;
    type: 'currency' | 'crypto' | 'stock';
  };
  totalMarketCap: number;
  marketCapChange: number;
}
import React from 'react';

interface CompanyLogoProps {
  symbol: string;
  name: string;
  className?: string;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ symbol, name, className = "h-8 w-8" }) => {
  // Company color schemes and styling
  const companyStyles: Record<string, { bg: string; text: string; logo?: string }> = {
    'AAPL': { bg: 'bg-gray-800', text: 'text-white', logo: '🍎' },
    'MSFT': { bg: 'bg-blue-600', text: 'text-white', logo: '⊞' },
    'GOOGL': { bg: 'bg-blue-500', text: 'text-white', logo: 'G' },
    'AMZN': { bg: 'bg-orange-500', text: 'text-white', logo: 'A' },
    'TSLA': { bg: 'bg-red-600', text: 'text-white', logo: 'T' },
    'NVDA': { bg: 'bg-green-600', text: 'text-white', logo: 'N' },
    'META': { bg: 'bg-blue-700', text: 'text-white', logo: 'f' },
    'BRK.B': { bg: 'bg-blue-800', text: 'text-white', logo: 'B' },
    'JNJ': { bg: 'bg-red-500', text: 'text-white', logo: 'J&J' },
    'V': { bg: 'bg-blue-600', text: 'text-white', logo: 'V' },
    'WMT': { bg: 'bg-blue-500', text: 'text-white', logo: 'W' },
    'JPM': { bg: 'bg-blue-800', text: 'text-white', logo: 'JPM' },
    'MA': { bg: 'bg-red-600', text: 'text-white', logo: 'MC' },
    'PG': { bg: 'bg-blue-600', text: 'text-white', logo: 'P&G' },
    'UNH': { bg: 'bg-blue-700', text: 'text-white', logo: 'UNH' },
    'HD': { bg: 'bg-orange-600', text: 'text-white', logo: 'HD' },
    'BAC': { bg: 'bg-red-700', text: 'text-white', logo: 'BAC' },
    'ABBV': { bg: 'bg-blue-800', text: 'text-white', logo: 'ABBV' },
    'AVGO': { bg: 'bg-red-600', text: 'text-white', logo: 'AVGO' },
    'XOM': { bg: 'bg-blue-800', text: 'text-white', logo: 'XOM' },
    'KO': { bg: 'bg-red-600', text: 'text-white', logo: '🥤' },
    'CVX': { bg: 'bg-blue-700', text: 'text-white', logo: 'CVX' },
    'LLY': { bg: 'bg-red-600', text: 'text-white', logo: 'LLY' },
    'PFE': { bg: 'bg-blue-600', text: 'text-white', logo: 'PFE' },
    'TMO': { bg: 'bg-blue-700', text: 'text-white', logo: 'TMO' },
    'COST': { bg: 'bg-blue-600', text: 'text-white', logo: 'COST' },
    'ADBE': { bg: 'bg-red-600', text: 'text-white', logo: 'Ai' },
    'ABT': { bg: 'bg-blue-600', text: 'text-white', logo: 'ABT' },
    'CRM': { bg: 'bg-blue-500', text: 'text-white', logo: 'CRM' },
    'NFLX': { bg: 'bg-red-600', text: 'text-white', logo: 'N' },
    'ORCL': { bg: 'bg-red-600', text: 'text-white', logo: 'ORCL' },
    'INTC': { bg: 'bg-blue-600', text: 'text-white', logo: 'INTC' },
    'NKE': { bg: 'bg-black', text: 'text-white', logo: '✓' },
    'VZ': { bg: 'bg-red-600', text: 'text-white', logo: 'VZ' },
    'CMCSA': { bg: 'bg-purple-600', text: 'text-white', logo: 'CMCSA' },
  };

  const style = companyStyles[symbol] || { bg: 'bg-slate-600', text: 'text-white', logo: symbol.slice(0, 2) };

  return (
    <div className={`${style.bg} ${style.text} rounded-lg flex items-center justify-center font-bold text-xs ${className}`} title={name}>
      {style.logo}
    </div>
  );
};

export default CompanyLogo;
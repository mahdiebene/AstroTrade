import React from 'react';

interface CryptoIconProps {
  symbol: string;
  className?: string;
}

const CryptoIcon: React.FC<CryptoIconProps> = ({ symbol, className = "h-6 w-6" }) => {
  // Cryptocurrency color schemes and symbols
  const cryptoStyles: Record<string, { bg: string; text: string; symbol: string }> = {
    'BTC': { bg: 'bg-orange-500', text: 'text-white', symbol: '₿' },
    'ETH': { bg: 'bg-blue-600', text: 'text-white', symbol: 'Ξ' },
    'BNB': { bg: 'bg-yellow-500', text: 'text-black', symbol: 'BNB' },
    'SOL': { bg: 'bg-purple-600', text: 'text-white', symbol: '◎' },
    'ADA': { bg: 'bg-blue-500', text: 'text-white', symbol: '₳' },
    'AVAX': { bg: 'bg-red-500', text: 'text-white', symbol: 'AVAX' },
    'LINK': { bg: 'bg-blue-700', text: 'text-white', symbol: 'LINK' },
    'MATIC': { bg: 'bg-purple-500', text: 'text-white', symbol: 'MATIC' },
    'LTC': { bg: 'bg-gray-400', text: 'text-white', symbol: 'Ł' },
    'UNI': { bg: 'bg-pink-500', text: 'text-white', symbol: '🦄' },
    'ALGO': { bg: 'bg-black', text: 'text-white', symbol: 'ALGO' },
    'ATOM': { bg: 'bg-purple-700', text: 'text-white', symbol: 'ATOM' },
    'XLM': { bg: 'bg-blue-400', text: 'text-white', symbol: '*' },
    'VET': { bg: 'bg-blue-800', text: 'text-white', symbol: 'VET' },
    'FIL': { bg: 'bg-blue-600', text: 'text-white', symbol: 'FIL' },
    'TRX': { bg: 'bg-red-600', text: 'text-white', symbol: 'TRX' },
    'XMR': { bg: 'bg-orange-600', text: 'text-white', symbol: 'ɱ' },
    'EOS': { bg: 'bg-black', text: 'text-white', symbol: 'EOS' },
    'AAVE': { bg: 'bg-purple-600', text: 'text-white', symbol: 'AAVE' },
    'MKR': { bg: 'bg-green-600', text: 'text-white', symbol: 'MKR' },
    'COMP': { bg: 'bg-green-500', text: 'text-white', symbol: 'COMP' },
    'SUSHI': { bg: 'bg-pink-600', text: 'text-white', symbol: '🍣' },
    'YFI': { bg: 'bg-blue-800', text: 'text-white', symbol: 'YFI' },
    'CRV': { bg: 'bg-red-500', text: 'text-white', symbol: 'CRV' },
    '1INCH': { bg: 'bg-red-600', text: 'text-white', symbol: '1INCH' },
    'CAKE': { bg: 'bg-orange-400', text: 'text-white', symbol: '🥞' },
    'RUNE': { bg: 'bg-green-700', text: 'text-white', symbol: 'RUNE' },
    'LUNC': { bg: 'bg-yellow-600', text: 'text-white', symbol: 'LUNC' },
    'FTM': { bg: 'bg-blue-700', text: 'text-white', symbol: 'FTM' },
    'ONE': { bg: 'bg-blue-500', text: 'text-white', symbol: 'ONE' },
    'ZIL': { bg: 'bg-teal-500', text: 'text-white', symbol: 'ZIL' },
    'ENJ': { bg: 'bg-purple-700', text: 'text-white', symbol: 'ENJ' },
    'BAT': { bg: 'bg-orange-500', text: 'text-white', symbol: 'BAT' },
    'MANA': { bg: 'bg-gray-600', text: 'text-white', symbol: 'MANA' },
    'SAND': { bg: 'bg-blue-400', text: 'text-white', symbol: 'SAND' },
  };

  const style = cryptoStyles[symbol] || { bg: 'bg-gray-600', text: 'text-white', symbol: symbol.slice(0, 3) };

  return (
    <div className={`${style.bg} ${style.text} rounded-full flex items-center justify-center font-bold text-xs ${className}`}>
      {style.symbol}
    </div>
  );
};

export default CryptoIcon;
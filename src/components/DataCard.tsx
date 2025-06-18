import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DataCardProps {
  title: string;
  value: string;
  change?: number;
  changePercent?: number;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  change,
  changePercent,
  subtitle,
  icon,
  className = '',
}) => {
  const isPositive = change !== undefined ? change >= 0 : changePercent !== undefined ? changePercent >= 0 : true;
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className={`bg-slate-800 rounded-lg p-4 sm:p-6 hover:bg-slate-750 transition-colors ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs sm:text-sm font-medium text-gray-400 truncate pr-2">{title}</h3>
        {icon && <div className="text-blue-400 flex-shrink-0">{icon}</div>}
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-2 space-y-1 sm:space-y-0">
        <span className="text-lg sm:text-2xl font-bold text-white truncate">{value}</span>
        {(change !== undefined || changePercent !== undefined) && (
          <div className={`flex items-center space-x-1 ${changeColor} flex-shrink-0`}>
            <TrendIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-xs sm:text-sm font-medium">
              {changePercent !== undefined ? `${changePercent.toFixed(2)}%` : change?.toFixed(4)}
            </span>
          </div>
        )}
      </div>
      
      {subtitle && (
        <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">{subtitle}</p>
      )}
    </div>
  );
};

export default DataCard;
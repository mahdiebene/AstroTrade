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
    <div className={`bg-slate-800 rounded-lg p-3 sm:p-4 lg:p-6 hover:bg-slate-750 transition-colors ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs sm:text-sm font-medium text-gray-400 truncate pr-2 flex-1 min-w-0">{title}</h3>
        {icon && <div className="text-blue-400 flex-shrink-0 ml-1">{icon}</div>}
      </div>
      
      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-lg lg:text-xl xl:text-2xl font-bold text-white truncate flex-1 min-w-0 pr-2">
            {value}
          </span>
          {(change !== undefined || changePercent !== undefined) && (
            <div className={`flex items-center space-x-1 ${changeColor} flex-shrink-0`}>
              <TrendIcon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                {changePercent !== undefined ? `${changePercent.toFixed(2)}%` : change?.toFixed(4)}
              </span>
            </div>
          )}
        </div>
        
        {subtitle && (
          <p className="text-xs sm:text-sm text-gray-500 truncate">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default DataCard;
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
    <div className={`bg-slate-800 rounded-lg p-6 hover:bg-slate-750 transition-colors ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        {icon && <div className="text-blue-400">{icon}</div>}
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        {(change !== undefined || changePercent !== undefined) && (
          <div className={`flex items-center space-x-1 ${changeColor}`}>
            <TrendIcon className="h-4 w-4" />
            <span className="text-sm font-medium">
              {changePercent !== undefined ? `${changePercent.toFixed(2)}%` : change?.toFixed(4)}
            </span>
          </div>
        )}
      </div>
      
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
};

export default DataCard;
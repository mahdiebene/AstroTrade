import React, { useState } from 'react';
import { useFinancialData } from '../hooks/useFinancialData';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Search, Clock, ExternalLink, Filter, Newspaper } from 'lucide-react';

const News: React.FC = () => {
  const { news, loading, error, refetch } = useFinancialData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(news.map(article => article.category)))];

  // Filter news
  const filteredNews = news
    .filter(article => 
      (categoryFilter === 'all' || article.category === categoryFilter) &&
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       article.summary.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Central Banking': 'bg-blue-900 text-blue-200',
      'Cryptocurrency': 'bg-yellow-900 text-yellow-200',
      'Technology': 'bg-purple-900 text-purple-200',
      'Foreign Exchange': 'bg-green-900 text-green-200',
      'Energy': 'bg-orange-900 text-orange-200',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-900 text-gray-200';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Financial News</h1>
        <p className="text-gray-400">
          Latest breaking news and analysis from the financial world
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search news articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex space-x-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-2">
            <Newspaper className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-gray-400">Total Articles</span>
          </div>
          <div className="text-2xl font-bold text-white">{filteredNews.length}</div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-2">
            <Filter className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-gray-400">Categories</span>
          </div>
          <div className="text-2xl font-bold text-white">{categories.length - 1}</div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-gray-400">Latest Update</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {news.length > 0 ? formatDate(news[0].publishedAt) : '--'}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNews.map((article) => (
          <article key={article.id} className="bg-slate-800 rounded-lg p-6 hover:bg-slate-750 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="h-3 w-3 mr-1" />
                {formatDate(article.publishedAt)}
              </div>
            </div>
            
            <h2 className="text-lg font-semibold text-white mb-3 line-clamp-2">
              {article.title}
            </h2>
            
            <p className="text-gray-400 mb-4 line-clamp-3">
              {article.summary}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{article.source}</span>
              <button className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm">
                <span>Read more</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center text-gray-400 mt-8">
          No news articles found matching your criteria.
        </div>
      )}

      {/* Load More (placeholder for future pagination) */}
      {filteredNews.length > 0 && (
        <div className="text-center mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, 
  DollarSign, 
  Bitcoin, 
  Building2, 
  Newspaper, 
  Info, 
  Mail, 
  Menu, 
  X,
  BarChart3,
  Star
} from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: BarChart3 },
    { name: 'Currencies', href: '/currencies', icon: DollarSign },
    { name: 'Crypto', href: '/crypto', icon: Bitcoin },
    { name: 'Market Cap', href: '/market-cap', icon: Building2 },
    { name: 'News', href: '/news', icon: Newspaper },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    // Scroll to top when clicking navigation links
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      {/* Navigation */}
      <nav className="bg-slate-800 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-2 sm:space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <span className="text-lg sm:text-xl font-bold text-white truncate">Astro-Trade</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-2 w-2 sm:h-3 sm:w-3 text-yellow-400" />
                    <span className="text-xs text-gray-400 truncate">by Mahdi</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleLinkClick}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1 max-h-96 overflow-y-auto">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleLinkClick}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 mt-8 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <span className="text-base sm:text-lg font-bold text-white">Astro-Trade</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-2 w-2 sm:h-3 sm:w-3 text-yellow-400" />
                    <span className="text-xs text-gray-400">Founded by Mahdi</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Real-time financial data platform providing comprehensive market insights, 
                currency exchange rates, cryptocurrency prices, and breaking financial news. 
                Based in Mohammadpur, Dhaka, Bangladesh.
              </p>
              <div className="text-sm text-gray-500 space-y-1">
                <p>📍 Mohammadpur, Dhaka, Bangladesh</p>
                <p>📧 support@astrotrade.com</p>
                <p>📞 +880 1317 284650</p>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/currencies" onClick={handleLinkClick} className="text-gray-400 hover:text-white text-sm transition-colors">Currency Rates</Link></li>
                <li><Link to="/crypto" onClick={handleLinkClick} className="text-gray-400 hover:text-white text-sm transition-colors">Cryptocurrency</Link></li>
                <li><Link to="/market-cap" onClick={handleLinkClick} className="text-gray-400 hover:text-white text-sm transition-colors">Market Cap</Link></li>
                <li><Link to="/news" onClick={handleLinkClick} className="text-gray-400 hover:text-white text-sm transition-colors">Financial News</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Information</h3>
              <ul className="space-y-2">
                <li><Link to="/about" onClick={handleLinkClick} className="text-gray-400 hover:text-white text-sm transition-colors">About Astro-Trade</Link></li>
                <li><Link to="/contact" onClick={handleLinkClick} className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy-policy" onClick={handleLinkClick} className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" onClick={handleLinkClick} className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Astro-Trade. All rights reserved. Founded by Mahdi in Dhaka, Bangladesh.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Market data provided for informational purposes only. Not financial advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
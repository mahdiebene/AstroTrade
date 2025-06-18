import React from 'react';
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  Users, 
  Globe, 
  BarChart3, 
  Clock, 
  Database,
  Mail,
  Phone,
  MapPin,
  Star
} from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Real-Time Data',
      description: 'Live updates every 30 seconds for currencies, cryptocurrencies, and stock market data with professional-grade accuracy.'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Reliable Sources',
      description: 'Data sourced from trusted financial APIs including CoinGecko, ExchangeRate-API, and major financial institutions.'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Global Coverage',
      description: 'Comprehensive coverage of 30+ currencies, 50+ cryptocurrencies, and 35+ major companies worldwide.'
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Advanced Analytics',
      description: 'Detailed market analysis with sorting, filtering, search capabilities, and comprehensive data exploration tools.'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: '24/7 Monitoring',
      description: 'Continuous market monitoring with breaking news and real-time alerts for significant market movements.'
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: 'Comprehensive Data',
      description: 'Access to market cap, volume, percentage changes, and historical trends for informed investment decisions.'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '10K+' },
    { label: 'Data Points', value: '500K+' },
    { label: 'Markets Covered', value: '115+' },
    { label: 'Uptime', value: '99.9%' }
  ];

  const teamInfo = {
    founder: 'Mahdi',
    company: 'Astro-Trade',
    location: 'Mohammadpur, Dhaka, Bangladesh',
    email: 'support@astrotrade.com',
    phone: '+880 1317 284650',
    founded: '2024'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
            <TrendingUp className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">About Astro-Trade</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Your comprehensive platform for real-time financial data, market analysis, 
          and breaking news from the world of finance. Founded by Mahdi in Dhaka, Bangladesh.
        </p>
      </div>

      {/* Company Information */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Astro-Trade</h2>
            <p className="text-blue-100 text-lg leading-relaxed mb-6">
              Founded in {teamInfo.founded} by {teamInfo.founder}, Astro-Trade is a cutting-edge financial data platform 
              based in {teamInfo.location}. We specialize in providing real-time cryptocurrency, 
              currency exchange, and stock market data to empower traders and investors worldwide.
            </p>
            <div className="flex items-center space-x-4">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-blue-100">Trusted by thousands of traders globally</span>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">{teamInfo.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">{teamInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">{teamInfo.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-slate-800 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          At Astro-Trade, we believe that access to accurate, real-time financial information 
          should be available to everyone. Our platform democratizes financial data by providing 
          comprehensive market insights, currency exchange rates, cryptocurrency prices, and 
          breaking financial news in an intuitive, user-friendly interface. We're committed to 
          empowering traders, investors, and financial enthusiasts with the tools they need to 
          make informed decisions in today's dynamic markets.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-800 rounded-lg p-6 hover:bg-slate-750 transition-colors">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-slate-800 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Platform Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sources */}
      <div className="bg-slate-800 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Data Sources & Reliability</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Financial Data Providers</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• CoinGecko API for comprehensive cryptocurrency data</li>
              <li>• ExchangeRate-API for real-time currency exchange rates</li>
              <li>• Alpha Vantage for stock market and company data</li>
              <li>• Yahoo Finance for market capitalization information</li>
              <li>• Multiple backup APIs for maximum reliability</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">News Sources</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Bloomberg Financial News</li>
              <li>• Reuters Business & Finance</li>
              <li>• Financial Times</li>
              <li>• CoinDesk for cryptocurrency news</li>
              <li>• Wall Street Journal</li>
              <li>• MarketWatch for real-time updates</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-slate-800 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Technology & Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Frontend</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• React 18 with TypeScript</li>
              <li>• Tailwind CSS for modern styling</li>
              <li>• React Router for seamless navigation</li>
              <li>• Lucide React for beautiful icons</li>
              <li>• Responsive design principles</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Data Management</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Real-time API integration</li>
              <li>• Intelligent data caching</li>
              <li>• Robust error handling & recovery</li>
              <li>• Auto-refresh mechanisms</li>
              <li>• Fallback data systems</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Performance</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Optimized loading states</li>
              <li>• Lazy loading components</li>
              <li>• Efficient data structures</li>
              <li>• Mobile-first approach</li>
              <li>• Progressive enhancement</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="bg-slate-800 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">About the Founder</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              <Users className="inline h-5 w-5 mr-2" />
              Mahdi - Founder & CEO
            </h3>
            <p className="text-gray-300 mb-4">
              Based in Mohammadpur, Dhaka, Bangladesh, Mahdi founded Astro-Trade with a vision to 
              democratize access to financial data. With a passion for technology and finance, 
              he has built a platform that serves traders and investors across the globe.
            </p>
            <p className="text-gray-300">
              "Our goal is to provide the most accurate, real-time financial data in an accessible 
              format that empowers everyone to make informed financial decisions."
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              <Shield className="inline h-5 w-5 mr-2" />
              Our Commitment
            </h3>
            <p className="text-gray-300 mb-4">
              We maintain the highest standards of data accuracy and reliability. Our systems 
              continuously monitor data quality and implement multiple validation layers to 
              ensure you receive accurate, up-to-date information.
            </p>
            <div className="bg-slate-700 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Contact the Founder</h4>
              <p className="text-gray-300 text-sm">
                For business inquiries, partnerships, or feedback, reach out directly to Mahdi 
                at {teamInfo.email} or call {teamInfo.phone}.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Get in Touch with Astro-Trade</h2>
        <p className="text-blue-100 mb-6">
          Have questions about our platform or need support? We're here to help you succeed in your trading journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
          <a
            href="mailto:support@astrotrade.com"
            className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Email Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
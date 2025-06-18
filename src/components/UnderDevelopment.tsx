import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Construction, 
  Home, 
  ArrowLeft, 
  Clock, 
  Wrench,
  Star
} from 'lucide-react';

interface UnderDevelopmentProps {
  pageName: string;
  expectedFeatures?: string[];
}

const UnderDevelopment: React.FC<UnderDevelopmentProps> = ({ 
  pageName, 
  expectedFeatures = [] 
}) => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Construction Icon */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full inline-block mb-4">
            <Construction className="h-16 w-16 text-white" />
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Wrench className="h-5 w-5 text-blue-400 animate-pulse" />
            <span className="text-blue-400 font-medium">Under Development</span>
            <Wrench className="h-5 w-5 text-blue-400 animate-pulse" />
          </div>
        </div>

        {/* Main Content */}
        <h1 className="text-4xl font-bold text-white mb-4">
          {pageName} Page
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          We're working hard to bring you this feature. This page is currently under development 
          and will be available soon with exciting new functionality.
        </p>

        {/* Expected Features */}
        {expectedFeatures.length > 0 && (
          <div className="bg-slate-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center">
              <Star className="h-5 w-5 text-yellow-400 mr-2" />
              Coming Soon Features
            </h3>
            <ul className="space-y-2">
              {expectedFeatures.map((feature, index) => (
                <li key={index} className="text-gray-300 flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Timeline */}
        <div className="bg-slate-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Clock className="h-5 w-5 text-blue-400" />
            <span className="text-white font-medium">Development Timeline</span>
          </div>
          <p className="text-gray-400">
            Expected completion: <span className="text-blue-400 font-medium">Coming Soon</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Follow our progress and get notified when this feature launches
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            <Home className="h-4 w-4" />
            <span>Go to Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <p className="text-gray-400 text-sm">
            Have suggestions for this page? Contact us at{' '}
            <a 
              href="mailto:support@astrotrade.com" 
              className="text-blue-400 hover:text-blue-300"
            >
              support@astrotrade.com
            </a>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Astro-Trade - Founded by Mahdi in Dhaka, Bangladesh
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;
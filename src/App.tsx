import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import UnderDevelopment from './components/UnderDevelopment';
import Home from './pages/Home';
import Currencies from './pages/Currencies';
import Crypto from './pages/Crypto';
import MarketCap from './pages/MarketCap';
import News from './pages/News';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/currencies" element={<Currencies />} />
          <Route path="/crypto" element={<Crypto />} />
          <Route path="/market-cap" element={<MarketCap />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Under Development Pages */}
          <Route 
            path="/privacy-policy" 
            element={
              <UnderDevelopment 
                pageName="Privacy Policy" 
                expectedFeatures={[
                  'Data collection and usage policies',
                  'Cookie and tracking information',
                  'User rights and data protection',
                  'GDPR compliance details'
                ]}
              />
            } 
          />
          <Route 
            path="/terms-of-service" 
            element={
              <UnderDevelopment 
                pageName="Terms of Service" 
                expectedFeatures={[
                  'Platform usage guidelines',
                  'User responsibilities',
                  'Service limitations',
                  'Legal disclaimers'
                ]}
              />
            } 
          />
          <Route 
            path="/api-documentation" 
            element={
              <UnderDevelopment 
                pageName="API Documentation" 
                expectedFeatures={[
                  'RESTful API endpoints',
                  'Authentication methods',
                  'Rate limiting information',
                  'Code examples and SDKs'
                ]}
              />
            } 
          />
          <Route 
            path="/premium-features" 
            element={
              <UnderDevelopment 
                pageName="Premium Features" 
                expectedFeatures={[
                  'Advanced analytics and insights',
                  'Historical data access',
                  'Custom alerts and notifications',
                  'Priority customer support'
                ]}
              />
            } 
          />
          <Route 
            path="/mobile-app" 
            element={
              <UnderDevelopment 
                pageName="Mobile Application" 
                expectedFeatures={[
                  'iOS and Android apps',
                  'Real-time push notifications',
                  'Offline data access',
                  'Touch-optimized interface'
                ]}
              />
            } 
          />
          
          {/* Catch-all route for undefined pages */}
          <Route 
            path="*" 
            element={
              <UnderDevelopment 
                pageName="Page Not Found" 
                expectedFeatures={[
                  'The page you\'re looking for doesn\'t exist',
                  'It may have been moved or deleted',
                  'Check the URL for typos',
                  'Use the navigation menu to find what you need'
                ]}
              />
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
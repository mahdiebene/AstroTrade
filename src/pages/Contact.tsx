import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock, 
  CheckCircle,
  Building2,
  User,
  AlertCircle,
  Loader,
  Settings,
  TestTube
} from 'lucide-react';
import { emailService, SETUP_INSTRUCTIONS } from '../services/emailService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [showSetupInstructions, setShowSetupInstructions] = useState(false);
  const [isTestingConfig, setIsTestingConfig] = useState(false);

  // Initialize EmailJS (Replace with your actual credentials)
  React.useEffect(() => {
    emailService.initialize(
      'service_eq54hct', // Service ID
      'template_0qim4pd', // Contact Template ID
      'DYeqKUsgr8yKhBy6U', // Public Key
      'template_izppgoa' // Auto Reply Template ID
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('Please fill in all required fields.');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address.');
      }

      // Send email using EmailJS
      const result = await emailService.sendContactEmail(formData);
      
      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          type: 'general'
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const testEmailConfiguration = async () => {
    setIsTestingConfig(true);
    try {
      const result = await emailService.testConfiguration();
      setSubmitStatus({
        type: result.success ? 'success' : 'error',
        message: result.message
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to test configuration. Please check your EmailJS setup.'
      });
    } finally {
      setIsTestingConfig(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email Support',
      details: 'support@astrotrade.com',
      description: 'Get help with technical issues or account questions',
      secondary: 'Business inquiries: business@astrotrade.com'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone Support',
      details: '+880 1317 284650',
      description: 'Available Monday - Friday, 9 AM - 6 PM (GMT+6)',
      secondary: 'WhatsApp support available'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Headquarters',
      details: 'Mohammadpur, Dhaka',
      description: 'Bangladesh',
      secondary: 'Serving clients globally'
    }
  ];

  const faqItems = [
    {
      question: 'How often is the financial data updated?',
      answer: 'Our financial data is updated in real-time, with most data sources refreshing every 30 seconds during market hours.'
    },
    {
      question: 'Is Astro-Trade platform free to use?',
      answer: 'Yes, Astro-Trade provides free access to all real-time financial data, market analysis, and news feeds.'
    },
    {
      question: 'Can I access historical data?',
      answer: 'Currently, we focus on real-time data. Historical data features are planned for future releases.'
    },
    {
      question: 'How accurate is the financial data?',
      answer: 'We source data from reputable financial APIs like CoinGecko and ExchangeRate-API, implementing multiple validation layers to ensure accuracy.'
    },
    {
      question: 'Do you offer API access for developers?',
      answer: 'We are currently developing API access for developers. Contact us for early access opportunities.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Contact Astro-Trade</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Have questions about our platform? Need technical support? 
          We're here to help you make the most of your trading experience.
        </p>
      </div>

      {/* Company Info Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Building2 className="h-8 w-8 text-white" />
            <div>
              <h2 className="text-xl font-bold text-white">Astro-Trade</h2>
              <p className="text-blue-100">Founded by Mahdi • Mohammadpur, Dhaka, Bangladesh</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <User className="h-5 w-5 text-blue-200" />
            <span className="text-blue-100">Trusted by 10K+ traders worldwide</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800 rounded-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowSetupInstructions(!showSetupInstructions)}
                  className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-gray-400 hover:text-white transition-colors"
                  title="Setup Instructions"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={testEmailConfiguration}
                  disabled={isTestingConfig}
                  className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                  title="Test Email Configuration"
                >
                  {isTestingConfig ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <TestTube className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Setup Instructions */}
            {showSetupInstructions && (
              <div className="mb-6 bg-blue-900/20 border border-blue-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-300 mb-4">📧 EmailJS Setup Instructions</h3>
                <div className="space-y-3 text-sm text-blue-200">
                  {SETUP_INSTRUCTIONS.steps.map((step, index) => (
                    <p key={index}>{step}</p>
                  ))}
                </div>
                <div className="mt-4 bg-slate-800 rounded p-4">
                  <p className="text-gray-300 mb-2 text-sm">Code Example:</p>
                  <pre className="text-xs text-gray-400 overflow-x-auto">
{`// Replace in Contact.tsx useEffect:
emailService.initialize(
  'service_abc123',      // Your Service ID
  'template_xyz789',     // Your Template ID  
  'user_def456',         // Your Public Key
  'template_auto123'     // Auto-reply Template (optional)
);`}
                  </pre>
                </div>
              </div>
            )}
            
            {/* Status Messages */}
            {submitStatus.type && (
              <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                submitStatus.type === 'success' 
                  ? 'bg-green-900/20 border border-green-700 text-green-300' 
                  : 'bg-red-900/20 border border-red-700 text-red-300'
              }`}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                <span>{submitStatus.message}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="data">Data Issues</option>
                    <option value="feature">Feature Request</option>
                    <option value="partnership">Partnership</option>
                    <option value="api">API Access</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    placeholder="Brief subject line"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message to Astro-Trade</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information & FAQ */}
        <div className="space-y-8">
          {/* Contact Information */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      {info.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{info.title}</h4>
                    <p className="text-blue-400 font-medium">{info.details}</p>
                    <p className="text-sm text-gray-400">{info.description}</p>
                    {info.secondary && (
                      <p className="text-xs text-gray-500 mt-1">{info.secondary}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Business Hours (GMT+6)
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Monday - Friday</span>
                <span className="text-white">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Saturday</span>
                <span className="text-white">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sunday</span>
                <span className="text-gray-500">Closed</span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-700">
                <p className="text-xs text-gray-400">
                  Emergency support available 24/7 via email
                </p>
              </div>
            </div>
          </div>

          {/* Quick FAQ */}
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index}>
                  <h4 className="font-medium text-white text-sm mb-2">{faq.question}</h4>
                  <p className="text-gray-400 text-xs">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Email Template Preview */}
      <div className="mt-12 bg-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">📧 Professional Email Templates</h3>
        <p className="text-gray-300 mb-4">
          Your EmailJS templates will use professional HTML designs with:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-700 rounded-lg p-4">
            <h4 className="font-semibold text-blue-300 mb-2">📨 Contact Form Email</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Professional header with Astro-Trade branding</li>
              <li>• Organized contact details and message content</li>
              <li>• Responsive design for all email clients</li>
              <li>• Company information and contact details</li>
            </ul>
          </div>
          <div className="bg-slate-700 rounded-lg p-4">
            <h4 className="font-semibold text-green-300 mb-2">✅ Auto-Reply Email</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Thank you message with submission summary</li>
              <li>• Response time expectations (24 hours)</li>
              <li>• Platform features and contact information</li>
              <li>• Professional footer with company details</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
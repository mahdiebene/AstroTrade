# Astro-Trade - Real-Time Financial Data Platform

A comprehensive financial data platform providing real-time cryptocurrency, currency exchange, and stock market data. Founded by Mahdi in Dhaka, Bangladesh.

## 🚀 Features

- **Real-Time Data**: Live updates for currencies, cryptocurrencies, and stock market data
- **50+ Currencies**: Major global currencies with authentic symbols
- **50+ Cryptocurrencies**: Top cryptocurrencies with real symbols and market data
- **50+ Companies**: Major companies with authentic logos and market cap data
- **Breaking News**: Latest financial news and market analysis
- **Professional Contact System**: EmailJS integration with HTML email templates
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Advanced Filtering**: Search, sort, and explore data with comprehensive tools

## 📧 EmailJS Setup

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. Add an email service (Gmail, Outlook, Yahoo, etc.)

### Step 2: Create Email Templates
Create two templates in your EmailJS dashboard:

#### Main Contact Form Template
Use the HTML template from `src/templates/emailTemplates.ts` - `contactFormTemplate`

**Template Variables:**
- `{{from_name}}` - User's full name
- `{{from_email}}` - User's email address
- `{{subject}}` - Email subject line
- `{{message}}` - User's message content
- `{{inquiry_type}}` - Type of inquiry
- `{{timestamp}}` - When message was sent
- `{{company_name}}` - Astro-Trade
- `{{company_email}}` - support@astrotrade.com
- `{{company_phone}}` - +880 1317 284650
- `{{company_address}}` - Mohammadpur, Dhaka, Bangladesh

#### Auto-Reply Template (Optional)
Use the HTML template from `src/templates/emailTemplates.ts` - `autoReplyTemplate`

**Additional Variables:**
- `{{to_name}}` - User's name for auto-reply
- `{{to_email}}` - User's email for auto-reply

### Step 3: Configure in Code
Replace the initialization in `src/pages/Contact.tsx`:

```javascript
// Replace this:
// emailService.initialize('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY');

// With your actual credentials:
emailService.initialize(
  'service_abc123',      // Your Service ID
  'template_xyz789',     // Your main template ID
  'user_def456',         // Your Public Key
  'template_auto123'     // Your auto-reply template ID (optional)
);
```

### Step 4: Test Configuration
Use the test button in the contact form to verify your setup.

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📱 Technologies Used

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **EmailJS** for contact form functionality
- **Vite** for build tooling

## 🌟 Key Components

### Navigation & Routing
- Automatic scroll-to-top on page navigation
- Mobile-responsive navigation menu
- Under development pages for future features

### Data Management
- Real-time API integration with fallback data
- Comprehensive error handling
- Auto-refresh mechanisms

### Contact System
- Professional HTML email templates
- Auto-reply functionality
- Form validation and error handling
- Test configuration feature

### UI/UX Features
- Loading states and error messages
- Advanced filtering and search
- Responsive design for all devices
- Professional company logos and crypto symbols

## 📊 Data Sources

- **Currencies**: ExchangeRate-API for real-time exchange rates
- **Cryptocurrencies**: CoinGecko API for comprehensive crypto data
- **Companies**: Curated data with authentic logos and market information
- **News**: Simulated financial news with realistic content

## 🏢 Company Information

**Astro-Trade**
- **Founder**: Mahdi
- **Location**: Mohammadpur, Dhaka, Bangladesh
- **Email**: support@astrotrade.com
- **Phone**: +880 1317 284650

## 📄 License

© 2024 Astro-Trade. All rights reserved. Founded by Mahdi in Dhaka, Bangladesh.

## 🤝 Support

For technical support or business inquiries:
- Email: support@astrotrade.com
- Phone: +880 1317 284650
- Business Hours: Monday - Friday, 9 AM - 6 PM (GMT+6)
// Professional HTML email templates for EmailJS
export const EMAIL_TEMPLATES = {
  // Main contact form template (what you receive)
  contactFormTemplate: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission - Astro-Trade</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8fafc;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .header .subtitle {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .content {
            padding: 30px 20px;
        }
        
        .alert-box {
            background-color: #dbeafe;
            border-left: 4px solid #2563eb;
            padding: 16px;
            margin-bottom: 24px;
            border-radius: 4px;
        }
        
        .alert-box h2 {
            color: #1e40af;
            font-size: 18px;
            margin-bottom: 8px;
        }
        
        .contact-details {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 24px;
        }
        
        .detail-row {
            display: flex;
            margin-bottom: 12px;
            align-items: center;
        }
        
        .detail-label {
            font-weight: 600;
            color: #374151;
            min-width: 120px;
            margin-right: 12px;
        }
        
        .detail-value {
            color: #1f2937;
            flex: 1;
        }
        
        .inquiry-type {
            display: inline-block;
            background-color: #2563eb;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
        }
        
        .message-section {
            background-color: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 24px;
        }
        
        .message-section h3 {
            color: #374151;
            font-size: 16px;
            margin-bottom: 12px;
            border-bottom: 2px solid #e5e7eb;
            padding-bottom: 8px;
        }
        
        .message-content {
            color: #4b5563;
            line-height: 1.7;
            white-space: pre-wrap;
        }
        
        .footer {
            background-color: #1f2937;
            color: #d1d5db;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }
        
        .footer a {
            color: #60a5fa;
            text-decoration: none;
        }
        
        .footer a:hover {
            text-decoration: underline;
        }
        
        .timestamp {
            color: #6b7280;
            font-size: 12px;
            font-style: italic;
        }
        
        .priority-high {
            background-color: #fef2f2;
            border-left-color: #ef4444;
        }
        
        .priority-high h2 {
            color: #dc2626;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            
            .content {
                padding: 20px 15px;
            }
            
            .detail-row {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .detail-label {
                min-width: auto;
                margin-bottom: 4px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🚀 Astro-Trade</h1>
            <div class="subtitle">New Contact Form Submission</div>
        </div>
        
        <div class="content">
            <div class="alert-box">
                <h2>📧 New Message Received</h2>
                <p>You have received a new contact form submission from your Astro-Trade website.</p>
            </div>
            
            <div class="contact-details">
                <div class="detail-row">
                    <span class="detail-label">👤 Name:</span>
                    <span class="detail-value">{{from_name}}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">📧 Email:</span>
                    <span class="detail-value">{{from_email}}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">📋 Type:</span>
                    <span class="detail-value">
                        <span class="inquiry-type">{{inquiry_type}}</span>
                    </span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">📝 Subject:</span>
                    <span class="detail-value">{{subject}}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">🕒 Received:</span>
                    <span class="detail-value timestamp">{{timestamp}}</span>
                </div>
            </div>
            
            <div class="message-section">
                <h3>💬 Message Content</h3>
                <div class="message-content">{{message}}</div>
            </div>
            
            <div style="background-color: #f0f9ff; border-radius: 8px; padding: 16px; border-left: 4px solid #0ea5e9;">
                <p style="margin: 0; color: #0c4a6e;">
                    <strong>📞 Quick Response:</strong> Reply directly to {{from_email}} or call them if urgent.
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Astro-Trade Contact System</strong></p>
            <p>📍 Mohammadpur, Dhaka, Bangladesh</p>
            <p>📧 <a href="mailto:support@astrotrade.com">support@astrotrade.com</a> | 📞 +880 1317 284650</p>
            <p style="margin-top: 12px; font-size: 12px; opacity: 0.8;">
                This message was automatically generated from your website contact form.
            </p>
        </div>
    </div>
</body>
</html>`,

  // Auto-reply template (what the user receives)
  autoReplyTemplate: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank you for contacting Astro-Trade</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8fafc;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .header .subtitle {
            font-size: 18px;
            opacity: 0.9;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            font-size: 20px;
            color: #1f2937;
            margin-bottom: 20px;
        }
        
        .thank-you-box {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 24px;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 30px;
        }
        
        .thank-you-box h2 {
            font-size: 24px;
            margin-bottom: 8px;
        }
        
        .summary-box {
            background-color: #f8fafc;
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 30px;
            border-left: 4px solid #2563eb;
        }
        
        .summary-title {
            font-size: 18px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 16px;
        }
        
        .summary-item {
            display: flex;
            margin-bottom: 8px;
            align-items: center;
        }
        
        .summary-label {
            font-weight: 500;
            color: #6b7280;
            min-width: 100px;
            margin-right: 12px;
        }
        
        .summary-value {
            color: #1f2937;
            flex: 1;
        }
        
        .response-time {
            background-color: #dbeafe;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .response-time h3 {
            color: #1e40af;
            font-size: 18px;
            margin-bottom: 8px;
        }
        
        .response-time p {
            color: #3730a3;
            font-size: 16px;
        }
        
        .contact-info {
            background-color: #1f2937;
            color: #d1d5db;
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 30px;
        }
        
        .contact-info h3 {
            color: #ffffff;
            font-size: 18px;
            margin-bottom: 16px;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .contact-item span {
            margin-right: 8px;
        }
        
        .features-box {
            background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
            color: white;
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 30px;
        }
        
        .features-box h3 {
            font-size: 18px;
            margin-bottom: 16px;
        }
        
        .feature-list {
            list-style: none;
        }
        
        .feature-list li {
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
        }
        
        .feature-list li:before {
            content: "✨";
            position: absolute;
            left: 0;
        }
        
        .footer {
            background-color: #1f2937;
            color: #d1d5db;
            padding: 30px 20px;
            text-align: center;
        }
        
        .footer-logo {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #ffffff;
        }
        
        .footer p {
            margin-bottom: 4px;
            font-size: 14px;
        }
        
        .footer a {
            color: #60a5fa;
            text-decoration: none;
        }
        
        .footer a:hover {
            text-decoration: underline;
        }
        
        .disclaimer {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 16px;
            margin-top: 20px;
            border-radius: 4px;
        }
        
        .disclaimer p {
            color: #92400e;
            font-size: 12px;
            margin: 0;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .summary-item {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .summary-label {
                min-width: auto;
                margin-bottom: 4px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🚀 Astro-Trade</h1>
            <div class="subtitle">Real-Time Financial Data Platform</div>
        </div>
        
        <div class="content">
            <div class="greeting">
                Dear {{to_name}},
            </div>
            
            <div class="thank-you-box">
                <h2>✅ Message Received Successfully!</h2>
                <p>Thank you for contacting Astro-Trade. We appreciate your interest in our platform.</p>
            </div>
            
            <p style="color: #4b5563; margin-bottom: 24px; font-size: 16px;">
                We have successfully received your message and our team will review it carefully. 
                Here's a summary of your submission:
            </p>
            
            <div class="summary-box">
                <div class="summary-title">📋 Your Message Summary</div>
                <div class="summary-item">
                    <span class="summary-label">Type:</span>
                    <span class="summary-value">{{inquiry_type}}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Subject:</span>
                    <span class="summary-value">{{subject}}</span>
                </div>
                <div class="summary-item">
                    <span class="summary-label">Submitted:</span>
                    <span class="summary-value">{{timestamp}}</span>
                </div>
            </div>
            
            <div class="response-time">
                <h3>⏰ Response Time</h3>
                <p><strong>We'll get back to you within 24 hours</strong></p>
            </div>
            
            <div class="contact-info">
                <h3>📞 Need Immediate Assistance?</h3>
                <div class="contact-item">
                    <span>📧</span>
                    <span>Email: support@astrotrade.com</span>
                </div>
                <div class="contact-item">
                    <span>📞</span>
                    <span>Phone: +880 1317 284650</span>
                </div>
                <div class="contact-item">
                    <span>📍</span>
                    <span>Address: Mohammadpur, Dhaka, Bangladesh</span>
                </div>
                <div class="contact-item">
                    <span>🕒</span>
                    <span>Business Hours: Monday - Friday, 9 AM - 6 PM (GMT+6)</span>
                </div>
            </div>
            
            <div class="features-box">
                <h3>🌟 Explore Astro-Trade Features</h3>
                <p style="margin-bottom: 16px;">While you wait, explore our comprehensive financial data platform:</p>
                <ul class="feature-list">
                    <li>Real-time cryptocurrency prices and market data</li>
                    <li>Live currency exchange rates for 50+ currencies</li>
                    <li>Stock market capitalization tracking</li>
                    <li>Breaking financial news and analysis</li>
                    <li>Advanced filtering and search capabilities</li>
                    <li>Mobile-responsive design for all devices</li>
                </ul>
            </div>
            
            <p style="color: #4b5563; font-size: 16px; text-align: center;">
                Thank you for choosing Astro-Trade for your financial data needs!
            </p>
        </div>
        
        <div class="footer">
            <div class="footer-logo">Astro-Trade</div>
            <p>Founded by Mahdi in Dhaka, Bangladesh</p>
            <p>📍 Mohammadpur, Dhaka, Bangladesh</p>
            <p>📧 <a href="mailto:support@astrotrade.com">support@astrotrade.com</a></p>
            <p>📞 +880 1317 284650</p>
            <p style="margin-top: 16px; font-size: 12px; opacity: 0.8;">
                © 2024 Astro-Trade. All rights reserved.
            </p>
            
            <div class="disclaimer">
                <p>
                    This is an automated response. Please do not reply to this email. 
                    For support, contact us at support@astrotrade.com
                </p>
            </div>
        </div>
    </div>
</body>
</html>`,

  // Newsletter subscription template (bonus)
  newsletterTemplate: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Astro-Trade Newsletter</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8fafc;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 8px;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .welcome-box {
            background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
            color: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 30px;
        }
        
        .footer {
            background-color: #1f2937;
            color: #d1d5db;
            padding: 30px 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🎉 Welcome to Astro-Trade!</h1>
            <div class="subtitle">Newsletter Subscription Confirmed</div>
        </div>
        
        <div class="content">
            <div class="welcome-box">
                <h2>✅ Successfully Subscribed!</h2>
                <p>{{subscriber_name}}, you're now part of our exclusive community.</p>
            </div>
            
            <p>Thank you for subscribing to the Astro-Trade newsletter! You'll receive:</p>
            <ul style="margin: 20px 0; padding-left: 20px;">
                <li>Weekly market analysis and insights</li>
                <li>Cryptocurrency trend reports</li>
                <li>Platform updates and new features</li>
                <li>Exclusive trading tips and strategies</li>
            </ul>
        </div>
        
        <div class="footer">
            <p><strong>Astro-Trade</strong></p>
            <p>Founded by Mahdi • Mohammadpur, Dhaka, Bangladesh</p>
        </div>
    </div>
</body>
</html>`
};

// EmailJS setup instructions
export const EMAILJS_SETUP_GUIDE = {
  step1: "Create account at https://www.emailjs.com/",
  step2: "Create an email service (Gmail, Outlook, etc.)",
  step3: "Create email templates using the HTML above",
  step4: "Get your Service ID, Template ID, and Public Key",
  step5: "Initialize in your Contact component",
  
  templateVariables: {
    // Contact Form Variables
    "{{from_name}}": "User's full name",
    "{{from_email}}": "User's email address", 
    "{{subject}}": "Email subject line",
    "{{message}}": "User's message content",
    "{{inquiry_type}}": "Type of inquiry",
    "{{timestamp}}": "When message was sent",
    
    // Auto-reply Variables
    "{{to_name}}": "User's name for auto-reply",
    "{{to_email}}": "User's email for auto-reply",
    
    // Company Variables
    "{{company_name}}": "Astro-Trade",
    "{{company_email}}": "support@astrotrade.com",
    "{{company_phone}}": "+880 1317 284650",
    "{{company_address}}": "Mohammadpur, Dhaka, Bangladesh"
  }
};
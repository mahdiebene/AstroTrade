import emailjs from '@emailjs/browser';

// EmailJS configuration interface
interface EmailConfig {
  serviceId: string;
  templateId: string;
  autoReplyTemplateId?: string;
  publicKey: string;
}

// Contact form data interface
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
}

class EmailService {
  private config: EmailConfig | null = null;

  // Initialize EmailJS with your credentials
  initialize(serviceId: string, templateId: string, publicKey: string, autoReplyTemplateId?: string) {
    this.config = {
      serviceId,
      templateId,
      autoReplyTemplateId,
      publicKey
    };
    
    // Initialize EmailJS
    emailjs.init(publicKey);
  }

  // Send contact form email with auto-reply
  async sendContactEmail(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    if (!this.config) {
      throw new Error('EmailJS not initialized. Please call initialize() first with your credentials.');
    }

    try {
      // Prepare template parameters for main email
      const templateParams = {
        // User information
        from_name: formData.name,
        from_email: formData.email,
        
        // Message details
        subject: formData.subject,
        message: formData.message,
        inquiry_type: this.formatInquiryType(formData.type),
        
        // Additional context
        website: 'Astro-Trade',
        timestamp: new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Dhaka'
        }),
        
        // For auto-reply
        to_name: formData.name,
        to_email: formData.email,
        
        // Company information
        company_name: 'Astro-Trade',
        company_email: 'support@astrotrade.com',
        company_phone: '+880 1317 284650',
        company_address: 'Mohammadpur, Dhaka, Bangladesh'
      };

      // Send main contact form email
      const response = await emailjs.send(
        this.config.serviceId,
        this.config.templateId,
        templateParams,
        this.config.publicKey
      );

      // Send auto-reply if template is configured
      if (this.config.autoReplyTemplateId && response.status === 200) {
        try {
          await emailjs.send(
            this.config.serviceId,
            this.config.autoReplyTemplateId,
            templateParams,
            this.config.publicKey
          );
        } catch (autoReplyError) {
          console.warn('Auto-reply failed, but main email sent successfully:', autoReplyError);
        }
      }

      if (response.status === 200) {
        return {
          success: true,
          message: `Thank you ${formData.name}! Your message has been sent successfully. We'll get back to you within 24 hours at ${formData.email}.`
        };
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      
      // Provide helpful error messages
      let errorMessage = 'Failed to send message. ';
      
      if (error instanceof Error) {
        if (error.message.includes('not initialized')) {
          errorMessage += 'Email service not configured. Please contact support directly.';
        } else if (error.message.includes('network')) {
          errorMessage += 'Network error. Please check your connection and try again.';
        } else if (error.message.includes('template')) {
          errorMessage += 'Email template error. Please contact support directly.';
        } else {
          errorMessage += 'Please try again or contact us directly at support@astrotrade.com';
        }
      } else {
        errorMessage += 'Please try again or contact us directly at support@astrotrade.com';
      }
      
      return {
        success: false,
        message: errorMessage
      };
    }
  }

  // Format inquiry type for display
  private formatInquiryType(type: string): string {
    const typeMap: Record<string, string> = {
      'general': 'General Inquiry',
      'technical': 'Technical Support',
      'data': 'Data Issues',
      'feature': 'Feature Request',
      'partnership': 'Partnership Inquiry',
      'api': 'API Access Request'
    };
    
    return typeMap[type] || type;
  }

  // Send newsletter subscription (bonus feature)
  async sendNewsletterSubscription(email: string, name?: string): Promise<{ success: boolean; message: string }> {
    if (!this.config) {
      throw new Error('EmailJS not initialized.');
    }

    try {
      const templateParams = {
        subscriber_email: email,
        subscriber_name: name || 'Valued Customer',
        website: 'Astro-Trade',
        timestamp: new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'Asia/Dhaka'
        }),
        company_name: 'Astro-Trade',
        company_email: 'support@astrotrade.com'
      };

      const response = await emailjs.send(
        this.config.serviceId,
        'newsletter_template', // You'll need a separate template for this
        templateParams,
        this.config.publicKey
      );

      if (response.status === 200) {
        return {
          success: true,
          message: 'Successfully subscribed to our newsletter! Check your email for confirmation.'
        };
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return {
        success: false,
        message: 'Failed to subscribe. Please try again later or contact support.'
      };
    }
  }

  // Test email configuration
  async testConfiguration(): Promise<{ success: boolean; message: string }> {
    if (!this.config) {
      return {
        success: false,
        message: 'EmailJS not initialized. Please provide your credentials.'
      };
    }

    try {
      const testParams = {
        from_name: 'Test User',
        from_email: 'test@example.com',
        subject: 'EmailJS Configuration Test',
        message: 'This is a test message to verify EmailJS configuration.',
        inquiry_type: 'Technical Support',
        timestamp: new Date().toLocaleString(),
        to_name: 'Test User',
        to_email: 'test@example.com',
        company_name: 'Astro-Trade',
        company_email: 'support@astrotrade.com',
        company_phone: '+880 1317 284650',
        company_address: 'Mohammadpur, Dhaka, Bangladesh'
      };

      const response = await emailjs.send(
        this.config.serviceId,
        this.config.templateId,
        testParams,
        this.config.publicKey
      );

      if (response.status === 200) {
        return {
          success: true,
          message: 'EmailJS configuration test successful!'
        };
      } else {
        throw new Error('Test failed');
      }
    } catch (error) {
      return {
        success: false,
        message: `Configuration test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();

// Setup instructions for easy reference
export const SETUP_INSTRUCTIONS = {
  title: "EmailJS Setup Instructions for Astro-Trade",
  steps: [
    "1. Go to https://www.emailjs.com/ and create a free account",
    "2. Add an email service (Gmail, Outlook, Yahoo, etc.)",
    "3. Create two email templates using the HTML from emailTemplates.ts:",
    "   - Main template: for receiving contact form submissions",
    "   - Auto-reply template: for sending confirmations to users",
    "4. Get your Service ID, Template IDs, and Public Key from EmailJS dashboard",
    "5. Replace the initialization in Contact.tsx with your actual credentials"
  ],
  
  codeExample: `
// In src/pages/Contact.tsx, replace this line:
// emailService.initialize('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', 'YOUR_PUBLIC_KEY');

// With your actual credentials:
emailService.initialize(
  'service_abc123',      // Your Service ID
  'template_xyz789',     // Your main template ID
  'user_def456',         // Your Public Key
  'template_auto123'     // Your auto-reply template ID (optional)
);`,

  templateVariables: {
    "{{from_name}}": "User's full name from form",
    "{{from_email}}": "User's email address",
    "{{subject}}": "Email subject line",
    "{{message}}": "User's message content",
    "{{inquiry_type}}": "Formatted inquiry type",
    "{{timestamp}}": "Formatted date and time",
    "{{to_name}}": "User's name for auto-reply",
    "{{company_name}}": "Astro-Trade",
    "{{company_email}}": "support@astrotrade.com",
    "{{company_phone}}": "+880 1317 284650",
    "{{company_address}}": "Mohammadpur, Dhaka, Bangladesh"
  }
};
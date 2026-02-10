import { useState } from 'react';
import { Phone, Mail, MapPin, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Section from '../layout/Section';
import { CONTACT_INFO } from '../../config/contact';
import { useSubmitInquiry } from '../../hooks/useQueries';

export default function ContactSection() {
  const submitInquiry = useSubmitInquiry();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact information is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const success = await submitInquiry.mutateAsync(formData);
      if (success) {
        setIsSubmitted(true);
        setFormData({ name: '', contact: '', message: '' });
        setErrors({});
        setTimeout(() => setIsSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Inquiry submission failed:', error);
    }
  };

  return (
    <Section id="contact">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">Contact Us</h2>
          <p className="text-lg text-muted-foreground">
            Get in touch with us for inquiries, appointments, or custom orders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
              <h3 className="text-xl font-semibold">Get In Touch</h3>

              <div className="space-y-4">
                <a
                  href={`tel:${CONTACT_INFO.phoneHref}`}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Phone</p>
                    <p className="text-muted-foreground">{CONTACT_INFO.phone}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <p className="text-muted-foreground">{CONTACT_INFO.email}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Location</p>
                    <p className="text-muted-foreground">{CONTACT_INFO.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
              <h4 className="font-semibold mb-2">Business Hours</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                <p>Saturday: 10:00 AM - 6:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold">Message Sent!</h4>
                <p className="text-muted-foreground">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Email or Phone <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Your email or phone number"
                  />
                  {errors.contact && (
                    <p className="text-sm text-destructive">{errors.contact}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="How can we help you?"
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message}</p>
                  )}
                </div>

                {submitInquiry.isError && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-destructive">Submission Failed</p>
                      <p className="text-sm text-destructive/80">
                        Please try again later.
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitInquiry.isPending}
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitInquiry.isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

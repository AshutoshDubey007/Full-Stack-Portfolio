import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SayHiModalProps {
  isOpen: boolean;
  email: string;
  phone?: string;
  onClose: () => void;
}

export const SayHiModal: React.FC<SayHiModalProps> = ({
  isOpen,
  email,
  phone = "+91-7067581520",
  onClose,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const generateMailtoUrl = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hi Ashutosh,\n\n${formData.message || 'I would like to connect regarding an opportunity.'}\n\nBest regards,\n${formData.name || 'A Visitor'}\n${formData.email || ''}`
    );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // If an access key or Formspree endpoint is configured, send directly via API
    if (web3FormsKey || formspreeEndpoint) {
      setIsSubmitting(true);
      try {
        const endpoint = formspreeEndpoint || "https://api.web3forms.com/submit";
        const payload = formspreeEndpoint
          ? {
              name: formData.name,
              email: formData.email,
              message: formData.message,
            }
          : {
              access_key: web3FormsKey,
              name: formData.name,
              email: formData.email,
              message: formData.message,
              subject: `Portfolio Message from ${formData.name}`,
              from_name: `${formData.name} (Portfolio)`,
            };

        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (response.ok && (data.success || data.ok)) {
          setSent(true);
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => {
            setSent(false);
            onClose();
          }, 2400);
        } else {
          throw new Error(data.message || "Failed to send message.");
        }
      } catch (err: any) {
        // If API fails, fall back to mailto client
        setErrorMessage("Could not send via direct API. Opening your mail client instead...");
        window.location.href = generateMailtoUrl();
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // No API key configured yet: open native mailto client with pre-filled message
      window.location.href = generateMailtoUrl();
      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-8"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-lg w-full bg-surface border border-stroke rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-muted font-mono">
                Direct Contact • Pune, India
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-display italic text-text-primary">
                Reach out to Ashutosh
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-bg border border-stroke text-text-primary hover:text-white flex items-center justify-center transition-colors touch-manipulation"
            >
              ✕
            </button>
          </div>

          {/* Contact quick copy cards */}
          <div className="grid grid-cols-1 gap-2.5 sm:gap-3 mb-5 sm:mb-6">
            {/* Email */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-bg/60 border border-stroke flex items-center justify-between gap-3">
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] sm:text-[10px] uppercase font-mono text-muted">Email</span>
                <span className="text-xs sm:text-sm font-mono text-text-primary truncate">
                  {email}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="text-[11px] sm:text-xs px-3 sm:px-3.5 py-1.5 rounded-full bg-stroke hover:bg-stroke/80 text-text-primary font-medium shrink-0 transition-colors touch-manipulation"
              >
                {copiedEmail ? "Copied! ✓" : "Copy"}
              </button>
            </div>

            {/* Phone */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-bg/60 border border-stroke flex items-center justify-between gap-3">
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] sm:text-[10px] uppercase font-mono text-muted">Phone / WhatsApp</span>
                <span className="text-xs sm:text-sm font-mono text-text-primary">
                  {phone}
                </span>
              </div>
              <button
                onClick={handleCopyPhone}
                className="text-[11px] sm:text-xs px-3 sm:px-3.5 py-1.5 rounded-full bg-stroke hover:bg-stroke/80 text-text-primary font-medium shrink-0 transition-colors touch-manipulation"
              >
                {copiedPhone ? "Copied! ✓" : "Copy"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          {sent ? (
            <div className="p-6 sm:p-8 text-center flex flex-col items-center gap-2">
              <span className="text-3xl">🚀</span>
              <h4 className="text-base sm:text-lg font-medium text-text-primary">Message dispatched!</h4>
              <p className="text-xs text-muted max-w-xs">
                Your message is on its way to {email}. Ashutosh will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div>
                <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-muted font-mono mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Hiring Manager / Collaborator"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-stroke text-text-primary text-base sm:text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-muted font-mono mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. contact@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-stroke text-text-primary text-base sm:text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-muted font-mono mb-1">
                  Message / Role details
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about the Frontend / Mobile role or project..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-stroke text-text-primary text-base sm:text-sm focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <a
                  href={generateMailtoUrl()}
                  className="text-xs text-muted hover:text-text-primary underline font-mono truncate"
                >
                  Direct Mail Client ↗
                </a>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-text-primary text-bg font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity touch-manipulation disabled:opacity-50 shrink-0"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>

              {!web3FormsKey && !formspreeEndpoint && (
                <p className="text-[10px] text-muted/70 text-center pt-1 font-mono">
                  Tip: Submitting opens your mail client pre-filled. Add Web3Forms key to .env for direct inbox delivery.
                </p>
              )}
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

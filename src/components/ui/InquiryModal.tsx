import { useState, useEffect } from 'react';

interface InquiryModalProps {
  defaultProduct?: string;
  lang?: string;
}

const uiText = {
  zh: {
    title: '产品询价',
    name: '您的姓名 *',
    namePlaceholder: '请输入您的姓名',
    email: '电子邮箱 *',
    emailPlaceholder: 'email@company.com',
    company: '公司名称',
    companyPlaceholder: '您的公司名称',
    product: '产品型号 / 感兴趣的产品',
    productPlaceholder: '如：LC/APC 保偏跳线 2m',
    message: '需求描述 *',
    messagePlaceholder: '请描述您的需求，包括数量、规格要求等...',
    submit: '提交询价',
    sending: '发送中...',
    success: '✅ 询价已发送！我们将在24小时内通过邮件回复您。',
    error: '❌ 发送失败，请直接发送邮件至 info@fiberlink.com',
    close: '关闭',
    required: '请填写必填字段',
  },
  en: {
    title: 'Product Inquiry',
    name: 'Your Name *',
    namePlaceholder: 'Your full name',
    email: 'Email Address *',
    emailPlaceholder: 'email@company.com',
    company: 'Company Name',
    companyPlaceholder: 'Your company name',
    product: 'Product Model / Interest',
    productPlaceholder: 'e.g. LC/APC PM Patch Cord 2m',
    message: 'Requirements *',
    messagePlaceholder: 'Please describe your requirements including quantity, spec details...',
    submit: 'Submit Inquiry',
    sending: 'Sending...',
    success: '✅ Inquiry sent! We will reply within 24 hours.',
    error: '❌ Failed to send. Please email us directly at info@fiberlink.com',
    close: 'Close',
    required: 'Please fill in required fields',
  },
};

export default function InquiryModal({ defaultProduct = '', lang = 'zh' }: InquiryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [product, setProduct] = useState(defaultProduct);
  const t = uiText[lang as keyof typeof uiText] || uiText.zh;

  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.product) {
        setProduct(customEvent.detail.product);
      }
      setIsOpen(true);
      setStatus('idle');
    };
    document.addEventListener('open-inquiry', handler);
    return () => document.removeEventListener('open-inquiry', handler);
  }, []);

  useEffect(() => {
    setProduct(defaultProduct);
  }, [defaultProduct]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl">
          <h2 className="text-xl font-bold text-white">{t.title}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-blue-100 hover:text-white transition-colors p-1 rounded-full hover:bg-blue-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">📬</div>
              <p className="text-green-600 font-medium text-lg">{t.success}</p>
              <button
                onClick={() => { setIsOpen(false); setStatus('idle'); }}
                className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {t.close}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.name}</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={t.namePlaceholder}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t.emailPlaceholder}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.company}</label>
                <input
                  type="text"
                  name="company"
                  placeholder={t.companyPlaceholder}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.product}</label>
                <input
                  type="text"
                  name="product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder={t.productPlaceholder}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.message}</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{t.error}</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm"
              >
                {status === 'sending' ? t.sending : t.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

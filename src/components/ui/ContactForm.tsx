import { useState } from 'react';

const uiText = {
  zh: {
    name: '您的姓名 *', namePh: '请输入您的姓名',
    email: '电子邮箱 *', emailPh: 'email@company.com',
    company: '公司名称', companyPh: '公司名称（选填）',
    phone: '联系电话', phonePh: '+86-',
    product: '感兴趣的产品', productPh: '如：保偏跳线 LC/APC 1m',
    message: '留言内容 *', messagePh: '请描述您的需求或问题...',
    submit: '发送消息',
    sending: '发送中...',
    success: '✅ 消息已发送！我们将在24小时内通过邮件回复您。',
    error: '❌ 发送失败，请稍后重试或直接发邮件至 info@fiberlink.com',
  },
  en: {
    name: 'Your Name *', namePh: 'Your full name',
    email: 'Email Address *', emailPh: 'email@company.com',
    company: 'Company Name', companyPh: 'Your company (optional)',
    phone: 'Phone Number', phonePh: '+1-',
    product: 'Product of Interest', productPh: 'e.g. Panda PM fiber patch cable LC/APC 1m',
    message: 'Message *', messagePh: 'Describe your requirements or questions...',
    submit: 'Send Message',
    sending: 'Sending...',
    success: '✅ Message sent! We will reply within 24 hours.',
    error: '❌ Failed to send. Please email us directly at info@fiberlink.com',
  },
};

interface ContactFormProps {
  lang?: string;
}

export default function ContactForm({ lang = 'zh' }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const t = uiText[lang as keyof typeof uiText] || uiText.zh;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: new FormData(form),
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

  if (status === 'success') {
    return (
      <div className="text-center py-12 bg-green-50 rounded-2xl border border-green-200">
        <div className="text-5xl mb-4">📬</div>
        <p className="text-green-700 font-medium text-lg">{t.success}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-green-600 underline hover:no-underline"
        >
          {lang === 'en' ? 'Send another message' : '再发一条消息'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.name}</label>
          <input type="text" name="name" required placeholder={t.namePh}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.email}</label>
          <input type="email" name="email" required placeholder={t.emailPh}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.company}</label>
          <input type="text" name="company" placeholder={t.companyPh}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.phone}</label>
          <input type="tel" name="phone" placeholder={t.phonePh}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.product}</label>
        <input type="text" name="product" placeholder={t.productPh}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.message}</label>
        <textarea name="message" required rows={5} placeholder={t.messagePh}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none transition-all" />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm bg-red-50 px-4 py-3 rounded-lg border border-red-200">{t.error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm flex items-center justify-center gap-2"
      >
        {status === 'sending' ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {t.sending}
          </>
        ) : (
          <>📧 {t.submit}</>
        )}
      </button>
    </form>
  );
}

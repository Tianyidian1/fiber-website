export const languages = {
  zh: '中文',
  en: 'English',
} as const;

export const defaultLang = 'zh';

export const ui = {
  zh: {
    // Navigation
    'nav.products': '产品中心',
    'nav.solutions': '解决方案',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',
    'nav.search': '搜索',
    'nav.sample': '样品申请',
    
    // Product categories
    'cat.pm': '保偏跳线',
    'cat.hd': '高密度连接',
    'cat.test': '测试解决方案',
    'cat.special': '特种应用跳线',
    
    // Hero
    'hero.inquire': '立即询价',
    'hero.learn': '了解更多',
    
    // Home sections
    'home.products.title': '核心产品线',
    'home.products.subtitle': '专业光纤解决方案，满足各类工业与通信需求',
    'home.advantages.title': '为什么选择我们',
    'home.products.inquire': '立即询价',
    'home.products.detail': '查看详情',
    
    // Advantages
    'adv.loss': '超低插入损耗',
    'adv.loss.desc': '插入损耗 < 0.3dB，确保信号完整传输',
    'adv.delivery': '快速发货',
    'adv.delivery.desc': '标准产品3-5日发货，定制产品7-14日',
    'adv.custom': '定制能力',
    'adv.custom.desc': '支持OEM/ODM，满足特殊规格需求',
    'adv.quality': '品质保证',
    'adv.quality.desc': '每批次100%测试，提供完整测试报告',
    
    // Product detail
    'product.specs': '技术规格',
    'product.order': '订购指南',
    'product.download': '资料下载',
    'product.related': '相关产品',
    'product.inquire': '询价/联系我们',
    'product.connector': '连接器类型',
    'product.diameter': '线缆外径',
    'product.length': '定制长度',
    'product.datasheet': '下载规格书 (PDF)',
    
    // Inquiry form
    'inquiry.title': '产品询价',
    'inquiry.name': '您的姓名',
    'inquiry.email': '电子邮箱',
    'inquiry.company': '公司名称',
    'inquiry.product': '产品型号',
    'inquiry.message': '需求描述',
    'inquiry.submit': '提交询价',
    'inquiry.sending': '发送中...',
    'inquiry.success': '询价已发送，我们将在24小时内回复您！',
    'inquiry.error': '发送失败，请稍后重试或直接发邮件联系我们。',
    'inquiry.close': '关闭',
    
    // Contact
    'contact.title': '联系我们',
    'contact.address': '公司地址',
    'contact.phone': '联系电话',
    'contact.email': '电子邮箱',
    'contact.hours': '工作时间',
    'contact.hours.value': '周一至周五 09:00-18:00 (UTC+8)',
    'contact.form.title': '发送询盘',
    
    // About
    'about.title': '关于我们',
    'about.subtitle': '专注光纤互联解决方案',
    
    // Footer
    'footer.products': '产品中心',
    'footer.company': '公司信息',
    'footer.support': '技术支持',
    'footer.copyright': '版权所有',
    'footer.about': '关于我们',
    'footer.contact': '联系我们',
    'footer.faq': '常见问题',
    
    // Breadcrumb
    'breadcrumb.home': '首页',
    'breadcrumb.products': '产品',
    'breadcrumb.solutions': '解决方案',

    // Solutions
    'solutions.title': '解决方案',
    'solutions.hero': '完整解决方案',
    'solutions.subtitle': '从器件到测试，我们为客户提供端到端的光纤互联能力',

    // Common
    'common.more': '查看更多',
    'common.back': '返回',
    'common.loading': '加载中...',
  },
  en: {
    // Navigation
    'nav.products': 'Products',
    'nav.solutions': 'Solutions',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.search': 'Search',
    'nav.sample': 'Sample Request',
    
    // Product categories
    'cat.pm': 'PM Patch Cords',
    'cat.hd': 'High Density',
    'cat.test': 'Test Solutions',
    'cat.special': 'Specialty Cables',
    
    // Hero
    'hero.inquire': 'Inquire Now',
    'hero.learn': 'Learn More',
    
    // Home sections
    'home.products.title': 'Core Product Lines',
    'home.products.subtitle': 'Professional fiber optic solutions for industrial and telecom applications',
    'home.advantages.title': 'Why Choose Us',
    'home.products.inquire': 'Inquire Now',
    'home.products.detail': 'View Details',
    
    // Advantages
    'adv.loss': 'Ultra-Low Insertion Loss',
    'adv.loss.desc': 'Insertion loss < 0.3dB, ensuring complete signal integrity',
    'adv.delivery': 'Fast Delivery',
    'adv.delivery.desc': 'Standard products ship in 3-5 days, custom in 7-14 days',
    'adv.custom': 'Custom Capability',
    'adv.custom.desc': 'OEM/ODM support for special specifications',
    'adv.quality': 'Quality Assurance',
    'adv.quality.desc': '100% testing per batch with complete test reports',
    
    // Product detail
    'product.specs': 'Technical Specifications',
    'product.order': 'Order Guide',
    'product.download': 'Downloads',
    'product.related': 'Related Products',
    'product.inquire': 'Inquire / Contact Us',
    'product.connector': 'Connector Type',
    'product.diameter': 'Cable Diameter',
    'product.length': 'Custom Length',
    'product.datasheet': 'Download Datasheet (PDF)',
    
    // Inquiry form
    'inquiry.title': 'Product Inquiry',
    'inquiry.name': 'Your Name',
    'inquiry.email': 'Email Address',
    'inquiry.company': 'Company Name',
    'inquiry.product': 'Product Model',
    'inquiry.message': 'Requirements',
    'inquiry.submit': 'Submit Inquiry',
    'inquiry.sending': 'Sending...',
    'inquiry.success': 'Inquiry sent! We will reply within 24 hours.',
    'inquiry.error': 'Failed to send. Please try again or email us directly.',
    'inquiry.close': 'Close',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Business Hours',
    'contact.hours.value': 'Monday-Friday 09:00-18:00 (UTC+8)',
    'contact.form.title': 'Send Inquiry',
    
    // About
    'about.title': 'About Us',
    'about.subtitle': 'Dedicated Fiber Optic Interconnect Solutions',
    
    // Footer
    'footer.products': 'Products',
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.copyright': 'All Rights Reserved',
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.faq': 'FAQ',
    
    // Breadcrumb
    'breadcrumb.home': 'Home',
    'breadcrumb.products': 'Products',
    'breadcrumb.solutions': 'Solutions',

    // Solutions
    'solutions.title': 'Solutions',
    'solutions.hero': 'Complete Solutions',
    'solutions.subtitle': 'From components to testing, we provide end-to-end fiber connectivity capabilities',

    // Common
    'common.more': 'Learn More',
    'common.back': 'Back',
    'common.loading': 'Loading...',
  },
} as const;

export type UIKey = keyof typeof ui[typeof defaultLang];

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: UIKey): string {
    return (ui[lang] as Record<string, string>)[key] || (ui[defaultLang] as Record<string, string>)[key] || key;
  };
}

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as keyof typeof ui;
  return defaultLang;
}

export function getLocalizedPath(path: string, lang: string) {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}

import ApoutClientWrapper from './ApoutClientWrapper';

export const metadata = {
  title: 'من نحن | عقاري ماب',
  description:
    'مرحبًا بكم في عقاري ماب – منصتكم الأولى لاستكشاف العقارات في سوريا. نوفر تجربة تصفح موثوقة وبسيطة لكل من يبحث عن فرص استثمارية مثل أرض، شقة، فيلا، أو عقار تجاري للبيع أو الإيجار.',
  keywords: [
    'عقاري ماب',
    'عقارات سوريا',
    'بيع شقق',
    'إيجار فيلا',
    'عقار تجاري',
    'عقارات للاستثمار',
    'شراء أرض في سوريا',
    'منصة عقارية',
  ],
  canonical: 'https://yourdomain.com/about',
  openGraph: {
    title: 'من نحن | عقاري ماب',
    description:
      'اكتشف معنا فرصك العقارية في سوريا بكل سهولة وثقة. عقاري ماب هو دليلك للاستثمار العقاري الذكي.',
    url: 'https://yourdomain.com/about',
    siteName: 'AqariMap',
    locale: 'ar_SY',
    type: 'website',
    // image: 'https://yourdomain.com/og-image.jpg', 
  },
};

export default function AboutPage() {
  return <ApoutClientWrapper />;
}

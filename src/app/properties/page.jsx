import PropertiesClientWrapper from './PropertiesClientWrapper';

export const metadata = {
  title: 'جميع العقارات | عقاري ماب',
  description: 'تصفح جميع أنواع العقارات المتاحة للبيع والإيجار في سوريا، بما في ذلك الشقق، الفلل، الأراضي، والمكاتب.',
  keywords: ['جميع العقارات', 'عقارات للبيع', 'عقارات للإيجار', 'شقق', 'فلل', 'أراضي', 'سوريا'],
  openGraph: {
    title: 'جميع العقارات | عقاري ماب',
    description: 'استعرض جميع العقارات المعروضة للبيع أو الإيجار في منصة عقاري ماب.',
    url: 'https://yourdomain.com/properties',
    siteName: 'AqariMap',
    locale: 'ar_SY',
    type: 'website',
  },
};

export default function PropertiesPage() {
  return <PropertiesClientWrapper />;
}

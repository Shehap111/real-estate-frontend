import RentClientWrapper from './RentClientWrapper';

export const metadata = {
  title: 'عقارات للإيجار | عقاري ماب',
  description: 'استعرض أفضل العقارات للإيجار في سوريا. شقق، فلل، مكاتب، وعقارات تجارية بمواصفات مميزة.',
  keywords: ['عقارات للإيجار', 'شقق للإيجار', 'فلل', 'مكاتب', 'إيجار عقار', 'سوريا'],
  openGraph: {
    title: 'عقارات للإيجار | عقاري ماب',
    description: 'اكتشف أفضل العقارات للإيجار في سوريا، بمواصفات واضحة وأسعار تنافسية.',
    url: 'https://yourdomain.com/rent',
    siteName: 'AqariMap',
    locale: 'ar_SY',
    type: 'website',
  },
};

export default function RentPage() {
  return <RentClientWrapper />;
}

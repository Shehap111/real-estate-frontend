import ContactClientWrapper from './ContactClientWrapper';

export const metadata = {
  title: 'تواصل معنا | عقاري ماب',
  description: 'اتصل بنا للحصول على دعم، استفسارات، أو اقتراحات تتعلق بالعقارات أو خدماتنا.',
  keywords: ['تواصل معنا', 'اتصال', 'دعم العملاء', 'عقاري ماب', 'سوريا'],
  openGraph: {
    title: 'تواصل معنا | عقاري ماب',
    description: 'نحن هنا للإجابة على استفساراتك العقارية وتقديم أفضل الدعم.',
    url: 'https://yourdomain.com/contact',
    siteName: 'AqariMap',
    locale: 'ar_SY',
    type: 'website',
  },
};

export default function ContactPage() {
  return <ContactClientWrapper />;
}

import BlogClientWrapper from './BlogClientWrapper';

export const metadata = {
  title: 'مدونة عقاري ماب',
  description: 'تابع آخر أخبار ونصائح سوق العقارات في سوريا عبر مدونة عقاري ماب.',
  keywords: [
    'مدونة عقاري ماب',
    'نصائح عقارية',
    'أخبار العقارات',
    'الاستثمار العقاري',
    'عقارات سوريا',
  ],
  canonical: 'https://yourdomain.com/blog',
  openGraph: {
    title: 'مدونة عقاري ماب',
    description: 'تابع آخر أخبار ونصائح سوق العقارات في سوريا عبر مدونة عقاري ماب.',
    url: 'https://yourdomain.com/blog',
    siteName: 'AqariMap',
    locale: 'ar_SY',
    type: 'website',
    // image: 'https://yourdomain.com/og-image-blog.jpg', // لو عندك صورة og
  },
};

export default function BlogPage() {
  return <BlogClientWrapper />;
}

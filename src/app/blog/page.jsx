export const dynamic = 'force-dynamic';

import BlogClientWrapper from './BlogClientWrapper';

export async function generateMetadata({ params }) {
  const slug = params.slug;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/blog/${slug}/meta`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch meta');

    const blog = await res.json();

    return {
      title: blog.metaTitle?.ar || blog.title?.ar || 'مدونة عقاري ماب',
      description: blog.metaDescription?.ar || blog.description?.ar?.slice(0, 160),
      openGraph: {
        title: blog.metaTitle?.ar || blog.title?.ar,
        description: blog.metaDescription?.ar || blog.description?.ar?.slice(0, 160),
        url: `https://yourdomain.com/blog/${slug}`,
        type: 'article',
      },
    };
  } catch (err) {
    return {
      title: 'مدونة عقاري ماب',
      description: 'تابع آخر أخبار ونصائح سوق العقارات في سوريا عبر مدونة عقاري ماب.',
    };
  }
}

export default async function BlogPage({ params }) {
  return <BlogClientWrapper slug={params.slug} />;
}

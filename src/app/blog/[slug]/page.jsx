export const dynamic = 'force-dynamic'; // ✅ يحل مشكلة await مع params

import SingleBlogClientWrapper from './SingleBlogClientWrapper';

export async function generateMetadata({ params }) {
  const slug = params.slug;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/${slug}/meta`, {
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

export default async function BlogPageWrapper({ params }) {
  return <SingleBlogClientWrapper slug={params.slug} />;
}

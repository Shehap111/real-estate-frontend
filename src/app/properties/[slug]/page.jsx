export const dynamic = 'force-dynamic';

import SinglePropertyClientWrapper from './SinglePropertyClientWrapper';

export async function generateMetadata({ params }) {
  const slug = params.slug;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/properties/${slug}/meta`, {
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch meta');

    const property = await res.json();

    return {
      title: property.title?.ar || 'تفاصيل العقار',
      description: property.description?.ar?.slice(0, 160) || 'تفاصيل العقار المعروضة في منصة عقاري ماب.',
      openGraph: {
        title: property.title?.ar,
        description: property.description?.ar?.slice(0, 160),
        url: `https://yourdomain.com/property/${slug}`,
        type: 'article',
      },
    };
  } catch (err) {
    return {
      title: 'تفاصيل العقار',
      description: 'تعرف على تفاصيل العقار المتاحة في منصة عقاري ماب.',
    };
  }
}

export default async function PropertyPage({ params }) {
  return <SinglePropertyClientWrapper slug={params.slug} />;
}

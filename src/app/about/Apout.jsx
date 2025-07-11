'use client'
import React from 'react';
import Head from 'next/head'; // ✅ لازم تستورده
import IntroSections from '../../components/IntroSections';
import './about.css';
import S1_about from './S1_about';
import S2_about from './S2_about';
import S3_about from './S3_about';
import S3_home from '../home/Section_3';

const Apout = () => {
  return (
    <>
      {/* ✅ SEO Head Tags */}
      <Head>
        <title>عن الشركة | اسم الموقع</title>
        <meta name="description" content="تعرف على رؤيتنا ورسالتنا والخدمات التي نقدمها في سوق العقارات." />
        <meta name="keywords" content="عن الشركة, عقارات, معلومات عنا, خدماتنا" />

        {/* OG Tags for social media */}
        <meta property="og:title" content="عن الشركة" />
        <meta property="og:description" content="تعرف على رؤيتنا ورسالتنا والخدمات التي نقدمها في سوق العقارات." />
        <meta property="og:url" content="https://yourdomain.com/about" />
        <meta property="og:type" content="website" />
        {/* <meta property="og:image" content="https://yourdomain.com/images/about-og.jpg" /> */}

        {/* hreflang لو عندك نسخ بلغات تانية */}
        <link rel="alternate" hrefLang="ar" href="https://yourdomain.com/ar/about" />
        <link rel="alternate" hrefLang="en" href="https://yourdomain.com/en/about" />
      </Head>

      {/* Page content */}
      <IntroSections sectionName="About Us" Link="About Us" path="about" />
      <S1_about />
      <S3_home />
      <S2_about />
      <S3_about />
    </>
  );
};

export default Apout;

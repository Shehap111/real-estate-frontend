/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:3000';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: true,

  // ⛔ منع محركات البحث من صفحات معينة
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/*',
          '/dashboard',
          '/dashboard/*',
        ],
      },
    ],
  },
};

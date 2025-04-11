/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://firstcurve.in',
    generateRobotsTxt: true, // automatically generates robots.txt
    sitemapSize: 7000,
    changefreq: 'weekly',
    priority: 0.7,
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' },
      ],
    },
  };
  
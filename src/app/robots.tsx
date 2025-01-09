import { MetadataRoute } from 'next';

import { sitemapModule } from '@/server/sitemap';
import { getCanonicalUrl } from '@/server/utils/url';

const robots = (): MetadataRoute.Robots => {
  return {
    host: getCanonicalUrl(),
    rules: [
      // Allow Facebot to crawl certain parts of the site
      {
        allow: ['/discover/*'],
        disallow: ['/discover/search/*'],
        userAgent: ['Facebot', 'facebookexternalhit'],
      },
      // Allow LinkedInBot to crawl certain parts of the site
      {
        allow: ['/discover/*'],
        disallow: ['/discover/search/*'],
        userAgent: 'LinkedInBot',
      },
      // Allow Twitterbot to crawl certain parts of the site
      {
        allow: ['/discover/*'],
        disallow: ['/discover/search/*'],
        userAgent: 'Twitterbot',
      },
      // Allow Googlebot to crawl everything
      {
        allow: ['/'],
        disallow: ['/api/*', '/login', '/signup', '/files', '/repos/*', '/discover/search/*'],
        userAgent: 'Googlebot',
      },
      // Allow Bingbot to crawl everything
      {
        allow: ['/'],
        disallow: ['/api/*', '/login', '/signup', '/files', '/repos/*', '/discover/search/*'],
        userAgent: 'Bingbot',
      },
      // Default rule for all user agents (* means all bots)
      {
        allow: ['/'],
        disallow: ['/api/*', '/login', '/signup', '/files', '/repos/*', '/discover/search/*'],
        userAgent: '*',
      },
    ],
    sitemap: sitemapModule.getRobots(),
  };
};

export default robots;

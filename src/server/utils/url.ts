import urlJoin from 'url-join';

const isVercelPreview = process.env.VERCEL === '1' && process.env.VERCEL_ENV !== 'production';

const vercelPreviewUrl = `https://${process.env.VERCEL_URL}`;

// Update the site URL to use www.hounddeepmind.com
const siteUrl = isVercelPreview ? vercelPreviewUrl : 'https://www.hounddeepmind.com';

export const getCanonicalUrl = (...paths: string[]) => urlJoin(siteUrl, ...paths);

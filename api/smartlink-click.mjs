const allowedItems = new Set([
  'platform-spotify',
  'platform-apple-music',
  'platform-youtube',
  'platform-audiomack',
  'track-uykxuPFAyHA',
  'track-njiXB1XBPBc',
  'track-N81xVNV19sU',
  'track-1XYWZsVnRuU',
  'track-Rvh5rCWFy7Y',
  'track-s3-dhrV-S8E',
  'track-sor-maL6BL4',
  'track-KuxufouoNNA',
]);

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).end();
  }

  if (request.headers.origin !== 'https://jcarr009.com') {
    return response.status(403).end();
  }

  const item = typeof request.body === 'string'
    ? new URLSearchParams(request.body).get('item')
    : request.body?.item;

  if (!allowedItems.has(item)) {
    return response.status(400).end();
  }

  console.log('jcarr_smartlink_click', 'made-in-babel', item);
  return response.status(204).end();
}

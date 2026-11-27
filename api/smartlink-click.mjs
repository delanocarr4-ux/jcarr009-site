const platforms = [
  'platform-spotify',
  'platform-apple-music',
  'platform-youtube',
  'platform-audiomack',
];

const allowedItems = new Map([
  ['todo-es-alegria', new Set(['platform-apple-music', 'platform-youtube', 'platform-deezer'])],
  ['tu-luz-inmensa', new Set(platforms)],
  ['made-in-babel', new Set([
    ...platforms,
    'track-uykxuPFAyHA',
    'track-njiXB1XBPBc',
    'track-N81xVNV19sU',
    'track-1XYWZsVnRuU',
    'track-Rvh5rCWFy7Y',
    'track-s3-dhrV-S8E',
    'track-sor-maL6BL4',
    'track-KuxufouoNNA',
  ])],
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

  const body = typeof request.body === 'string'
    ? Object.fromEntries(new URLSearchParams(request.body))
    : request.body ?? {};
  const { release = 'made-in-babel', item } = body;

  if (!allowedItems.get(release)?.has(item)) {
    return response.status(400).end();
  }

  console.log('jcarr_smartlink_click', release, item);
  return response.status(204).end();
}

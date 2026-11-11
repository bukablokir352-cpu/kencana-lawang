// One-off: seed the cloud album with the user's entered photos from data/photos.json
const fs = require('fs');
require('fs').readFileSync;

const envText = fs.readFileSync(__dirname + '/../.env', 'utf8');
const env = Object.fromEntries(
  envText.split('\n').filter((l) => l.includes('=')).map((l) => {
    const i = l.indexOf('=');
    return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, '')];
  })
);

const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;
if (!url || !key) { console.error('Missing env'); process.exit(1); }

const photos = JSON.parse(fs.readFileSync('data/photos.json', 'utf8'));
if (!Array.isArray(photos) || photos.length === 0) { console.error('No photos'); process.exit(1); }

const rows = photos.map((p, index) => ({
  photo_id: String(p.id),
  title: p.title,
  category: p.category,
  url: p.url,
  desc: p.desc || '',
  date: p.date ?? null,
  location: p.location ?? null,
  photographer: p.photographer ?? null,
  sort_order: index,
}));

(async () => {
  // Upsert all rows in one request
  let res = await fetch(url + '/rest/v1/kencana_photo_album?on_conflict=photo_id', {
    method: 'POST',
    headers: {
      apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(rows),
  });
  console.log('UPSERT status:', res.status);
  if (res.status >= 400) { console.log(await res.text()); process.exit(1); }

  // Delete rows not part of the user's album (none expected, keeps idempotent)
  const keepIds = rows.map((r) => r.photo_id);
  res = await fetch(url + '/rest/v1/kencana_photo_album?photo_id=not.in.(' + keepIds.map((i) => '"' + i + '"').join(',') + ')', {
    method: 'DELETE',
    headers: { apikey: key, Authorization: 'Bearer ' + key, Prefer: 'return=representation', 'Content-Type': 'application/json' },
  });
  console.log('CLEANUP status:', res.status);

  // Verify final count
  res = await fetch(url + '/rest/v1/kencana_photo_album?select=photo_id&order=sort_order.asc', {
    headers: { apikey: key, Authorization: 'Bearer ' + key },
  });
  const final = await res.json();
  console.log('FINAL count:', final.length);
})();

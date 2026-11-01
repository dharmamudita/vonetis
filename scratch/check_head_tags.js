async function check() {
  const res = await fetch('http://localhost:3000');
  const html = await res.text();
  const matches = html.match(/<link[^>]+>/g) || [];
  const iconLinks = matches.filter(l => l.includes('icon') || l.includes('apple') || l.includes('manifest'));
  console.log('Icon & Manifest links found in head:');
  iconLinks.forEach(l => console.log(' ', l));

  const metaMatches = html.match(/<meta[^>]+>/g) || [];
  const ogMatches = metaMatches.filter(m => m.includes('og:') || m.includes('twitter'));
  console.log('OG & Twitter meta:');
  ogMatches.forEach(m => console.log(' ', m));
}
check().catch(console.error);


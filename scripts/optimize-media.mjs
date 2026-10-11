// Run by hand (not part of the build) whenever source media changes:
//   node scripts/optimize-media.mjs            -> videos + images
//   node scripts/optimize-media.mjs videos     -> videos only
//   node scripts/optimize-media.mjs images     -> images only
// Needs ffmpeg on PATH. Source files live in media-src/ (git-ignored is fine);
// optimised output is written to public/ and committed.
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const src = (...p) => path.join(root, 'media-src', ...p);
const out = (...p) => path.join(root, 'public', ...p);
const only = process.argv[2];

// cropTop removes the recorder's browser tab strip, address bar and bookmarks, and cropBottom the
// Windows taskbar; the original recordings exposed personal tabs, bookmarks and desktop.
const videos = [
  { file: 'QuickLending.mp4', slug: 'quicklending', cropTop: 142, start: 0, length: 24 },
  { file: 'Glozic.mp4', slug: 'glozic', cropTop: 152, start: 0, length: 24 },
  { file: 'graphCommunity.mp4', slug: 'graph-community', cropTop: 142, start: 0, length: 14 },
  { file: 'e-commerce.mp4', slug: 'e-commerce', cropTop: 100, cropBottom: 48, start: 0, length: 30 },
  { file: 'chat-3.mp4', slug: 'chat-app', cropTop: 120, start: 0, length: 30 },
  { file: 'movie_ticket_booking.mp4', slug: 'movie-booking', cropTop: 100, cropBottom: 48, start: 0, length: 30 },
  { file: 'finance_website.mp4', slug: 'muthoot-clone', cropTop: 104, cropBottom: 48, start: 0, length: 30 },
];

function ffmpeg(args) {
  execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' });
}

function encodeVideos() {
  mkdirSync(out('media', 'projects'), { recursive: true });
  for (const v of videos) {
    const input = src('videos', v.file);
    if (!existsSync(input)) {
      console.warn(`skip ${v.file}: not found`);
      continue;
    }
    // 1280 wide, 16:10-ish crop below the browser chrome, even dimensions for H.264.
    const vf = `crop=iw:ih-${v.cropTop + (v.cropBottom ?? 0)}:0:${v.cropTop},scale=1280:-2,fps=30`;
    ffmpeg([
      '-ss', String(v.start), '-t', String(v.length), '-i', input,
      '-vf', vf, '-an',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      out('media', 'projects', `${v.slug}.mp4`),
    ]);
    ffmpeg([
      '-ss', '1', '-i', out('media', 'projects', `${v.slug}.mp4`),
      '-frames:v', '1', '-vf', 'scale=960:-2', '-c:v', 'libwebp', '-quality', '72',
      out('media', 'projects', `${v.slug}.webp`),
    ]);
    console.log(`video ${v.slug} done`);
  }
}

async function optimiseImages() {
  const { default: sharp } = await import('sharp');
  mkdirSync(out('media', 'logos'), { recursive: true });
  mkdirSync(out('media', 'about'), { recursive: true });

  await sharp(src('images', 'me2.webp'))
    .resize({ width: 640, height: 800, fit: 'cover', position: 'top' })
    .webp({ quality: 78 })
    .toFile(out('media', 'about', 'raj.webp'));

  const logos = [
    ['vnagu.png', 'vnsgu'],
    ['constantsys_logo.jpeg', 'constantsys'],
    ['zluck.png', 'zluck'],
  ];
  for (const [file, name] of logos) {
    await sharp(src('images', file))
      .resize({ width: 128, height: 128, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .webp({ quality: 85 })
      .toFile(out('media', 'logos', `${name}.webp`));
  }

  // Favicons from the RJ mark in public/favicon.png.
  const mark = out('favicon.png');
  await sharp(mark).resize(32, 32).png({ palette: true }).toFile(out('icon-32.png'));
  await sharp(mark).resize(192, 192).png({ palette: true }).toFile(out('icon-192.png'));
  await sharp(mark).resize(512, 512, { fit: 'contain', background: '#ffffff' }).png({ palette: true }).toFile(out('icon-512.png'));
  await sharp(mark).resize(180, 180, { fit: 'contain', background: '#ffffff' }).png({ palette: true }).toFile(out('apple-icon.png'));
  await renderOgImage(sharp);
  console.log('images done');
}

// 1200x630 social preview card in the site's dark "blueprint" style.
async function renderOgImage(sharp) {
  const grid = Array.from({ length: 40 }, (_, i) => i * 32);
  const lines = grid
    .map((p) => `<line x1="${p}" y1="0" x2="${p}" y2="630"/><line x1="0" y1="${p}" x2="1200" y2="${p}"/>`)
    .join('');
  const chip = (x, label, color) =>
    `<g transform="translate(${x} 470)"><rect width="${label.length * 15 + 40}" height="52" rx="12" fill="#111827" stroke="${color}" stroke-width="2"/><text x="20" y="34" font-family="Consolas, monospace" font-size="24" fill="${color}">${label}</text></g>`;
  let x = 80;
  const chips = [
    ['Next.js', '#22d3ee'],
    ['TypeScript', '#22d3ee'],
    ['Fastify', '#fbbf24'],
    ['Sequelize', '#818cf8'],
    ['PostgreSQL', '#818cf8'],
  ]
    .map(([label, color]) => {
      const svg = chip(x, label, color);
      x += label.length * 15 + 56;
      return svg;
    })
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><radialGradient id="g" cx="0.8" cy="0.2" r="0.8"><stop offset="0" stop-color="#38b2ff" stop-opacity="0.25"/><stop offset="1" stop-color="#0b1120" stop-opacity="0"/></radialGradient></defs>
  <rect width="1200" height="630" fill="#0b1120"/>
  <g stroke="#94a3b8" stroke-opacity="0.08">${lines}</g>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="80" y="120" font-family="Consolas, monospace" font-size="26" fill="#38b2ff" letter-spacing="3">RJ INDUSTRIES · SURAT, INDIA</text>
  <text x="80" y="235" font-family="Segoe UI, Arial, sans-serif" font-weight="800" font-size="92" fill="#e2e8f0">Raj Maisuriya</text>
  <text x="80" y="320" font-family="Segoe UI, Arial, sans-serif" font-weight="600" font-size="48" fill="#94a3b8">Full-stack developer, building OrbitOps</text>
  <text x="80" y="405" font-family="Consolas, monospace" font-size="28" fill="#e2e8f0"><tspan fill="#22d3ee">~/rj $</tspan> ships the whole stack_</text>
  ${chips}
</svg>`;
  await sharp(Buffer.from(svg)).png({ palette: true }).toFile(out('og.png'));
}

if (only !== 'images') encodeVideos();
if (only !== 'videos') await optimiseImages();

// Browsers request /favicon.ico on their own, so ship one alongside the PNG icons.
if (only !== 'videos') ffmpeg(['-i', out('icon-32.png'), out('favicon.ico')]);

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

// cropTop removes the recorder's browser tab strip, address bar and bookmarks,
// which exposed personal tabs and bookmarks in the original recordings.
const videos = [
  { file: 'QuickLending.mp4', slug: 'quicklending', cropTop: 142, start: 0, length: 24 },
  { file: 'Glozic.mp4', slug: 'glozic', cropTop: 152, start: 0, length: 24 },
  { file: 'graphCommunity.mp4', slug: 'graph-community', cropTop: 142, start: 0, length: 14 },
  { file: 'e-commerce.mp4', slug: 'e-commerce', cropTop: 100, start: 0, length: 30 },
  { file: 'chat-3.mp4', slug: 'chat-app', cropTop: 120, start: 0, length: 30 },
  { file: 'movie_ticket_booking.mp4', slug: 'movie-booking', cropTop: 100, start: 0, length: 30 },
  { file: 'finance_website.mp4', slug: 'muthoot-clone', cropTop: 104, start: 0, length: 30 },
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
    const vf = `crop=iw:ih-${v.cropTop}:0:${v.cropTop},scale=1280:-2,fps=30`;
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
  console.log('images done');
}

if (only !== 'images') encodeVideos();
if (only !== 'videos') await optimiseImages();

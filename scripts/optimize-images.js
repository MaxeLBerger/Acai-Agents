import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const ASSETS_DIR = 'assets';
const QUALITY_WEBP = 80;
const QUALITY_WEBP_LOW = 70;

// Max dimensions for different image categories
const SIZE_LIMITS = {
  favicon: { width: 64, height: 64 },
  logo: { width: 400, height: 400 },
  portfolio: { width: 1200, height: 800 },
  stack: { width: 600, height: 600 },
  default: { width: 1200, height: 1200 },
};

function categorize(filename) {
  if (filename.includes('favicon')) return 'favicon';
  if (filename.includes('logo') || filename.includes('emblem')) return 'logo';
  if (
    filename.includes('imkerei') ||
    filename.includes('feuerstein') ||
    filename.includes('firecastle') ||
    filename.includes('soundoflvke') ||
    filename.includes('testomax') ||
    filename.includes('maximilianhaak')
  )
    return 'portfolio';
  return 'default';
}

async function getImages(dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await getImages(fullPath)));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

async function optimizeImage(inputPath) {
  const name = basename(inputPath);
  const category = categorize(name);
  const limits = SIZE_LIMITS[category];
  const outputWebp = inputPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const fileStat = await stat(inputPath);
  const sizeKB = Math.round(fileStat.size / 1024);

  try {
    const metadata = await sharp(inputPath).metadata();
    const needsResize = metadata.width > limits.width || metadata.height > limits.height;
    const quality = sizeKB > 1500 ? QUALITY_WEBP_LOW : QUALITY_WEBP;

    let pipeline = sharp(inputPath);

    if (needsResize) {
      pipeline = pipeline.resize(limits.width, limits.height, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    // Generate WebP
    await pipeline.webp({ quality, effort: 6 }).toFile(outputWebp);

    // Also optimize the original PNG/JPG in-place (resize if needed)
    if (needsResize) {
      const ext = extname(inputPath).toLowerCase();
      if (ext === '.png') {
        await sharp(inputPath)
          .resize(limits.width, limits.height, { fit: 'inside', withoutEnlargement: true })
          .png({ quality: 85, compressionLevel: 9 })
          .toFile(inputPath + '.tmp');
      } else {
        await sharp(inputPath)
          .resize(limits.width, limits.height, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 85 })
          .toFile(inputPath + '.tmp');
      }
      // Replace original with optimized
      const { rename: fsRename } = await import('fs/promises');
      await fsRename(inputPath + '.tmp', inputPath);
    }

    const webpStat = await stat(outputWebp);
    const webpKB = Math.round(webpStat.size / 1024);
    const savings = Math.round((1 - webpKB / sizeKB) * 100);

    console.log(
      `✅ ${name}: ${sizeKB}KB → ${webpKB}KB WebP (${savings}% smaller)${needsResize ? ' [resized]' : ''}`
    );
  } catch (err) {
    console.error(`❌ ${name}: ${err.message}`);
  }
}

// Also create a proper small favicon
async function createFavicon() {
  const faviconSrc = join(ASSETS_DIR, 'favicon.png');
  try {
    // Create 32x32 favicon
    await sharp(faviconSrc)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(join(ASSETS_DIR, 'favicon-32.png'));

    // Create 180x180 apple touch icon
    await sharp(faviconSrc)
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(join(ASSETS_DIR, 'apple-touch-icon.png'));

    const origStat = await stat(faviconSrc);
    const newStat = await stat(join(ASSETS_DIR, 'favicon-32.png'));
    console.log(
      `\n🎯 Favicon: ${Math.round(origStat.size / 1024)}KB → ${Math.round(newStat.size / 1024)}KB (32x32)`
    );
  } catch (err) {
    console.error(`❌ Favicon: ${err.message}`);
  }
}

async function main() {
  console.log('🔧 Optimizing images...\n');
  const images = await getImages(ASSETS_DIR);
  console.log(`Found ${images.length} images to optimize\n`);

  for (const img of images) {
    await optimizeImage(img);
  }

  await createFavicon();

  console.log('\n✨ Done! WebP versions created alongside originals.');
  console.log('Update HTML to use .webp sources for maximum performance.');
}

main();

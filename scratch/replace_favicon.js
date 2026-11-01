const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function createIco(pngBuffers, sizes) {
  const numImages = pngBuffers.length;
  const headerSize = 6 + 16 * numImages;

  let currentOffset = headerSize;
  const dirEntries = [];

  for (let i = 0; i < numImages; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // size
    entry.writeUInt32LE(currentOffset, 12); // offset
    dirEntries.push(entry);
    currentOffset += buf.length;
  }

  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // type 1 = ICO
  icoHeader.writeUInt16LE(numImages, 4); // count

  return Buffer.concat([icoHeader, ...dirEntries, ...pngBuffers]);
}

async function run() {
  const brandingDir = path.join(__dirname, '..', 'public', 'branding');
  const iconSvg = fs.readFileSync(path.join(brandingDir, 'vonetis_triple_crown_icon.svg'));

  const sizes = [16, 32, 48];
  const pngBuffers = [];

  for (const s of sizes) {
    const b = await sharp(iconSvg)
      .resize(s, s)
      .png()
      .toBuffer();
    pngBuffers.push(b);
  }

  const icoBuffer = createIco(pngBuffers, sizes);

  // Write to src/app/favicon.ico, public/favicon.ico
  const srcAppFavicon = path.join(__dirname, '..', 'src', 'app', 'favicon.ico');
  const publicFavicon = path.join(__dirname, '..', 'public', 'favicon.ico');

  fs.writeFileSync(srcAppFavicon, icoBuffer);
  fs.writeFileSync(publicFavicon, icoBuffer);

  // Also create src/app/icon.png (32x32) as another official Next.js App Router icon
  const icon32Png = await sharp(iconSvg).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'app', 'icon.png'), icon32Png);

  console.log("Successfully wrote proper multi-resolution ICO to:");
  console.log(" - src/app/favicon.ico (" + icoBuffer.length + " bytes)");
  console.log(" - public/favicon.ico (" + icoBuffer.length + " bytes)");
  console.log(" - src/app/icon.png");
}

run().catch(console.error);

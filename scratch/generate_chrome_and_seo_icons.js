const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const brandingDir = path.join(__dirname, '..', 'public', 'branding');
const iconSvgPath = path.join(brandingDir, 'vonetis_triple_crown_icon.svg');

const iconSvg = fs.readFileSync(iconSvgPath);

async function generateAllChromeAndSEOIcons() {
  console.log("Generating Chrome, Apple, Google Search, and PWA icon suite...");

  // 1. Google Search & Chrome Favicon sizes
  const sizes = [
    { size: 48, name: 'icon-48.png' },
    { size: 96, name: 'icon-96.png' },
    { size: 144, name: 'icon-144.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'icon-192.png' },
    { size: 512, name: 'icon-512.png' },
  ];

  for (const { size, name } of sizes) {
    await sharp(iconSvg)
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, name));
    console.log(`Created public/${name} (${size}x${size})`);
  }

  // 2. High-quality 1200x630 OpenGraph / Social Media / WhatsApp Share Preview Banner
  const ogSvg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg_grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#071e3d"/>
        <stop offset="60%" stop-color="#0a254a"/>
        <stop offset="100%" stop-color="#021226"/>
      </linearGradient>
      
      <linearGradient id="g_navy_ocean" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0284c7"/>
        <stop offset="100%" stop-color="#071e3d"/>
      </linearGradient>
      <linearGradient id="g_ice_bright" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#7dd3fc"/>
        <stop offset="50%" stop-color="#38bdf8"/>
        <stop offset="100%" stop-color="#0284c7"/>
      </linearGradient>
      <linearGradient id="g_center_l" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8"/>
        <stop offset="100%" stop-color="#0369a1"/>
      </linearGradient>
      <linearGradient id="g_center_r" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#bae6fd"/>
        <stop offset="100%" stop-color="#0284c7"/>
      </linearGradient>
      
      <filter id="shadow_clean" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#0284c7" flood-opacity="0.35"/>
      </filter>
      <filter id="spark_glow" x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="0" dy="0" stdDeviation="16" flood-color="#38bdf8" flood-opacity="0.8"/>
      </filter>
      
      <!-- Subtle radial ambient glow -->
      <radialGradient id="glow_back" cx="30%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#0284c7" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
      </radialGradient>
    </defs>
    
    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bg_grad)"/>
    <circle cx="360" cy="315" r="380" fill="url(#glow_back)"/>
    
    <!-- Subtle Grid / Tech Accent -->
    <path d="M0 580 L1200 580" stroke="rgba(56, 189, 248, 0.15)" stroke-width="1"/>
    <path d="M0 600 L1200 600" stroke="rgba(56, 189, 248, 0.08)" stroke-width="1"/>
    
    <!-- Left: Triple Crown Crest Emblem -->
    <g transform="translate(340, 315) scale(0.68)" filter="url(#shadow_clean)">
      <path d="M-270 -270 L-100 -130 L-20 120 L0 290 L0 300 L-40 160 L-180 -30 L-110 -70 L-270 -270 Z" fill="url(#g_navy_ocean)"/>
      <circle cx="-270" cy="-270" r="14" fill="#0284c7"/>
      <path d="M270 -270 L100 -130 L20 120 L0 290 L0 300 L40 160 L180 -30 L110 -70 L270 -270 Z" fill="url(#g_ice_bright)"/>
      <circle cx="270" cy="-270" r="14" fill="#38bdf8"/>
      <path d="M-5 -310 L-85 -70 L-5 120 Z" fill="url(#g_center_l)"/>
      <path d="M5 -310 L85 -70 L5 120 Z" fill="url(#g_center_r)"/>
      <circle cx="0" cy="-310" r="16" fill="#7dd3fc" filter="url(#spark_glow)"/>
      <path d="M-5 -310 L-5 120 L-45 -70 Z" fill="#071e3d" opacity="0.25"/>
      <path d="M5 -310 L5 120 L45 -70 Z" fill="#ffffff" opacity="0.35"/>
    </g>

    <!-- Divider -->
    <line x1="560" y1="170" x2="560" y2="460" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>

    <!-- Right: Typography & Tagline -->
    <g transform="translate(610, 315)" text-anchor="start">
      <!-- Badge -->
      <g transform="translate(0, -115)">
        <rect width="180" height="34" rx="17" fill="rgba(56, 189, 248, 0.15)" stroke="rgba(56, 189, 248, 0.4)"/>
        <text x="90" y="22" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="13" letter-spacing="2" fill="#7dd3fc" text-anchor="middle">
          OFFICIAL BRAND
        </text>
      </g>
      
      <!-- Brand Name -->
      <text y="-25" font-family="'Outfit', 'Inter', sans-serif" font-weight="900" font-size="82" letter-spacing="4" fill="#ffffff">
        VONE<tspan fill="#38bdf8">TIS</tspan>
      </text>
      
      <!-- Subtitle -->
      <text y="24" font-family="'Space Grotesk', 'Inter', sans-serif" font-weight="700" font-size="20" letter-spacing="5" fill="#38bdf8">
        SOLUTIONS &amp; DIGITAL STORE
      </text>
      
      <!-- Description -->
      <text y="62" font-family="'Inter', sans-serif" font-weight="500" font-size="16" letter-spacing="1" fill="#cbd5e1">
        Solusi Lengkap Jasa Akademik &amp; Kreatif Terpercaya #1
      </text>
      
      <!-- Domain / URL Pill -->
      <text y="98" font-family="'Space Grotesk', monospace" font-weight="600" font-size="15" letter-spacing="2" fill="#7dd3fc">
        vonetisofficial.store
      </text>
    </g>
  </svg>
  `;

  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .jpeg({ quality: 95 })
    .toFile(path.join(publicDir, 'og-image.jpg'));
  console.log("Created public/og-image.jpg (1200x630)");

  // 3. Web App Manifest for Chrome PWA & Mobile
  const manifest = {
    name: "VONETIS — Solusi Lengkap Jasa Akademik & Kreatif",
    short_name: "VONETIS",
    description: "Solusi lengkap jasa tugas kuliah, website & aplikasi, skripsi, video editor, dan langganan digital premium.",
    start_url: "/",
    display: "standalone",
    background_color: "#071e3d",
    theme_color: "#071e3d",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };

  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log("Created public/site.webmanifest");
}

generateAllChromeAndSEOIcons().catch(err => {
  console.error(err);
  process.exit(1);
});


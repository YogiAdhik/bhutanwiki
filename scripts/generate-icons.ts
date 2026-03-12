import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const PUBLIC = path.join(process.cwd(), 'public')

// BhutanWiki icon as SVG - maroon background with gold book icon
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="0" fill="#7B1E3A"/>
  <g transform="translate(256,220)" fill="none" stroke="#D4A843" stroke-width="28" stroke-linecap="round" stroke-linejoin="round">
    <path d="M0,-90 C0,-90 -110,-112 -150,-68 L-150,85 C-110,42 0,65 0,65"/>
    <path d="M0,-90 C0,-90 110,-112 150,-68 L150,85 C110,42 0,65 0,65"/>
    <line x1="0" y1="-90" x2="0" y2="65"/>
  </g>
  <text x="256" y="430" text-anchor="middle" font-family="Georgia,serif" font-size="64" font-weight="bold" fill="#FFFBF5" letter-spacing="2">BhutanWiki</text>
</svg>`

// Rounded version for PWA/app icons
const roundedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#7B1E3A"/>
  <g transform="translate(256,220)" fill="none" stroke="#D4A843" stroke-width="28" stroke-linecap="round" stroke-linejoin="round">
    <path d="M0,-90 C0,-90 -110,-112 -150,-68 L-150,85 C-110,42 0,65 0,65"/>
    <path d="M0,-90 C0,-90 110,-112 150,-68 L150,85 C110,42 0,65 0,65"/>
    <line x1="0" y1="-90" x2="0" y2="65"/>
  </g>
  <text x="256" y="430" text-anchor="middle" font-family="Georgia,serif" font-size="64" font-weight="bold" fill="#FFFBF5" letter-spacing="2">BhutanWiki</text>
</svg>`

// Splash screen SVG
const splashSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2732 2732">
  <rect width="2732" height="2732" fill="#7B1E3A"/>
  <g transform="translate(1366,1200)" fill="none" stroke="#D4A843" stroke-width="48" stroke-linecap="round" stroke-linejoin="round">
    <path d="M0,-180 C0,-180 -220,-225 -300,-136 L-300,170 C-220,84 0,130 0,130"/>
    <path d="M0,-180 C0,-180 220,-225 300,-136 L300,170 C220,84 0,130 0,130"/>
    <line x1="0" y1="-180" x2="0" y2="130"/>
  </g>
  <text x="1366" y="1600" text-anchor="middle" font-family="Georgia,serif" font-size="120" font-weight="bold" fill="#FFFBF5" letter-spacing="4">BhutanWiki</text>
  <text x="1366" y="1700" text-anchor="middle" font-family="Georgia,serif" font-size="48" fill="#D4A843">The People's Encyclopedia of Bhutan</text>
</svg>`

interface IconSpec {
  name: string
  size: number
  svg: string
}

const icons: IconSpec[] = [
  // PWA icons
  { name: 'icon-192.png', size: 192, svg: roundedSvg },
  { name: 'icon-512.png', size: 512, svg: roundedSvg },
  // Favicon
  { name: 'favicon-32.png', size: 32, svg: roundedSvg },
  { name: 'favicon-16.png', size: 16, svg: roundedSvg },
  // Apple touch icon
  { name: 'apple-touch-icon.png', size: 180, svg: iconSvg },
]

// Android adaptive icon sizes
const androidSizes = [
  { folder: 'mipmap-mdpi', size: 48 },
  { folder: 'mipmap-hdpi', size: 72 },
  { folder: 'mipmap-xhdpi', size: 96 },
  { folder: 'mipmap-xxhdpi', size: 144 },
  { folder: 'mipmap-xxxhdpi', size: 192 },
]

async function main() {
  console.log('Generating icons...')

  // Generate PWA & web icons
  for (const icon of icons) {
    const buf = Buffer.from(icon.svg)
    await sharp(buf).resize(icon.size, icon.size).png().toFile(path.join(PUBLIC, icon.name))
    console.log(`  ✓ ${icon.name} (${icon.size}x${icon.size})`)
  }

  // Generate Android icons
  const androidResDir = path.join(process.cwd(), 'android', 'app', 'src', 'main', 'res')
  if (fs.existsSync(androidResDir)) {
    for (const { folder, size } of androidSizes) {
      const dir = path.join(androidResDir, folder)
      fs.mkdirSync(dir, { recursive: true })
      const buf = Buffer.from(iconSvg)
      await sharp(buf).resize(size, size).png().toFile(path.join(dir, 'ic_launcher.png'))
      // Rounded version
      const roundedBuf = Buffer.from(roundedSvg)
      await sharp(roundedBuf).resize(size, size).png().toFile(path.join(dir, 'ic_launcher_round.png'))
      console.log(`  ✓ android/${folder}/ic_launcher.png (${size}x${size})`)
    }
  }

  // Generate iOS icons
  const iosAssets = path.join(process.cwd(), 'ios', 'App', 'App', 'Assets.xcassets', 'AppIcon.appiconset')
  if (fs.existsSync(iosAssets)) {
    const iosSizes = [20, 29, 40, 58, 60, 76, 80, 87, 120, 152, 167, 180, 1024]
    for (const size of iosSizes) {
      const buf = Buffer.from(iconSvg)
      await sharp(buf).resize(size, size).png().toFile(path.join(iosAssets, `icon-${size}.png`))
      console.log(`  ✓ ios icon-${size}.png`)
    }

    // Write Contents.json for iOS
    const contents = {
      images: [
        { size: '20x20', idiom: 'iphone', scale: '2x', filename: 'icon-40.png' },
        { size: '20x20', idiom: 'iphone', scale: '3x', filename: 'icon-60.png' },
        { size: '29x29', idiom: 'iphone', scale: '2x', filename: 'icon-58.png' },
        { size: '29x29', idiom: 'iphone', scale: '3x', filename: 'icon-87.png' },
        { size: '40x40', idiom: 'iphone', scale: '2x', filename: 'icon-80.png' },
        { size: '40x40', idiom: 'iphone', scale: '3x', filename: 'icon-120.png' },
        { size: '60x60', idiom: 'iphone', scale: '2x', filename: 'icon-120.png' },
        { size: '60x60', idiom: 'iphone', scale: '3x', filename: 'icon-180.png' },
        { size: '20x20', idiom: 'ipad', scale: '1x', filename: 'icon-20.png' },
        { size: '20x20', idiom: 'ipad', scale: '2x', filename: 'icon-40.png' },
        { size: '29x29', idiom: 'ipad', scale: '1x', filename: 'icon-29.png' },
        { size: '29x29', idiom: 'ipad', scale: '2x', filename: 'icon-58.png' },
        { size: '40x40', idiom: 'ipad', scale: '1x', filename: 'icon-40.png' },
        { size: '40x40', idiom: 'ipad', scale: '2x', filename: 'icon-80.png' },
        { size: '76x76', idiom: 'ipad', scale: '1x', filename: 'icon-76.png' },
        { size: '76x76', idiom: 'ipad', scale: '2x', filename: 'icon-152.png' },
        { size: '83.5x83.5', idiom: 'ipad', scale: '2x', filename: 'icon-167.png' },
        { size: '1024x1024', idiom: 'ios-marketing', scale: '1x', filename: 'icon-1024.png' },
      ],
      info: { version: 1, author: 'BhutanWiki' },
    }
    fs.writeFileSync(path.join(iosAssets, 'Contents.json'), JSON.stringify(contents, null, 2))
    console.log('  ✓ ios Contents.json')
  }

  // Generate splash screen
  const splashBuf = Buffer.from(splashSvg)
  await sharp(splashBuf).resize(2732, 2732).png().toFile(path.join(PUBLIC, 'splash.png'))
  console.log('  ✓ splash.png (2732x2732)')

  console.log('\nDone!')
}

main().catch(console.error)

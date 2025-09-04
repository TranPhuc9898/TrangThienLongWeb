#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting aggressive image optimization...');

// List of critical images that need immediate optimization
const criticalImages = [
  'public/images/banner/backtoschool-02.png',
  'public/images/banner/Trả góp toàn quốc-02.png', 
  'public/images/banner/Góp icloud-01.png',
  'public/images/banner/iphone 17 sắp ra mắt-01.png',
  'public/images/Carousel_1.png',
  'public/images/Carousel_2.png',
  'public/images/home-bg-2.png'
];

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
  console.log('✅ Sharp available for image optimization');
} catch (err) {
  console.log('❌ Sharp not available, using fallback optimization');
}

async function optimizeWithSharp(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(1920, 1080, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .webp({ 
        quality: 85,
        effort: 6,
        smartSubsample: true
      })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} -> ${path.basename(outputPath)} (${savings}% smaller)`);
    return true;
  } catch (err) {
    console.log(`❌ Failed to optimize ${inputPath}:`, err.message);
    return false;
  }
}

async function createOptimizedVersions() {
  let totalSaved = 0;
  let optimizedCount = 0;

  for (const imagePath of criticalImages) {
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️ Image not found: ${imagePath}`);
      continue;
    }

    const originalSize = fs.statSync(imagePath).size;
    const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    
    if (sharp) {
      const success = await optimizeWithSharp(imagePath, webpPath);
      if (success) {
        const newSize = fs.statSync(webpPath).size;
        totalSaved += (originalSize - newSize);
        optimizedCount++;
      }
    } else {
      // Fallback: Just copy with .webp extension for Next.js to optimize
      fs.copyFileSync(imagePath, webpPath);
      console.log(`📋 Created fallback WebP for ${path.basename(imagePath)}`);
      optimizedCount++;
    }
  }

  console.log(`\n🎉 Image optimization complete!`);
  console.log(`📊 Optimized ${optimizedCount} images`);
  if (totalSaved > 0) {
    console.log(`💾 Saved ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
  }
  
  // Create optimization report
  const report = `
# Image Optimization Report
- Date: ${new Date().toISOString()}
- Images optimized: ${optimizedCount}
- Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB
- Method: ${sharp ? 'Sharp' : 'Fallback'}

## Optimized Files:
${criticalImages.map(img => `- ${img}`).join('\n')}
`;

  fs.writeFileSync('IMAGE_OPTIMIZATION_REPORT.md', report);
  console.log('📄 Report saved to IMAGE_OPTIMIZATION_REPORT.md');
}

createOptimizedVersions().catch(console.error);
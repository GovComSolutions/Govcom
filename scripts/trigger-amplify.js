#!/usr/bin/env node

/**
 * Script to trigger AWS Amplify build via webhook
 * Usage: node scripts/trigger-amplify.js [branch-name]
 */

import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const AMPLIFY_WEBHOOK_URL = process.env.AMPLIFY_WEBHOOK_URL || '';
const BRANCH_NAME = process.argv[2] || 'main';

if (!AMPLIFY_WEBHOOK_URL) {
  console.error('❌ Error: AMPLIFY_WEBHOOK_URL environment variable not set');
  console.log('💡 Set it with: export AMPLIFY_WEBHOOK_URL="your-webhook-url"');
  console.log('💡 Or create a .env file with the webhook URL');
  process.exit(1);
}

function triggerBuild() {
  return new Promise((resolve, reject) => {
    const url = new URL(AMPLIFY_WEBHOOK_URL);
    const isHttps = url.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const postData = JSON.stringify({
      branch: BRANCH_NAME,
      timestamp: new Date().toISOString(),
      trigger: 'manual'
    });
    
    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'GovCom-CI-CD/1.0'
      }
    };
    
    const req = client.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('✅ Build triggered successfully!');
          console.log(`🌐 Branch: ${BRANCH_NAME}`);
          console.log(`📊 Status: ${res.statusCode}`);
          console.log(`📝 Response: ${data}`);
          resolve(data);
        } else {
          console.error(`❌ Build trigger failed with status: ${res.statusCode}`);
          console.error(`📝 Response: ${data}`);
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    
    req.on('error', (err) => {
      console.error('❌ Error triggering build:', err.message);
      reject(err);
    });
    
    req.write(postData);
    req.end();
  });
}

async function main() {
  try {
    console.log('🚀 Triggering AWS Amplify build...');
    console.log(`🔗 Webhook: ${AMPLIFY_WEBHOOK_URL}`);
    console.log(`🌿 Branch: ${BRANCH_NAME}`);
    console.log('⏳ Sending request...\n');
    
    await triggerBuild();
    
    console.log('\n🎉 Success! Your website build has been triggered.');
    console.log('📱 Check AWS Amplify console for build progress.');
    console.log('🌐 Your website will update automatically when build completes.');
    
  } catch (error) {
    console.error('\n💥 Failed to trigger build:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${__filename}`) {
  main();
}

export { triggerBuild };

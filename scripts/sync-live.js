const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'src', 'data', 'site-content.json');

async function syncLive() {
  console.log('Fetching latest live content from https://kyorixsport.in/api/content ...');
  try {
    const res = await fetch('https://kyorixsport.in/api/content?t=' + Date.now(), {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    if (json && json.data) {
      fs.writeFileSync(targetPath, JSON.stringify(json.data, null, 2), 'utf-8');
      console.log('✅ SUCCESS: Live content synced to src/data/site-content.json');
      console.log('Source:', json.source || 'live_api');
      console.log('Last Saved:', new Date(json.data._lastSaved || Date.now()).toLocaleString());
    } else {
      console.error('❌ ERROR: Unexpected response format', json);
    }
  } catch (err) {
    console.error('❌ FAILED to sync live content:', err.message);
  }
}

syncLive();

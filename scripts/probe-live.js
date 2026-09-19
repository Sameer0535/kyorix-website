const fs = require('fs');

async function test() {
  const res = await fetch('https://kyorixsport.in/admin?t=' + Date.now());
  const html = await res.text();
  const chunkMatches = html.match(/static\/chunks\/[^"']+/g) || [];
  console.log('Found chunks:', chunkMatches.length);

  for (const chunk of chunkMatches) {
    try {
      const chunkRes = await fetch('https://kyorixsport.in/_next/' + chunk);
      const chunkCode = await chunkRes.text();
      if (chunkCode.includes('App Password') || chunkCode.includes('Direct Gmail')) {
        console.log('FOUND SMTP IN CHUNK:', chunk);
        return;
      }
      if (chunkCode.includes('URGENT FEDERATION')) {
        console.log('FOUND URGENT FEDERATION IN CHUNK:', chunk);
      }
    } catch (e) {}
  }
  console.log('SMTP code was NOT found in tested chunks.');
}

test();

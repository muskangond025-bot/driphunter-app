const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Flipkart might detect bots, use standard user agent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36');
  
  console.log("Navigating to Help Centre...");
  await page.goto('https://www.flipkart.com/helpcentre', { waitUntil: 'networkidle2' });

  // Wait for the topics to render
  console.log("Waiting for topics to load...");
  await page.waitForSelector('.POf2qi div', { timeout: 10000 }).catch(() => console.log("Timeout waiting for topics"));

  const data = {};

  // Find all topic tabs
  const topicElements = await page.$$('.POf2qi > div > div');
  console.log(`Found ${topicElements.length} topic elements`);

  for (let i = 0; i < Math.min(topicElements.length, 6); i++) {
    const el = topicElements[i];
    const topicTitle = await page.evaluate(el => el.innerText, el);
    console.log(`Extracting topic: ${topicTitle}`);
    
    // Click the topic
    await el.click();
    
    // Wait for questions to load
    await new Promise(r => setTimeout(r, 1500));
    
    // Extract questions
    const rightPaneText = await page.evaluate(() => {
        const pane = document.querySelector('.aZISTP');
        if (!pane) return [];
        // The questions are usually inside a div with class like .IHPEN6 or similar anchors
        // Let's just grab all spans/anchors that are reasonably long
        const items = Array.from(pane.querySelectorAll('a, span, div'))
            .map(el => el.innerText.trim())
            .filter(t => t.length > 15 && t.endsWith('?'));
        return Array.from(new Set(items));
    });

    data[topicTitle] = rightPaneText;
  }

  fs.writeFileSync('help_data.json', JSON.stringify(data, null, 2));
  console.log("Done");
  await browser.close();
})();

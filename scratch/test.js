const fs = require('fs');
const content = fs.readFileSync('src/app/terms/page.tsx', 'utf8');
const articleRegex = /<article[\s\S]*?id="([^"]+)"[\s\S]*?<\/article>/g;
const match = articleRegex.exec(content)[0];
console.log(match.substring(0, 1500));

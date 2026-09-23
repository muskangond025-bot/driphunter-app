const fs = require('fs');
const content = fs.readFileSync('src/app/terms/page.tsx', 'utf8');
const matches = content.match(/<section id="[^"]+"/g);
console.log(matches);

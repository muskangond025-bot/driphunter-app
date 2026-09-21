const fs = require('fs');
let c = fs.readFileSync('src/app/profile/page.tsx', 'utf8');
c = c.replace(/onClick=\{\(\) => setActiveTab\('([^']+)'\)\}/g, 'onClick={() => { setActiveTab(\'$1\'); setIsMobileDetailView(true); }}');
fs.writeFileSync('src/app/profile/page.tsx', c);

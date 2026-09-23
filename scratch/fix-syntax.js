const fs = require('fs');
['src/app/privacy/page.tsx', 'src/app/terms/page.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // the string currently in the file is something like:
  // onClick={(e) => { e.stopPropagation(); handleCopyLink("intake")}
  
  // We need to find this pattern and add the missing closing brace and semicolon
  // Let's use a robust replace
  content = content.replace(/onClick=\{\(e\) => \{ e\.stopPropagation\(\); handleCopyLink\(([^)]*)\)\}/g, 'onClick={(e) => { e.stopPropagation(); handleCopyLink($1); }}');
  
  fs.writeFileSync(file, content);
  console.log("Fixed", file);
});

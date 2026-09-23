const fs = require('fs');

const filePath = 'src/app/terms/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add title="Terms & Conditions"
content = content.replace(
  /progressBarGradient="from-\[#6F4E37\] via-\[#E6C280\] to-\[#6F4E37\]"\n\s*>/g,
  'progressBarGradient="from-[#6F4E37] via-[#E6C280] to-[#6F4E37]"\n      title="Terms & Conditions"\n    >'
);

// 2. Add state variable
if (!content.includes('const [openSections')) {
  content = content.replace(
    /const \[activeSection, setActiveSection\] = useState.*?;/,
    `$&
  const [openSections, setOpenSections] = useState<string[]>([]);
  const toggleSection = (id: string) => setOpenSections(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);`
  );
}

// 3. Add ChevronDown to imports
if (!content.includes('ChevronDown')) {
  content = content.replace(/ChevronRight,/, 'ChevronRight, ChevronDown,');
}

// 4. Process each article
const articleRegex = /<article[\s\S]*?id="([^"]+)"[\s\S]*?<\/article>/g;

content = content.replace(articleRegex, (match, id) => {
  if (match.includes('toggleSection')) return match;

  // Find the header div
  const headerDivRegex = /<div className="flex flex-wrap items-center justify-between gap-3">([\s\S]*?)<\/div>\s*<h2([^>]*)>([\s\S]*?)<\/h2>/;
  const headerMatch = match.match(headerDivRegex);
  if (!headerMatch) return match; // fallback
  
  let headerInner = headerMatch[1];
  let h2Props = headerMatch[2];
  let h2Inner = headerMatch[3];

  // Strip the "1. " from h2 content
  h2Inner = h2Inner.replace(/^\s*\d+\.\s+/, '');
  
  // Replace the share button onClick in headerInner
  headerInner = headerInner.replace(
    /onClick=\{\(\) => handleCopyLink\(([^)]*)\)\}/g,
    `onClick={(e) => { e.stopPropagation(); handleCopyLink($1); }}`
  );
  
  const newHeader = `
              <div onClick={() => toggleSection("${id}")} className="cursor-pointer group select-none block w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  ${headerInner}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <h2${h2Props}>${h2Inner}</h2>
                  <ChevronDown className={\`w-6 h-6 text-zinc-400 transition-transform duration-300 shrink-0 \${openSections.includes("${id}") ? "rotate-180" : ""}\`} />
                </div>
              </div>`;

  // Replace everything between <article ...> and </article>
  // Basically replace the original header + h2 with newHeader
  const indexAfterH2 = match.indexOf(headerMatch[0]) + headerMatch[0].length;
  let restOfArticle = match.substring(indexAfterH2, match.length - 10); // exclude </article>

  const newArticleContent = `
${newHeader}
              <div className={\`transition-all duration-500 ease-in-out overflow-hidden mt-4 space-y-5 \${openSections.includes("${id}") ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0 m-0"}\`}>
                ${restOfArticle}
              </div>
            `;

  const articleOpening = match.match(/<article[\s\S]*?>/)[0];
  return `${articleOpening}${newArticleContent}</article>`;
});

fs.writeFileSync(filePath, content);
console.log('Processed terms');

const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Add state variable for open sections
  if (!content.includes('const [openSections')) {
    content = content.replace(
      /const \[activeTab, setActiveTab\] = useState.*?;/,
      `$&
  const [openSections, setOpenSections] = useState<string[]>([]);
  const toggleSection = (id: string) => setOpenSections(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);`
    );
  }

  // 2. Add ChevronDown to imports if not present
  if (!content.includes('ChevronDown')) {
    content = content.replace(/ChevronRight,/, 'ChevronRight, ChevronDown,');
  }

  // 3. Process each section using regex with functions
  // We look for:
  // <section id="XYZ" ...>
  //   <div className="flex flex-wrap ... border-b border-stone-200">
  //     ...
  //   </div>
  //   ... body ...
  // </section>

  // To do this, let's use a replacer function on the whole sections
  const sectionRegex = /<section\s+id="([^"]+)"[\s\S]*?<\/section>/g;
  
  content = content.replace(sectionRegex, (match, id) => {
    // If it's already an accordion, skip
    if (match.includes('toggleSection')) return match;
    
    // Replace the header div
    let replaced = match.replace(
      /<div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200">/,
      `<div onClick={() => toggleSection("${id}")} className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-stone-200 cursor-pointer group">`
    );

    // Replace the handleCopyLink to stop propagation
    replaced = replaced.replace(
      /onClick=\{\(\) => handleCopyLink\(/,
      `onClick={(e) => { e.stopPropagation(); handleCopyLink(`
    );

    // Find the end of the header div and insert the chevron and the wrapper div
    // The header div ends where we see the Share button's closing </button> followed by </div>
    // Let's find </button>\n            </div>
    replaced = replaced.replace(
      /<\/button>\s*<\/div>/,
      `</button>\n              <ChevronDown className={\`w-5 h-5 text-zinc-400 transition-transform duration-300 \${openSections.includes("${id}") ? "rotate-180" : ""}\`} />\n            </div>\n            <div className={\`transition-all duration-500 ease-in-out overflow-hidden space-y-5 \${openSections.includes("${id}") ? "max-h-[5000px] opacity-100 mt-5" : "max-h-0 opacity-0 m-0"}\`}>`
    );

    // Close the wrapper div right before </section>
    replaced = replaced.replace(
      /<\/section>$/,
      `  </div>\n          </section>`
    );

    return replaced;
  });

  fs.writeFileSync(filePath, content);
  console.log('Processed', filePath);
}

processFile('src/app/privacy/page.tsx');
processFile('src/app/terms/page.tsx');

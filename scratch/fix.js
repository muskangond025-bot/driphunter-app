const fs = require('fs');

function cleanNumbers(file, isPrivacy) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Add title
  if (isPrivacy) {
    content = content.replace('<StaticContentLayout>', '<StaticContentLayout title="Privacy Policy">');
  } else {
    content = content.replace('progressBarGradient="from-[#6F4E37] via-[#E6C280] to-[#6F4E37]"\n    >', 'progressBarGradient="from-[#6F4E37] via-[#E6C280] to-[#6F4E37]"\n      title="Terms & Conditions"\n    >');
  }

  // 2. Remove "1. " from the h2 tags
  // The regex finds <h2 ...> then any spaces, then digits followed by a dot and spaces, then the actual title, then </h2>
  content = content.replace(/(<h2[^>]*>)\s*\d+\.\s+([\s\S]*?)(<\/h2>)/g, '$1\n                    $2$3');

  fs.writeFileSync(file, content);
  console.log('Fixed ' + file);
}

cleanNumbers('src/app/privacy/page.tsx', true);
cleanNumbers('src/app/terms/page.tsx', false);

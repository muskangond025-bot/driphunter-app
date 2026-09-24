const fs = require('fs');

let content = fs.readFileSync('src/app/mobile/product/[id]/page.tsx', 'utf-8');

// Add import if missing
if (!content.includes('SectionHeading')) {
    content = content.replace(
        'import ProductCard from "@/components/product/ProductCard";',
        'import ProductCard from "@/components/product/ProductCard";\nimport { SectionHeading } from "@/components/ui/SectionHeading";'
    );
}

// 1. More from Puma
content = content.replace(
    `<h3 className="text-sm font-black font-sans uppercase tracking-widest text-zinc-950 dark:text-white mb-6">\n            More from {productDetail.brand}\n          </h3>`,
    `<div className="border-b border-zinc-200/70 dark:border-zinc-800/80 pb-3 mb-5">\n            <SectionHeading\n              variant="playfair"\n              className="text-zinc-950 dark:text-zinc-50"\n              title={<>MORE FROM <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">{productDetail.brand.toUpperCase()}</span></>}\n            />\n          </div>`
);

// 2. Similar Products
content = content.replace(
    `<h3 className="text-sm font-black font-sans uppercase tracking-widest text-zinc-950 dark:text-white mb-6">\n            Similar Products\n          </h3>`,
    `<div className="border-b border-zinc-200/70 dark:border-zinc-800/80 pb-3 mb-5">\n            <SectionHeading\n              variant="playfair"\n              className="text-zinc-950 dark:text-zinc-50"\n              title={<>SIMILAR <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">PRODUCTS</span></>}\n            />\n          </div>`
);

// 3. Recently Viewed
content = content.replace(
    `<h3 className="text-sm font-black font-sans uppercase tracking-widest text-zinc-950 dark:text-white mb-6">\n            Recently Viewed\n          </h3>`,
    `<div className="border-b border-zinc-200/70 dark:border-zinc-800/80 pb-3 mb-5">\n            <SectionHeading\n              variant="playfair"\n              className="text-zinc-950 dark:text-zinc-50"\n              title={<>RECENTLY <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">VIEWED</span></>}\n            />\n          </div>`
);

fs.writeFileSync('src/app/mobile/product/[id]/page.tsx', content, 'utf-8');
console.log('Done!');

const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (let {regex, replacement} of replacements) {
        if (regex.test(content)) {
            content = content.replace(regex, replacement);
            changed = true;
        } else {
            console.log(`Regex not found in ${filePath}:\n${regex}`);
        }
    }
    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

// 1. TrendingProducts
replaceInFile('src/components/TrendingProducts.tsx', [
    {
        regex: /import \{ useScrollAnimation \} from "@\/hooks\/useScrollAnimation";/,
        replacement: 'import { useScrollAnimation } from "@/hooks/useScrollAnimation";\nimport { SectionHeading } from "@/components/ui/SectionHeading";'
    },
    {
        regex: /<div className=\{`text-center mb-12 transition-all duration-700 \$\{isVisible \? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"\}`\}>\s*<h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight text-black dark:text-white">Trending Now<\/h2>\s*<p className="text-xs sm:text-sm text-zinc-500 mt-3 max-w-lg mx-auto">The hottest items our community is wearing right now<\/p>\s*<\/div>/,
        replacement: '<div className={`mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>\n          <SectionHeading\n            title="Trending Now"\n            subtitle={<p className="text-xs sm:text-sm text-zinc-500 mt-3 max-w-lg mx-auto">The hottest items our community is wearing right now</p>}\n            align="center"\n            className="text-black dark:text-white"\n          />\n        </div>'
    }
]);

// 2. SocialWall
replaceInFile('src/components/SocialWall.tsx', [
    {
        regex: /import \{ Instagram, Play, ArrowRight, Heart, MessageCircle \} from "lucide-react";/,
        replacement: 'import { Instagram, Play, ArrowRight, Heart, MessageCircle } from "lucide-react";\nimport { SectionHeading } from "@/components/ui/SectionHeading";'
    },
    {
        regex: /<div className="text-center mb-16 relative z-10">\s*<div className="inline-flex items-center justify-center p-1 bg-\[\#6F4E37\]\/10 rounded-full mb-6 ring-1 ring-\[\#6F4E37\]\/20">\s*<span className="text-\[10px\] font-mono text-\[\#6F4E37\] font-extrabold uppercase tracking-widest px-4 py-1">\s*\#DripHunter\s*<\/span>\s*<\/div>\s*<h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight text-black">\s*DripHunter IRL\s*<\/h2>\s*<p className="text-sm sm:text-base text-zinc-500 mt-4 max-w-2xl mx-auto">\s*Tag @driphunter on Instagram or TikTok to be featured on our community board.\s*<\/p>\s*<\/div>/,
        replacement: '<div className="mb-16 relative z-10">\n            <SectionHeading\n              title="DripHunter IRL"\n              subtitle={<p className="text-sm sm:text-base text-zinc-500 mt-4 max-w-2xl mx-auto">Tag @driphunter on Instagram or TikTok to be featured on our community board.</p>}\n              eyebrow={\n                <div className="inline-flex items-center justify-center p-1 bg-[#6F4E37]/10 rounded-full ring-1 ring-[#6F4E37]/20">\n                  <span className="text-[10px] font-mono text-[#6F4E37] font-extrabold uppercase tracking-widest px-4 py-1">#DripHunter</span>\n                </div>\n              }\n              align="center"\n              className="text-black"\n            />\n          </div>'
    }
]);

// 3. RecommendedForYou
replaceInFile('src/components/RecommendedForYou.tsx', [
    {
        regex: /import \{ Sparkles, ArrowRight \} from "lucide-react";/,
        replacement: 'import { Sparkles, ArrowRight } from "lucide-react";\nimport { SectionHeading } from "@/components/ui/SectionHeading";'
    },
    {
        regex: /<div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 mb-12">\s*<div className="text-center sm:text-left">\s*<div className="inline-flex items-center gap-2 mb-4">\s*<Sparkles className="w-4 h-4 text-\[\#6F4E37\]" \/>\s*<span className="text-\[10px\] font-mono text-\[\#6F4E37\] font-extrabold uppercase tracking-widest">\s*Based on your taste\s*<\/span>\s*<\/div>\s*<h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight text-black">\s*Curated For You\s*<\/h2>\s*<\/div>\s*<div\s*onClick=\{[^}]+\}\s*className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-widest text-\[\#6F4E37\] hover:opacity-80 transition-opacity cursor-pointer"\s*>\s*View All Matches <ArrowRight className="w-3\.5 h-3\.5" \/>\s*<\/div>\s*<\/div>/,
        replacement: '<div className="mb-12">\n          <SectionHeading\n            title="Curated For You"\n            align="left"\n            className="text-black"\n            eyebrow={\n              <div className="inline-flex items-center gap-2">\n                <Sparkles className="w-4 h-4 text-[#6F4E37]" />\n                <span className="text-[10px] font-mono text-[#6F4E37] font-extrabold uppercase tracking-widest">Based on your taste</span>\n              </div>\n            }\n            action={\n              <div \n                onClick={() => router.push("/shop?sort=recommended")}\n                className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-widest text-[#6F4E37] hover:opacity-80 transition-opacity cursor-pointer"\n              >\n                View All Matches <ArrowRight className="w-3.5 h-3.5" />\n              </div>\n            }\n          />\n        </div>'
    }
]);

// 4. LiveShows
replaceInFile('src/components/LiveShows.tsx', [
    {
        regex: /import \{ Radio, Users, Calendar, ArrowRight, Play, Eye \} from "lucide-react";/,
        replacement: 'import { Radio, Users, Calendar, ArrowRight, Play, Eye } from "lucide-react";\nimport { SectionHeading } from "@/components/ui/SectionHeading";'
    },
    {
        regex: /<div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 mb-12">\s*<div className="text-center sm:text-left">\s*<div className="inline-flex items-center gap-2 mb-4">\s*<span className="relative flex h-2 w-2">\s*<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"><\/span>\s*<span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"><\/span>\s*<\/span>\s*<span className="text-\[10px\] font-mono text-\[\#6F4E37\] font-extrabold uppercase tracking-widest">\s*Broadcasting Now\s*<\/span>\s*<\/div>\s*<h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight text-black">\s*Live Drops\s*<\/h2>\s*<\/div>\s*<\/div>/,
        replacement: '<div className="mb-12">\n          <SectionHeading\n            title="Live Drops"\n            align="left"\n            className="text-black"\n            eyebrow={\n              <div className="inline-flex items-center gap-2">\n                <span className="relative flex h-2 w-2">\n                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>\n                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>\n                </span>\n                <span className="text-[10px] font-mono text-[#6F4E37] font-extrabold uppercase tracking-widest">\n                  Broadcasting Now\n                </span>\n              </div>\n            }\n          />\n        </div>'
    }
]);

// 5. BulletinBoard
replaceInFile('src/components/BulletinBoard.tsx', [
    {
        regex: /import \{ Pin, Calendar, ArrowRight \} from "lucide-react";/,
        replacement: 'import { Pin, Calendar, ArrowRight } from "lucide-react";\nimport { SectionHeading } from "@/components/ui/SectionHeading";'
    },
    {
        regex: /<div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 mb-12">\s*<div className="text-center sm:text-left">\s*<div className="inline-flex items-center gap-2 mb-4">\s*<Pin className="w-4 h-4 text-\[\#6F4E37\]" \/>\s*<span className="text-\[10px\] font-mono text-\[\#6F4E37\] font-extrabold uppercase tracking-widest">\s*Notice Board\s*<\/span>\s*<\/div>\s*<h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight text-black">\s*The Bulletin\s*<\/h2>\s*<\/div>\s*<\/div>/,
        replacement: '<div className="mb-12">\n          <SectionHeading\n            title="The Bulletin"\n            align="left"\n            className="text-black"\n            eyebrow={\n              <div className="inline-flex items-center gap-2">\n                <Pin className="w-4 h-4 text-[#6F4E37]" />\n                <span className="text-[10px] font-mono text-[#6F4E37] font-extrabold uppercase tracking-widest">Notice Board</span>\n              </div>\n            }\n          />\n        </div>'
    }
]);

// 6. InfluencerPicks
replaceInFile('src/components/InfluencerPicks.tsx', [
    {
        regex: /import \{ Star, ArrowRight \} from "lucide-react";/,
        replacement: 'import { Star, ArrowRight } from "lucide-react";\nimport { SectionHeading } from "@/components/ui/SectionHeading";'
    },
    {
        regex: /<div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 mb-12 relative z-10">\s*<div className="text-center sm:text-left">\s*<div className="inline-flex items-center gap-2 mb-4">\s*<Star className="w-4 h-4 text-\[\#6F4E37\]" \/>\s*<span className="text-\[10px\] font-mono text-\[\#6F4E37\] font-extrabold uppercase tracking-widest">\s*Staff \& Creator Favorites\s*<\/span>\s*<\/div>\s*<h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight text-black">\s*Creator Curations\s*<\/h2>\s*<\/div>\s*<div className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-widest text-\[\#6F4E37\] hover:opacity-80 transition-opacity cursor-pointer">\s*Meet the creators <ArrowRight className="w-3\.5 h-3\.5" \/>\s*<\/div>\s*<\/div>/,
        replacement: '<div className="mb-12 relative z-10">\n          <SectionHeading\n            title="Creator Curations"\n            align="left"\n            className="text-black"\n            eyebrow={\n              <div className="inline-flex items-center gap-2">\n                <Star className="w-4 h-4 text-[#6F4E37]" />\n                <span className="text-[10px] font-mono text-[#6F4E37] font-extrabold uppercase tracking-widest">Staff & Creator Favorites</span>\n              </div>\n            }\n            action={\n              <div className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-widest text-[#6F4E37] hover:opacity-80 transition-opacity cursor-pointer">\n                Meet the creators <ArrowRight className="w-3.5 h-3.5" />\n              </div>\n            }\n          />\n        </div>'
    }
]);

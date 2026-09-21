import os

files_to_migrate = [
    {
        "file": "src/components/TrendingProducts.tsx",
        "replacements": [
            (
                'import { useScrollAnimation } from "@/hooks/useScrollAnimation";',
                'import { useScrollAnimation } from "@/hooks/useScrollAnimation";\nimport { SectionHeading } from "@/components/ui/SectionHeading";'
            ),
            (
                '<div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>\n          <h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight text-black dark:text-white">Trending Now</h2>\n          <p className="text-xs sm:text-sm text-zinc-500 mt-3 max-w-lg mx-auto">The hottest items our community is wearing right now</p>\n        </div>',
                '<div className={`mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>\n          <SectionHeading\n            title="Trending Now"\n            subtitle={<p className="text-xs sm:text-sm text-zinc-500 mt-3 max-w-lg mx-auto">The hottest items our community is wearing right now</p>}\n            align="center"\n            className="text-black dark:text-white"\n          />\n        </div>'
            )
        ]
    },
    {
        "file": "src/components/SocialWall.tsx",
        "replacements": [
            (
                'import { Instagram, Play, ArrowRight, Heart, MessageCircle } from "lucide-react";',
                'import { Instagram, Play, ArrowRight, Heart, MessageCircle } from "lucide-react";\nimport { SectionHeading } from "@/components/ui/SectionHeading";'
            ),
            (
                '<div className="text-center mb-16 relative z-10">\n            <div className="inline-flex items-center justify-center p-1 bg-[#6F4E37]/10 rounded-full mb-6 ring-1 ring-[#6F4E37]/20">\n              <span className="text-[10px] font-mono text-[#6F4E37] font-extrabold uppercase tracking-widest px-4 py-1">\n                #DripHunter\n              </span>\n            </div>\n            <h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight text-black">\n              DripHunter IRL\n            </h2>\n            <p className="text-sm sm:text-base text-zinc-500 mt-4 max-w-2xl mx-auto">\n              Tag @driphunter on Instagram or TikTok to be featured on our community board.\n            </p>\n          </div>',
                '<div className="mb-16 relative z-10">\n            <SectionHeading\n              title="DripHunter IRL"\n              subtitle={<p className="text-sm sm:text-base text-zinc-500 mt-4 max-w-2xl mx-auto">Tag @driphunter on Instagram or TikTok to be featured on our community board.</p>}\n              eyebrow={\n                <div className="inline-flex items-center justify-center p-1 bg-[#6F4E37]/10 rounded-full mb-6 ring-1 ring-[#6F4E37]/20">\n                  <span className="text-[10px] font-mono text-[#6F4E37] font-extrabold uppercase tracking-widest px-4 py-1">#DripHunter</span>\n                </div>\n              }\n              align="center"\n              className="text-black"\n            />\n          </div>'
            )
        ]
    },
    {
        "file": "src/components/RecommendedForYou.tsx",
        "replacements": [
            (
                'import { Sparkles, ArrowRight } from "lucide-react";',
                'import { Sparkles, ArrowRight } from "lucide-react";\nimport { SectionHeading } from "@/components/ui/SectionHeading";'
            ),
            (
                '<div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 mb-12">\n          <div className="text-center sm:text-left">\n            <div className="inline-flex items-center gap-2 mb-4">\n              <Sparkles className="w-4 h-4 text-[#6F4E37]" />\n              <span className="text-[10px] font-mono text-[#6F4E37] font-extrabold uppercase tracking-widest">\n                Based on your taste\n              </span>\n            </div>\n            <h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight text-black">\n              Curated For You\n            </h2>\n          </div>\n          <div \n            onClick={() => router.push("/shop?sort=recommended")}\n            className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-widest text-[#6F4E37] hover:opacity-80 transition-opacity cursor-pointer"\n          >\n            View All Matches <ArrowRight className="w-3.5 h-3.5" />\n          </div>\n        </div>',
                '<div className="mb-12">\n          <SectionHeading\n            title="Curated For You"\n            align="left"\n            className="text-black"\n            eyebrow={\n              <div className="inline-flex items-center gap-2 mb-4">\n                <Sparkles className="w-4 h-4 text-[#6F4E37]" />\n                <span className="text-[10px] font-mono text-[#6F4E37] font-extrabold uppercase tracking-widest">Based on your taste</span>\n              </div>\n            }\n            action={\n              <div \n                onClick={() => router.push("/shop?sort=recommended")}\n                className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-widest text-[#6F4E37] hover:opacity-80 transition-opacity cursor-pointer"\n              >\n                View All Matches <ArrowRight className="w-3.5 h-3.5" />\n              </div>\n            }\n          />\n        </div>'
            )
        ]
    },
    {
        "file": "src/components/LiveShows.tsx",
        "replacements": [
            (
                'import { Radio, Users, Calendar, ArrowRight, Play, Eye } from "lucide-react";',
                'import { Radio, Users, Calendar, ArrowRight, Play, Eye } from "lucide-react";\nimport { SectionHeading } from "@/components/ui/SectionHeading";'
            ),
            (
                '<div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 mb-12">\n          <div className="text-center sm:text-left">\n            <div className="inline-flex items-center gap-2 mb-4">\n              <span className="relative flex h-2 w-2">\n                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>\n                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>\n              </span>\n              <span className="text-[10px] font-mono text-[#6F4E37] font-extrabold uppercase tracking-widest">\n                Broadcasting Now\n              </span>\n            </div>\n            <h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight text-black">\n              Live Drops\n            </h2>\n          </div>\n        </div>',
                '<div className="mb-12">\n          <SectionHeading\n            title="Live Drops"\n            align="left"\n            className="text-black"\n            eyebrow={\n              <div className="inline-flex items-center gap-2 mb-4">\n                <span className="relative flex h-2 w-2">\n                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>\n                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>\n                </span>\n                <span className="text-[10px] font-mono text-[#6F4E37] font-extrabold uppercase tracking-widest">\n                  Broadcasting Now\n                </span>\n              </div>\n            }\n          />\n        </div>'
            )
        ]
    }
]

for item in files_to_migrate:
    path = item["file"]
    if not os.path.exists(path):
        print(f"File {path} not found")
        continue
        
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        
    for old, new in item["replacements"]:
        if old in content:
            content = content.replace(old, new)
        else:
            print(f"Could not find exact block in {path}")
            
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
        
print("Migration batch 1 completed")

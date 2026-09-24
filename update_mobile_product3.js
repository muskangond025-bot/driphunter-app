const fs = require('fs');

let content = fs.readFileSync('src/app/mobile/product/[id]/page.tsx', 'utf-8');

// 1. Remove Footer
content = content.replace('<Footer />', '');

// 2. Add gap between PUMA X FERRARI and MORE FROM BRAND
const pumaFerrariEnd = `        </section>

        {/* MORE FROM BRAND */}`;
const pumaFerrariGap = `        </section>

        <div className="h-2 w-full bg-zinc-50 dark:bg-zinc-900" />

        {/* MORE FROM BRAND */}`;
content = content.replace(pumaFerrariEnd, pumaFerrariGap);

// 3. Insert More from Puma slider before SIMILAR PRODUCTS
const similarProductsStart = `        {/* 12. SIMILAR PRODUCTS */}`;
const moreFromPumaSlider = `        {/* MORE FROM PUMA (SLIDER) */}
        <div className="px-5 py-8">
          <h3 className="text-sm font-black font-sans uppercase tracking-widest text-zinc-950 dark:text-white mb-6">
            More from {productDetail.brand}
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
            {similarProducts.map((p) => (
              <div key={p.id + "_more"} className="w-[45vw] sm:w-[200px] shrink-0 snap-start">
                <ProductCard
                  id={p.id}
                  brand={p.brand}
                  name={p.name}
                  price={p.price.toString()}
                  image={p.image}
                  basePath="/mobile"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="h-2 w-full bg-zinc-50 dark:bg-zinc-900" />

        {/* 12. SIMILAR PRODUCTS */}`;

content = content.replace(similarProductsStart, moreFromPumaSlider);

fs.writeFileSync('src/app/mobile/product/[id]/page.tsx', content, 'utf-8');
console.log('Done!');

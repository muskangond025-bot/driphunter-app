const fs = require('fs');

let content = fs.readFileSync('src/app/mobile/product/[id]/page.tsx', 'utf-8');

// The marker where Virtual Fitting Room starts
const startVFR = "{/* 6.5 VIRTUAL FITTING ROOM */}";
// The marker where Reviews start
const startReviews = "{/* 9. REVIEWS */}";

const idxVFR = content.indexOf(startVFR);
const idxReviews = content.indexOf(startReviews);

if (idxVFR !== -1 && idxReviews !== -1) {
    const fullInteractiveCode = `{/* 6.5 VIRTUAL FITTING ROOM */}
        <div className="px-5 py-8 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex flex-col gap-5 mb-8">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#6F4E37] dark:text-[#E6C280] block mb-2">
                Interactive Experience
              </span>
              <h2 className="text-2xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair leading-tight">
                Virtual <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Fitting Room</span>
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans font-light mt-2 max-w-lg">
                See how the collection fits on you. Use your camera to try on pieces instantly, or view them on our studio models.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleResetFit}
                className="text-xs font-mono font-bold tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className={\`w-3.5 h-3.5 \${isResetting ? "animate-spin" : ""}\`} />
                RESET
              </button>

              <button
                onClick={toggleLiveCamera}
                className={\`flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer \${
                  isLiveCameraActive
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-400 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
                }\`}
              >
                <Camera className="w-4 h-4" />
                <span>{\`\${isLiveCameraActive ? "Stop Camera" : "Live Try-On"}\`}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {/* Visualizer */}
            <div className="relative rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 h-[450px] border border-zinc-200/50 dark:border-zinc-800/50">
              {isLiveCameraActive && hasWebcamAccess ? (
                <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
                  <video
                    ref={(el) => {
                      videoRef.current = el;
                      if (el && activeStreamRef.current && el.srcObject !== activeStreamRef.current) {
                        el.srcObject = activeStreamRef.current;
                        el.play().catch(() => {});
                      }
                    }}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                  />
                  
                  {selectedTryOnItem !== null && tryOnWardrobe[selectedTryOnItem] && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ease-out"
                      style={{ transform: \`translateY(\${clothOffsetY}px)\` }}
                    >
                      <div 
                        className={\`relative w-[280px] aspect-[3/4] -mt-10 transition-all duration-500 ease-out \${
                          isClothMorphing ? "scale-95 opacity-40 blur-[3px]" : "scale-100 opacity-100"
                        }\`}
                        style={{ transform: \`scale(\${clothScale})\` }}
                      >
                        <Image
                          key={\`ar-cloth-\${selectedTryOnItem}\`}
                          src={tryOnWardrobe[selectedTryOnItem]?.clothCutout || tryOnWardrobe[selectedTryOnItem]?.image}
                          alt="Fitted Garment"
                          fill
                          className="object-cover drop-shadow-2xl"
                        />
                      </div>
                    </div>
                  )}

                  {selectedTryOnItem !== null && (
                    <div className="absolute bottom-6 right-6 flex flex-col gap-2 bg-black/40 backdrop-blur-md p-3 rounded-2xl z-20">
                      <div className="flex gap-2">
                        <button onClick={() => setClothScale(s => s - 0.05)} className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center">-</button>
                        <button onClick={() => setClothScale(s => s + 0.05)} className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center">+</button>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setClothOffsetY(y => y - 10)} className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center">▲</button>
                        <button onClick={() => setClothOffsetY(y => y + 10)} className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center">▼</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    key={\`model-tryon-\${selectedTryOnItem ?? "clean"}\`}
                    src={
                      selectedTryOnItem !== null && tryOnWardrobe[selectedTryOnItem]
                        ? tryOnWardrobe[selectedTryOnItem]?.modelImage
                        : "/images/awwwards_tryon_studio.jpg"
                    }
                    alt="Studio Model"
                    fill
                    className={\`object-cover transition-all duration-700 ease-out \${
                      isClothMorphing ? "opacity-50 blur-sm" : "opacity-100"
                    }\`}
                  />
                  {selectedTryOnItem !== null && (
                    <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono font-bold text-zinc-900 dark:text-white shadow-sm border border-zinc-200/50 dark:border-zinc-800/50">
                      Viewing: {tryOnWardrobe[selectedTryOnItem]?.name}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wardrobe Selection */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl p-5 border border-zinc-100 dark:border-zinc-800/80">
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-4 font-bold">
                The Wardrobe ({tryOnWardrobe.length})
              </h3>
              
              <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-2 scrollbar-thin max-h-[300px]">
                {tryOnWardrobe.map((item, idx) => {
                  const isSelected = selectedTryOnItem === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectWardrobeItem(idx)}
                      className={\`text-left p-3 rounded-2xl transition-all duration-300 border \${
                        isSelected
                          ? "border-[#6F4E37] dark:border-[#E6C280] bg-white dark:bg-zinc-800 shadow-sm"
                          : "border-transparent bg-transparent"
                      }\`}
                    >
                      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 mb-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover mix-blend-multiply dark:mix-blend-normal"
                        />
                      </div>
                      <span className="text-[9px] font-mono text-zinc-400 block mb-1">
                        {item.category}
                      </span>
                      <h4 className="text-[11px] font-semibold text-zinc-900 dark:text-white leading-tight">
                        {item.name}
                      </h4>
                    </button>
                  );
                })}
              </div>

              <div className="pt-5 mt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={() => {
                    const fittedItem = selectedTryOnItem !== null ? tryOnWardrobe[selectedTryOnItem] : null;
                    addToCart({
                      id: fittedItem?.id || productDetail.id,
                      name: fittedItem ? fittedItem.name : productDetail.name,
                      price: productDetail.price,
                      image: fittedItem?.image || currentColor.images[0],
                      brand: productDetail.brand,
                      size: selectedSize,
                      color: currentColor.name
                    }, 1);
                  }}
                  className="w-full py-3.5 rounded-full bg-zinc-900 hover:bg-[#6F4E37] text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-[#E6C280] text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add Current to Bag
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-2 w-full bg-zinc-50 dark:bg-zinc-900" />

        {/* 11. STYLE WITH US (INTERACTIVE) */}
        <div className="px-5 py-8">
          <div className="mb-6 text-left">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[#6F4E37] dark:text-[#E6C280] font-bold uppercase block mb-1">
              Curated Lookbook
            </span>
            <h3 className="text-2xl font-light tracking-tight text-zinc-950 dark:text-zinc-50 font-playfair uppercase leading-none">
              Style With <span className="font-serif italic font-normal text-[#6F4E37] dark:text-[#E6C280]">Us</span>
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed font-sans">
              Elevate your wardrobe with perfectly paired pieces. Select items to complete the look.
            </p>
          </div>

          <div className="flex flex-col gap-6 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-3xl p-5 border border-zinc-100 dark:border-zinc-800/60 shadow-sm">
            {/* Lookbook Mannequin */}
            <div className="relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 h-[400px] w-full">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
                alt="Curated Look"
                className="w-full h-full object-cover"
              />
              
              {/* Elegant Hotspots */}
              {[
                { id: "cap", top: "12%", left: "48%" },
                { id: "tee", top: "32%", left: "45%" },
                { id: "pants", top: "60%", left: "52%" },
                { id: "shoes", top: "88%", left: "50%" },
              ].map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => toggleStyledItem(spot.id)}
                  className={\`absolute w-4 h-4 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 -translate-x-1/2 -translate-y-1/2 before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:animate-ping \${
                    styledItems[spot.id]
                      ? "bg-[#6F4E37] before:border-[#6F4E37] shadow-[0_0_10px_rgba(111,78,55,0.5)]"
                      : "bg-white/80 before:border-white shadow-sm"
                  }\`}
                  style={{ top: spot.top, left: spot.left }}
                >
                  {styledItems[spot.id] && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              ))}
            </div>

            {/* Wardrobe Selection */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 font-mono">
                  The Collection
                </h4>
                <span className="text-[9px] font-mono text-zinc-500 uppercase">
                  {Object.values(styledItems).filter(Boolean).length} Selected
                </span>
              </div>
              
              <div className="flex flex-col gap-2">
                {stylingItems.map((item) => {
                  const isActive = styledItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleStyledItem(item.id)}
                      className={\`group flex items-center gap-3 p-2.5 rounded-2xl cursor-pointer transition-all duration-300 border \${
                        isActive
                          ? "bg-white dark:bg-zinc-800/80 border-zinc-300 dark:border-zinc-600 shadow-sm"
                          : "bg-transparent border-transparent"
                      }\`}
                    >
                      <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                      </div>
                      <div className="flex-grow overflow-hidden">
                        <span className="text-[8.5px] font-mono tracking-widest text-zinc-400 uppercase font-bold block mb-0.5 truncate">
                          {item.color}
                        </span>
                        <h5 className={\`text-[11px] font-semibold transition-colors duration-300 truncate \${isActive ? "text-[#6F4E37] dark:text-[#E6C280]" : "text-zinc-900 dark:text-zinc-100"}\`}>
                          {item.name}
                        </h5>
                        <div className="mt-1">
                          <strong className="text-[11px] font-mono text-zinc-900 dark:text-zinc-100">
                            ₹{item.price.toLocaleString()}
                          </strong>
                        </div>
                      </div>
                      <div className="pr-2 shrink-0">
                        <div className={\`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 \${
                          isActive 
                            ? "bg-[#6F4E37] border-[#6F4E37] text-white" 
                            : "border-zinc-300 dark:border-zinc-700 text-transparent"
                        }\`}>
                          {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Area */}
              <div className="mt-4 pt-5 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9.5px] font-mono text-zinc-500 uppercase tracking-widest block">
                    Total Value
                  </span>
                  <strong className="text-xl font-light font-playfair text-zinc-900 dark:text-zinc-100">
                    ₹{totalOutfitPrice.toLocaleString()}
                  </strong>
                </div>
                <button
                  onClick={handleAddOutfitToBag}
                  className="w-full py-3.5 bg-zinc-900 hover:bg-[#6F4E37] text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-[#E6C280] rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-2 w-full bg-zinc-50 dark:bg-zinc-900" />

        `;
    
    content = content.substring(0, idxVFR) + fullInteractiveCode + content.substring(idxReviews);
}

fs.writeFileSync('src/app/mobile/product/[id]/page.tsx', content, 'utf-8');
console.log('Done!');

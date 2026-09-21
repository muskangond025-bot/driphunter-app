const fs = require('fs');

function getBlock(text, startMarker, endMarker) {
    const start = text.indexOf(startMarker);
    if (start === -1) return "";
    if (endMarker) {
        const end = text.indexOf(endMarker, start);
        if (end === -1) return "";
        return text.substring(start, end);
    } else {
        return text.substring(start);
    }
}

function main() {
    try {
        const text = fs.readFileSync("src/app/product/[id]/page.tsx", "utf-8");

        const mainGrid = getBlock(text, "      {/* ─── MAIN PRODUCT GRID ─── */}", "        {/* ─── 2ND SECTION: VIRTUAL TRY-ON STUDIO ─── */}");
        const virtualTryon = getBlock(text, "        {/* ─── 2ND SECTION: VIRTUAL TRY-ON STUDIO ─── */}", "        {/* ─── DESCRIPTION TABS ─── */}");
        const descriptionTabs = getBlock(text, "        {/* ─── DESCRIPTION TABS ─── */}", "      </main>");
        const collabBanner = getBlock(text, "      {/* ─── COLLABORATION BANNER ─── */}", "      {/* ─── DESCRIPTION & DETAILS (BOTTLE CLUB INSPIRED) ─── */}");
        const descBottle = getBlock(text, "      {/* ─── DESCRIPTION & DETAILS (BOTTLE CLUB INSPIRED) ─── */}", "      {/* ─── INTERACTIVE STYLE WITH US ─── */}");
        
        // Let's find the start of Customer Reviews by searching for "User Experiences" and finding the previous "<section"
        let ueIdx = text.indexOf("User Experiences");
        let customerReviewsStart = text.lastIndexOf("<section", ueIdx);
        
        // Wait, how about styleWithUs end?
        // It ends exactly where customerReviews starts
        
        const styleWithUs = text.substring(text.indexOf("      {/* ─── INTERACTIVE STYLE WITH US ─── */}"), customerReviewsStart);
        const customerReviews = text.substring(customerReviewsStart, text.indexOf("      {/* ─── BRAND SPOTLIGHT BANNER (BOTTLE CLUB INSPIRED) ─── */}"));
        
        const brandSpotlight = getBlock(text, "      {/* ─── BRAND SPOTLIGHT BANNER (BOTTLE CLUB INSPIRED) ─── */}", "      {/* ─── MORE FROM BRAND ─── */}");
        const moreFromBrand = getBlock(text, "      {/* ─── MORE FROM BRAND ─── */}", "      {/* ─── SIMILAR PRODUCTS ─── */}");
        const similarProducts = getBlock(text, "      {/* ─── SIMILAR PRODUCTS ─── */}", "      {/* ─── RECENTLY VIEWED ─── */}");
        const recentlyViewed = getBlock(text, "      {/* ─── RECENTLY VIEWED ─── */}", "      {/* Footer */}");
        
        const prefix = getBlock(text, "", "      {/* ─── MAIN PRODUCT GRID ─── */}");
        const suffix = getBlock(text, "      {/* Footer */}", null);

        if (!mainGrid || !virtualTryon || !descriptionTabs || !collabBanner || !descBottle || !styleWithUs || !customerReviews || !brandSpotlight || !moreFromBrand || !similarProducts || !recentlyViewed) {
            console.log("Failed to find one or more blocks!");
            console.log("mainGrid:", !!mainGrid);
            console.log("virtualTryon:", !!virtualTryon);
            console.log("descriptionTabs:", !!descriptionTabs);
            console.log("collabBanner:", !!collabBanner);
            console.log("descBottle:", !!descBottle);
            console.log("styleWithUs:", !!styleWithUs);
            console.log("customerReviews:", !!customerReviews);
            console.log("brandSpotlight:", !!brandSpotlight);
            console.log("moreFromBrand:", !!moreFromBrand);
            console.log("similarProducts:", !!similarProducts);
            console.log("recentlyViewed:", !!recentlyViewed);
            return;
        }

        let newText = prefix;
        // 1. Product Gallery + Product Information (already in mainGrid)
        newText += mainGrid;
        // 4. Product Description + Product Details (Description Tabs & Bottle Club Inspired)
        newText += descriptionTabs;
        newText += "      </main>\n\n";
        newText += descBottle;
        // 5. Virtual Fitting Room
        newText += "      <div className=\"pb-6 px-6 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto overflow-hidden\">\n";
        newText += virtualTryon;
        newText += "      </div>\n\n";
        // 6. Style With Us
        newText += styleWithUs;
        // 7. Customer Reviews
        newText += customerReviews;
        // 8. Brand Story / Promotional Banner
        newText += collabBanner;
        newText += brandSpotlight;
        // 9. More From Brand
        newText += moreFromBrand;
        // 10. Similar Products
        newText += similarProducts;
        // 11. Recently Viewed
        newText += recentlyViewed;
        newText += suffix;

        fs.writeFileSync("src/app/product/[id]/page.tsx", newText, "utf-8");

        console.log("Reorder complete.");
    } catch (e) {
        console.error("Error:", e);
    }
}

main();

import re
import sys

def get_block(text, start_marker, end_marker):
    start = text.find(start_marker)
    if start == -1: return ""
    if end_marker:
        end = text.find(end_marker, start)
        if end == -1: return ""
        return text[start:end]
    else:
        return text[start:]

def main():
    try:
        with open("src/app/product/[id]/page.tsx", "r", encoding="utf-8") as f:
            text = f.read()

        main_grid = get_block(text, "      {/* ─── MAIN PRODUCT GRID ─── */}", "        {/* ─── 2ND SECTION: VIRTUAL TRY-ON STUDIO ─── */}")
        virtual_tryon = get_block(text, "        {/* ─── 2ND SECTION: VIRTUAL TRY-ON STUDIO ─── */}", "        {/* ─── DESCRIPTION TABS ─── */}")
        description_tabs = get_block(text, "        {/* ─── DESCRIPTION TABS ─── */}", "      </main>")
        collab_banner = get_block(text, "      {/* ─── COLLABORATION BANNER ─── */}", "      {/* ─── DESCRIPTION & DETAILS (BOTTLE CLUB INSPIRED) ─── */}")
        desc_bottle = get_block(text, "      {/* ─── DESCRIPTION & DETAILS (BOTTLE CLUB INSPIRED) ─── */}", "      {/* ─── INTERACTIVE STYLE WITH US ─── */}")
        style_with_us = get_block(text, "      {/* ─── INTERACTIVE STYLE WITH US ─── */}", "      <section className=\"w-full py-16 border-t border-zinc-100 text-left space-y-8 overflow-x-hidden\">\n        <div className=\"w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 border-b border-zinc-100 pb-6 flex items-end justify-between gap-4\">")
        
        customer_reviews_start = "      <section className=\"w-full py-16 border-t border-zinc-100 text-left space-y-8 overflow-x-hidden\">\n        <div className=\"w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 border-b border-zinc-100 pb-6 flex items-end justify-between gap-4\">"
        customer_reviews = get_block(text, customer_reviews_start, "      {/* ─── BRAND SPOTLIGHT BANNER (BOTTLE CLUB INSPIRED) ─── */}")
        
        brand_spotlight = get_block(text, "      {/* ─── BRAND SPOTLIGHT BANNER (BOTTLE CLUB INSPIRED) ─── */}", "      {/* ─── MORE FROM BRAND ─── */}")
        more_from_brand = get_block(text, "      {/* ─── MORE FROM BRAND ─── */}", "      {/* ─── SIMILAR PRODUCTS ─── */}")
        similar_products = get_block(text, "      {/* ─── SIMILAR PRODUCTS ─── */}", "      {/* ─── RECENTLY VIEWED ─── */}")
        recently_viewed = get_block(text, "      {/* ─── RECENTLY VIEWED ─── */}", "      {/* Footer */}")
        
        prefix = get_block(text, "", "      {/* ─── MAIN PRODUCT GRID ─── */}")
        suffix = get_block(text, "      {/* Footer */}", None)

        if not (main_grid and virtual_tryon and description_tabs and collab_banner and desc_bottle and style_with_us and customer_reviews and brand_spotlight and more_from_brand and similar_products and recently_viewed):
            print("Failed to find one or more blocks!")
            return

        new_text = prefix
        new_text += main_grid
        new_text += description_tabs
        new_text += "      </main>\n\n"
        new_text += desc_bottle
        new_text += "      <div className=\"pb-6 px-6 sm:px-12 md:px-16 lg:px-20 w-full max-w-[1600px] mx-auto\">\n"
        new_text += virtual_tryon
        new_text += "      </div>\n\n"
        new_text += style_with_us
        new_text += customer_reviews
        new_text += collab_banner
        new_text += brand_spotlight
        new_text += more_from_brand
        new_text += similar_products
        new_text += recently_viewed
        new_text += suffix

        with open("src/app/product/[id]/page.tsx", "w", encoding="utf-8") as f:
            f.write(new_text)

        print("Reorder complete.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    main()

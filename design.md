DripHunter — Design System & Visual Rules

1. Design Direction

DripHunter is a premium streetwear e-commerce experience.

The visual direction should feel:

premium

editorial

fashion-forward

cinematic

confident

minimal but expressive

modern streetwear

Awwwards-level where appropriate

Avoid generic/template e-commerce styling.

Core principle:

Different pages may have different layouts, but they must feel like the same DripHunter brand.

2. Homepage as Visual Reference

The homepage is the primary reference for the global DripHunter design language.

Use it to judge:

page width

horizontal gutters

typography hierarchy

section rhythm

buttons

surfaces

borders

shadows

background treatment

header/footer relationship

responsive behavior

Do not copy the homepage layout onto every page.

Copy the design language, not the exact structure.

3. Page Width & Containers

Standard DripHunter content generally uses:

max-w-[1600px]

centered layout

responsive horizontal gutters

consistent left/right alignment

Existing PageContainer should be preferred over repeating container classes.

However, intentional exceptions are allowed:

Reading content

Legal and article content may be narrower for readability.

Dashboard

Account/admin-style content may use a dashboard width.

Full-bleed

Heroes, banners, editorial imagery, and promotional sections may intentionally extend beyond the normal container.

Never force all pages into one width.

4. Horizontal Gutters

The established homepage scale uses approximately:

px-6

sm:px-12

md:px-16

lg:px-20

Use the existing PageContainer rather than duplicating these values.

Intentional page-specific spacing is allowed when required by the layout.

5. Typography

Major editorial headings

Prefer the established Playfair typography where appropriate.

Typical visual direction:

elegant serif

light weight

tight tracking

strong scale

generous whitespace

Microcopy / metadata

Use the established mono style for:

labels

metadata

eyebrow text

small navigation-style copy

technical/product microcopy

Typical direction:

uppercase

small size

strong tracking

compact presentation

Sans typography

Use the existing sans family for:

UI controls

functional content

supporting text

dashboards

dense information

Do not force Playfair onto every heading.

6. Section Rhythm

Major sections should have a deliberate vertical rhythm.

Use the homepage as the reference for:

top/bottom section spacing

heading-to-content spacing

spacing between major blocks

Avoid:

random excessive gaps

cramped sections

inconsistent section starts

arbitrary page-specific spacing with no visual reason

But do not make every section mechanically identical.

7. Surfaces

DripHunter surfaces should feel premium and restrained.

Common visual characteristics:

rounded corners

subtle borders

soft shadows

warm/light surfaces in light mode

deep neutral surfaces in dark mode

Existing Surface should be reused for structural panels.

Do not put a rounded bordered box around every element.

Cards with their own intentional visual language should remain specialized.

8. Border Radius

The design commonly uses large modern radii such as:

rounded-2xl

rounded-3xl

rounded-[28px]

rounded-[32px]

Use the radius appropriate to the component.

Do not globally replace every radius with one value.

Small controls may intentionally use smaller radii.

9. Shadows & Borders

Prefer subtle, premium depth.

Typical patterns:

restrained shadows

thin low-contrast borders

dark-mode border adjustments

Avoid excessive:

glow

neon shadows

heavy drop shadows

decorative effects on every component

The design should feel expensive rather than overloaded.

10. Buttons

Primary DripHunter CTAs use the established Button variant="drip" foundation when appropriate.

Visual direction:

strong contrast

uppercase treatment where appropriate

mono/UI typography

confident spacing

subtle hover transition

tactile active state

Do not make every button a primary CTA.

Secondary, ghost, destructive, and icon-only actions may retain different styles.

11. Inputs

Standard DripHunter inputs can use:

Input variant="drip"

Visual direction:

clean neutral surface

subtle border

rounded corners

strong focus border

minimal/no excessive focus glow

good contrast in dark mode

Specialized controls should remain specialized.

12. Header

The header is part of the global identity.

Maintain consistency in:

height

logo treatment

navigation spacing

search

account actions

cart/wishlist actions

mobile navigation

Do not redesign the header on individual pages unless there is a genuine global requirement.

13. Footer

The footer should provide a consistent closing structure across the site.

Maintain:

global width/alignment

typography hierarchy

link grouping

spacing

newsletter relationship

dark/light treatment

Page-specific content may differ, but the footer should still feel globally related.

14. Product Cards

Product cards are an established specialized visual system.

Do not redesign or wrap them in generic Surface components just for architectural consistency.

Maintain consistency through the existing ProductCard and focused product primitives.

15. Editorial / Marketing Pages

Pages such as:

About

Affiliate

Seller

Blog

Campaigns

editorial sections

may intentionally use:

full-bleed imagery

split-screen layouts

cinematic hero sections

asymmetric grids

large typography

custom spacing

These differences are intentional.

Do not flatten them into generic commerce layouts.

16. Legal Pages

Terms, Privacy, Shipping, and Returns should prioritize readability.

They may use:

sidebar navigation

narrower content columns

long-form typography

structured headings

reading-oriented spacing

Do not force the standard commerce grid onto them.

17. Dashboard / Account Pages

Profile, Orders, Wallet, and similar pages may use:

data grids

side navigation

compact controls

specialized panels

dashboard-oriented spacing

They should still use the global typography, surfaces, buttons, and color language where appropriate.

18. Product Details

Product Details is intentionally rich and can have specialized structures.

Maintain the established sequence and hierarchy where applicable:

Breadcrumb

Product Hero

Delivery & Returns

Virtual Fitting Studio

Description & Product Details

Style With Us

Customer Reviews

Brand Story / Brand Spotlight

More From Brand

Similar Products

Recently Viewed

Footer

Do not add repetitive recommendation sections simply to fill space.

19. Animation & Interaction

Animations should support the premium fashion/editorial feel.

Good uses:

image reveal

mask transitions

subtle parallax

text reveal

hover motion

magnetic CTA behavior where appropriate

smooth section transitions

restrained scale/opacity movement

Avoid:

animation everywhere

distracting loops

excessive bounce

excessive neon/glow

motion that harms readability or usability

Respect reduced-motion accessibility where relevant.

20. Dark Mode

Dark mode should feel intentionally designed, not simply inverted.

Maintain:

deep neutral backgrounds

appropriate text contrast

subtle borders

carefully tuned surfaces

readable muted text

correct CTA contrast

Do not change specialized dark-mode treatments without a reason.

21. Responsive Design

Every page must be checked at:

desktop

tablet

mobile

Pay attention to:

container gutters

grid collapse

typography wrapping

image aspect ratios

button widths

section heights

navigation

overflow

sticky elements

modal/drawer behavior

Mobile should feel intentionally designed, not like a compressed desktop page.

22. Consistency vs Uniformity

Consistency means:

same visual language

related typography

related spacing rhythm

aligned content boundaries

related surfaces

related CTA language

consistent header/footer

consistent responsive behavior

Uniformity does NOT mean:

every page has the same layout

every card has the same radius

every section uses the same heading

every button looks identical

every page uses the same max-width

every component must use a shared abstraction

Preserve intentional differences.

23. Quality Gate for New Pages

Before considering a new page finished, ask:

Does it feel like DripHunter?

Does its main content align with the global system?

Is the typography hierarchy intentional?

Are spacing and widths deliberate?

Are CTAs using the correct visual role?

Are surfaces used appropriately?

Does mobile look designed rather than compressed?

Does dark mode look intentional?

Are existing reusable foundations being reused where appropriate?

Is any new visual pattern genuinely necessary?

If the answer is yes, the page is ready.

24. Final Design Principle

DripHunter should feel like ONE premium website, not a collection of unrelated templates.

Use the homepage as the visual north star.

Reuse the established design system.

Preserve intentional page-specific layouts.

Premium comes from:

Typography + spacing + imagery + hierarchy + restraint + interaction

—not from adding more components or more effects.

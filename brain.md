DripHunter — Project Architecture & Development Rules

1. Purpose

DripHunter is a premium streetwear e-commerce frontend. The project should feel like one cohesive product while allowing individual pages to have layouts appropriate to their purpose.

Primary rule: Reuse existing architecture first. Do not create abstractions just to increase component usage.

2. Architecture Source of Truth

Before implementing any new page or feature:

Inspect the existing repository structure.

Identify reusable components, layouts, hooks, contexts, utilities, and data/services.

Check whether an existing component already solves the problem.

Propose the implementation plan and affected files before making large architectural changes.

Preserve existing business logic and page-specific behavior.

Existing foundational components

PageContainer — global page/container width system

SectionHeading — major section heading typography

Surface — structural visual surfaces/panels

Button — existing shadcn button with variant="drip"

Input — existing input with variant="drip"

Dialog / Sheet / Drawer — existing overlay primitives

ProductCard — established product-card component

CarouselFoundation — shared carousel/scroll foundation

Navbar / Footer — global site navigation/footer

Existing contexts, hooks, utilities, and UI primitives should be reused where appropriate.

3. Container Rules

Use PageContainer when content follows the standard DripHunter page width.

Supported variants:

default — standard commerce/content width

reading — genuinely narrow reading content

dashboard — account/dashboard-style content

Do NOT force PageContainer onto:

full-bleed hero sections

intentionally full-width editorial sections

specialized split-screen layouts

intentionally narrow legal/reading layouts

dashboard structures where a different container is required

The goal is consistent alignment, not identical HTML structure.

4. Section Heading Rules

Use SectionHeading for genuine major/reusable section headings.

Available variants:

chaney

playfair

playfair-sm

sans

Use the variant that matches the visual role of the section.

Do NOT replace:

hero typography

product titles

card titles

highly specialized editorial headings

interactive showcase headings

just to increase component reuse.

Do not add unnecessary heading variants without a demonstrated need.

5. Surface Rules

Surface is a low-level structural visual foundation.

Use it for genuine page/panel surfaces such as:

checkout panels

account panels

structural forms

large empty-state containers

FAQ/structural content panels

Do NOT use it for:

ProductCard

CartItem

WishlistItem

individual list rows

buttons

inputs

badges

hero sections

promotional/editorial cards

every small box on a page

Do not turn Surface into a universal card component.

6. Button Rules

Use:

<Button variant="drip">

for genuine primary DripHunter CTAs that match the established visual language.

Use existing variants for intentional secondary/ghost/destructive/icon-only actions.

Do NOT change the default Button variant globally.

Do NOT migrate every <button> just for component usage.

Preserve specialized controls when their visual/function role is intentionally different.

7. Input Rules

Use:

<Input variant="drip" />

for standard DripHunter text/form inputs where appropriate.

Do not globally change the default Input appearance.

Do not force specialized controls such as:

payment controls

radio groups

checkboxes

custom selects

file upload controls

specialized search controls

into the standard Input component unless technically and visually appropriate.

8. Product Architecture

Do not create a UniversalProductCard.

Keep specialized components when their purpose/layout differs:

ProductCard

CartItem

WishlistItem

CuratedLookCard

editorial cards

recommendation cards

Focused product primitives may be reused where genuinely helpful:

ProductPrice

ProductRating

ProductBadge

ProductImage

Avoid giant components with many conditional props.

9. Header Architecture

Buyer and Seller navigation remain separate when their UX differs.

Share only genuine foundations, such as:

Logo styling

common navigation primitives

mobile-menu foundations

shared visual utilities

Do not merge Buyer and Seller headers into one giant conditional component.

10. Recommendation Sections

Recommendation sections may have different:

titles

card styles

aspect ratios

layouts

content types

Use shared foundations such as CarouselFoundation or GridFoundation only for genuinely repeated structural behavior.

Do not force every recommendation section into one identical component.

11. Content / Static Pages

Use shared structural layouts where appropriate, but allow page-specific content.

Examples:

About

Terms

Privacy

Shipping

Returns

Contact

Affiliate

Seller

Blog

Do not flatten distinct page structures into one generic page component.

12. Account / Dashboard Pages

Shared account navigation/layout is encouraged.

Keep content panels specialized when their data or interaction differs.

Do not force profile, orders, wallet, wishlist, or checkout into one generic dashboard component.

13. Business Logic Protection

During visual or architectural refactoring, do not unnecessarily modify:

state management

API calls

payment logic

cart logic

authentication

routing

form submission

validation

order processing

seller functionality

checkout flow

Separate visual refactoring from functional bug fixing.

14. Responsive Requirements

Every new or modified page must be checked for:

desktop

tablet

mobile

horizontal overflow

grid behavior

typography wrapping

button/input sizing

spacing

navigation behavior

dark mode

Do not assume desktop CSS automatically works on mobile.

15. Accessibility

Preserve or improve:

semantic HTML

keyboard navigation

focus states

accessible labels

dialog title/description

button/link semantics

image alt text

form validation messaging

Do not replace accessible primitives with hand-rolled equivalents without a strong reason.

16. Validation

After meaningful implementation changes run:

npm run build
npx tsc --noEmit
npm run lint

When reporting lint results, distinguish pre-existing issues from newly introduced issues.

Do not spend unrelated tasks fixing the established lint baseline unless specifically requested.

17. New Task Workflow

For every substantial new task:

NEW TASK
→ inspect architecture
→ identify reusable components
→ implementation plan
→ review/approval
→ code
→ build/typecheck/lint
→ responsive/functionality check
→ final report

Pre-coding instruction

Before coding, inspect the existing architecture and identify reusable components, primitives, layouts, hooks, and utilities that can be reused. Do not modify code yet. Show the implementation plan and affected files first.

Post-coding instruction

Validate the implementation with build, typecheck, lint, responsive behavior, functionality, accessibility, and business logic checks. Report changed files, reused/created components, validation results, and remaining issues. Do not start another task automatically.

18. Refactoring Stop Rule

Do not keep creating phases or abstractions indefinitely.

Create a new reusable component only when:

the pattern genuinely repeats,

the abstraction reduces meaningful duplication,

the API can remain simple,

and the abstraction does not erase intentional page differences.

If the architecture is already sufficient, stop refactoring and build the product.

19. Final Principle

Reuse where it improves the system. Preserve differences where they improve the experience.

DripHunter should remain:

one premium website, with different page layouts for different purposes.

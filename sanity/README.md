# Northern Dreamscape Sanity Model

This folder defines the CMS model for turning the site from a package-only site into a travel services marketplace.

## Main content types

- `package`: Full trips with day-by-day itinerary, linked hotels, vehicles, guides, restaurants, FAQs, media, reviews, and SEO.
- `accommodation`: Individual hotels, lodges, camps, room types, amenities, pricing, and gallery.
- `vehicle`: Individual bookable cars, jeeps, coasters, vans, route rules, seats, pricing, and gallery.
- `guide`: Individual guide profiles such as Sajid Sadpara, languages, specialties, certifications, pricing, and reviews.
- `restaurant`: Individual restaurants and group meal partners. Cuisine is structured in `cuisines` for filtering and SEO.
- `blogPost`: Rich SEO blog articles with author, related packages/services, FAQs, Portable Text, images, and video blocks.
- `review`: Reviews can reference any package or service.
- `bookingInquiry`: Lead capture for package and service bookings.

## SEO fields

Every major public document has:

- `seo.metaTitle`
- `seo.metaDescription`
- `seo.focusKeywords`
- `seo.canonicalUrl`
- `seo.ogImage`
- `seo.noIndex`
- `faqs`

Frontend helpers live in `lib/seo` for metadata and JSON-LD.

## Recommended next integration

1. Install Sanity packages:
   `npm install sanity @sanity/vision next-sanity @portabletext/react @sanity/image-url`
2. Set env values:
   `NEXT_PUBLIC_SANITY_PROJECT_ID`
   `NEXT_PUBLIC_SANITY_DATASET`
   `NEXT_PUBLIC_SANITY_API_VERSION`
3. Add scripts:
   `sanity dev`
   `sanity deploy`
4. Migrate existing `ND_PACKAGES` into Sanity documents.
5. Replace hardcoded arrays with queries from `lib/sanity/queries.js`.

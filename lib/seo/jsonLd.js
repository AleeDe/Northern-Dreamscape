function clean(value) {
  return JSON.parse(JSON.stringify(value, (_, item) => (item === undefined ? null : item)))
}

export function organizationJsonLd(settings) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: settings?.title || 'Northern Dreamscape',
    url: settings?.siteUrl,
    logo: settings?.logo?.asset?.url,
    email: settings?.contactEmail,
    telephone: settings?.whatsappNumber,
    sameAs: settings?.sameAs,
    address: settings?.officeLocation?.address,
  })
}

export function packageJsonLd(pkg, url) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: pkg?.title,
    description: pkg?.seo?.metaDescription || pkg?.summary || pkg?.subtitle,
    image: pkg?.heroImage?.asset?.url,
    url,
    touristType: [pkg?.difficulty, pkg?.season].filter(Boolean),
    itinerary: pkg?.itineraryDays?.map((day) => ({
      '@type': 'ItemList',
      name: `Day ${day.dayNumber}: ${day.title}`,
      description: day.summary,
      itemListElement: [
        day.routeFrom,
        day.locationName,
        day.routeTo,
      ].filter(Boolean).map((name, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {'@type': 'Place', name},
      })),
    })),
    offers: pkg?.pricing?.priceFrom ? {
      '@type': 'Offer',
      price: pkg.pricing.priceFrom,
      priceCurrency: pkg.pricing.currency || 'PKR',
      availability: 'https://schema.org/InStock',
    } : undefined,
    aggregateRating: pkg?.rating ? {
      '@type': 'AggregateRating',
      ratingValue: pkg.rating,
      reviewCount: pkg.reviewCount || 1,
    } : undefined,
  })
}

export function lodgingJsonLd(item, url) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: item?.name,
    description: item?.seo?.metaDescription || item?.shortDescription,
    image: item?.heroImage?.asset?.url,
    url,
    address: item?.location?.address,
    geo: item?.location?.geo ? {
      '@type': 'GeoCoordinates',
      latitude: item.location.geo.lat,
      longitude: item.location.geo.lng,
    } : undefined,
    amenityFeature: item?.amenities?.map((name) => ({'@type': 'LocationFeatureSpecification', name})),
    priceRange: item?.pricing?.priceFrom ? `${item.pricing.currency || 'PKR'} ${item.pricing.priceFrom}+` : undefined,
    aggregateRating: item?.rating ? {'@type': 'AggregateRating', ratingValue: item.rating, reviewCount: item.reviewCount || 1} : undefined,
  })
}

export function restaurantJsonLd(item, url) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: item?.name,
    servesCuisine: item?.cuisines,
    description: item?.seo?.metaDescription || item?.shortDescription,
    image: item?.heroImage?.asset?.url,
    url,
    address: item?.location?.address,
    menu: item?.menuImages?.[0]?.asset?.url,
    priceRange: item?.priceRange,
    openingHours: item?.openingHours?.map((hours) => `${hours.days} ${hours.opens}-${hours.closes}`),
    aggregateRating: item?.rating ? {'@type': 'AggregateRating', ratingValue: item.rating, reviewCount: item.reviewCount || 1} : undefined,
  })
}

export function articleJsonLd(post, url) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post?.title,
    description: post?.seo?.metaDescription || post?.excerpt,
    image: post?.heroImage?.asset?.url,
    datePublished: post?.publishedAt,
    dateModified: post?.updatedAt || post?.publishedAt,
    url,
    author: post?.author ? {
      '@type': 'Person',
      name: post.author.name,
      sameAs: post.author.sameAs,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Northern Dreamscape',
    },
  })
}

export function faqJsonLd(faqs = []) {
  if (!faqs.length) return null
  return clean({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  })
}

export function breadcrumbJsonLd(items) {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  })
}

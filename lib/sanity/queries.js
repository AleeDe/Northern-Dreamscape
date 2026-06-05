import {groq} from 'next-sanity'

export const imageFields = groq`
  ...,
  asset->{
    _id,
    url,
    metadata { dimensions, lqip }
  }
`

export const seoFields = groq`
  seo {
    metaTitle,
    metaDescription,
    focusKeywords,
    canonicalUrl,
    noIndex,
    ogImage { ${imageFields} }
  }
`

export const serviceCardFields = groq`
  _id,
  _type,
  name,
  title,
  "slug": slug.current,
  type,
  category,
  cuisines,
  location,
  pricing,
  rating,
  reviewCount,
  heroImage { ${imageFields} }
`

export const packageCardFields = groq`
  _id,
  title,
  subtitle,
  summary,
  "slug": slug.current,
  region,
  days,
  nights,
  difficulty,
  season,
  pricing,
  rating,
  reviewCount,
  spotsLeft,
  featured,
  heroImage { ${imageFields} },
  highlights
`

export const featuredHomeQuery = groq`
{
  "packages": *[_type == "package" && status == "live" && showOnHome == true] | order(priority asc)[0...6] {
    ${packageCardFields}
  },
  "accommodations": *[_type == "accommodation" && status == "live" && featured == true] | order(name asc)[0...6] {
    ${serviceCardFields}
  },
  "vehicles": *[_type == "vehicle" && status == "live" && featured == true] | order(name asc)[0...6] {
    ${serviceCardFields}
  },
  "guides": *[_type == "guide" && status == "live" && featured == true] | order(name asc)[0...6] {
    ${serviceCardFields}
  },
  "restaurants": *[_type == "restaurant" && status == "live" && featured == true] | order(name asc)[0...6] {
    ${serviceCardFields}
  }
}
`

export const packagesQuery = groq`
  *[_type == "package" && status == "live"] | order(priority asc, title asc) {
    ${packageCardFields}
  }
`

export const packageBySlugQuery = groq`
  *[_type == "package" && slug.current == $slug && status == "live"][0] {
    ${packageCardFields},
    description,
    included,
    excluded,
    gallery[] { ${imageFields} },
    video,
    faqs,
    ${seoFields},
    destination->{_id, name, "slug": slug.current, location},
    itineraryDays[] {
      ...,
      accommodation->{${serviceCardFields}},
      vehicle->{${serviceCardFields}},
      guide->{${serviceCardFields}},
      restaurants[]->{${serviceCardFields}},
      gallery[] { ${imageFields} }
    },
    accommodations[]->{${serviceCardFields}},
    vehicles[]->{${serviceCardFields}},
    guides[]->{${serviceCardFields}},
    restaurants[]->{${serviceCardFields}}
  }
`

export const servicesByTypeQuery = groq`
  *[_type == $type && status == "live" && bookable == true] | order(featured desc, name asc) {
    ${serviceCardFields},
    shortDescription,
    amenities,
    features,
    mealTypes,
    priceRange,
    languages,
    specialties,
    highlights,
    featured,
    gallery[0...3] { ${imageFields} },
    portrait { ${imageFields} }
  }
`

export const featuredServicesQuery = groq`
{
  "accommodations": *[_type == "accommodation" && status == "live" && featured == true] | order(rating desc)[0...4] {
    ${serviceCardFields}, shortDescription, highlights, rating, reviewCount, featured
  },
  "vehicles": *[_type == "vehicle" && status == "live" && featured == true] | order(rating desc)[0...4] {
    ${serviceCardFields}, shortDescription, highlights, seats, withDriver, fuelIncluded, featured
  },
  "guides": *[_type == "guide" && status == "live" && featured == true] | order(rating desc)[0...4] {
    ${serviceCardFields}, shortDescription, highlights, experienceYears, totalTours, languages, portrait { ${imageFields} }, featured
  },
  "restaurants": *[_type == "restaurant" && status == "live" && featured == true] | order(rating desc)[0...4] {
    ${serviceCardFields}, shortDescription, highlights, cuisines, mealTypes, priceRange, featured
  }
}`

export const serviceBySlugQuery = groq`
  *[_type == $type && slug.current == $slug && status == "live"][0] {
    ${serviceCardFields},
    shortDescription,
    description,
    amenities,
    features,
    highlights,
    included,
    excluded,
    cancellationPolicy,
    roomTypes,
    houseRules,
    checkInTime,
    checkOutTime,
    mealTypes,
    menuHighlights,
    menuImages[] { ${imageFields} },
    goodFor,
    openingHours,
    seatingCapacity,
    reservationRequired,
    dietaryOptions,
    languages,
    specialties,
    certifications,
    experienceYears,
    totalTours,
    availability,
    withDriver,
    fuelIncluded,
    acAvailable,
    insuranceIncluded,
    seats,
    doors,
    luggageCapacity,
    routesAllowed,
    model,
    bio,
    portrait { ${imageFields} },
    gallery[] { ${imageFields} },
    video,
    faqs,
    ${seoFields},
    "reviews": *[_type == "review" && references(^._id)] | order(reviewDate desc)[0...8] {
      _id,
      reviewerName,
      rating,
      reviewText,
      reviewDate,
      verified
    }
  }
`

export const blogPostsQuery = groq`
  *[_type == "blogPost" && status == "live"] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    category,
    publishedAt,
    updatedAt,
    "slug": slug.current,
    heroImage { ${imageFields} },
    author->{name, role, avatar { ${imageFields} }}
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug && status == "live"][0] {
    _id,
    title,
    excerpt,
    category,
    publishedAt,
    updatedAt,
    "slug": slug.current,
    heroImage { ${imageFields} },
    content,
    faqs,
    ${seoFields},
    author->{name, role, bio, expertise, sameAs, avatar { ${imageFields} }},
    relatedDestinations[]->{name, "slug": slug.current, heroImage { ${imageFields} }},
    relatedPackages[]->{${packageCardFields}},
    relatedServices[]->{${serviceCardFields}}
  }
`

export const destinationsQuery = groq`
  *[_type == "destination" && status == "live"] | order(featured desc, name asc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    bestSeason,
    elevationRange,
    summary,
    featured,
    heroImage { ${imageFields} },
    "packageCount": count(*[_type == "package" && references(^._id) && status == "live"])
  }
`

export const destinationBySlugQuery = groq`
  *[_type == "destination" && slug.current == $slug && status == "live"][0] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    bestSeason,
    elevationRange,
    climate,
    travelTime,
    summary,
    content,
    featured,
    heroImage { ${imageFields} },
    gallery[] {
      caption,
      image { ${imageFields} }
    },
    videos[] {
      title,
      youtubeUrl,
      vimeoUrl,
      caption
    },
    famousPlaces[] {
      name,
      description,
      category,
      elevation,
      mapsLink,
      image { ${imageFields} }
    },
    accommodations[]->{ ${serviceCardFields}, shortDescription, highlights, amenities },
    restaurants[]->{ ${serviceCardFields}, shortDescription, cuisines, priceRange, openingHours },
    guides[]->{ ${serviceCardFields}, shortDescription, languages, experienceYears, portrait { ${imageFields} } },
    vehicles[]->{ ${serviceCardFields}, shortDescription, seats, withDriver, fuelIncluded },
    faqs,
    ${seoFields},
    "packages": *[_type == "package" && references(^._id) && status == "live"] | order(priority asc) {
      ${packageCardFields}
    }
  }
`

export const homeQuery = groq`
{
  "packages": *[_type == "package" && status == "live" && showOnHome == true] | order(priority asc)[0...6] {
    ${packageCardFields}
  },
  "destinations": *[_type == "destination" && status == "live" && featured == true] | order(name asc)[0...6] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    summary,
    heroImage { ${imageFields} }
  },
  "featuredPosts": *[_type == "blogPost" && status == "live" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    excerpt,
    category,
    publishedAt,
    "slug": slug.current,
    heroImage { ${imageFields} }
  }
}`

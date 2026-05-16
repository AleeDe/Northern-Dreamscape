export function buildMetadata({title, description, seo, fallbackImage, url}) {
  const metaTitle = seo?.metaTitle || title
  const metaDescription = seo?.metaDescription || description
  const image = seo?.ogImage?.asset?.url || fallbackImage?.asset?.url || fallbackImage?.url

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: seo?.canonicalUrl || url ? {canonical: seo?.canonicalUrl || url} : undefined,
    robots: seo?.noIndex ? {index: false, follow: false} : undefined,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: seo?.canonicalUrl || url,
      images: image ? [{url: image, alt: seo?.ogImage?.alt || title}] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: metaTitle,
      description: metaDescription,
      images: image ? [image] : undefined,
    },
  }
}

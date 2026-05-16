import {SanityServiceListingPage} from '@/components/sanity-pages'
import {sanityFetch} from '@/lib/sanity/fetch'
import {servicesByTypeQuery} from '@/lib/sanity/queries'

export default async function Page() {
  const items = await sanityFetch({query: servicesByTypeQuery, params: {type: 'restaurant'}})
  return (
    <SanityServiceListingPage
      title="Restaurants."
      eyebrow="Cuisine · group meals"
      description="Book meal partners by cuisine, location, menu highlights and group suitability. Cuisine is structured for filtering and SEO."
      items={items}
      servicePath="/restaurants"
    />
  )
}

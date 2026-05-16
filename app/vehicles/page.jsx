import {SanityServiceListingPage} from '@/components/sanity-pages'
import {sanityFetch} from '@/lib/sanity/fetch'
import {servicesByTypeQuery} from '@/lib/sanity/queries'

export default async function Page() {
  const items = await sanityFetch({query: servicesByTypeQuery, params: {type: 'vehicle'}})
  return (
    <SanityServiceListingPage
      title="Vehicles."
      eyebrow="4x4 · coaster · pickup"
      description="Book individual cars, jeeps, coasters and airport transfers with route-specific details, seats, driver and pricing."
      items={items}
      servicePath="/vehicles"
    />
  )
}

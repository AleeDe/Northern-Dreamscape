import {SanityServiceListingPage} from '@/components/sanity-pages'
import {sanityFetch} from '@/lib/sanity/fetch'
import {servicesByTypeQuery} from '@/lib/sanity/queries'

export default async function Page() {
  const items = await sanityFetch({query: servicesByTypeQuery, params: {type: 'accommodation'}})
  return (
    <SanityServiceListingPage
      title="Accommodation."
      eyebrow="Hotels · lodges · camps"
      description="Book individual hotels, lodges, camps and guesthouses, or attach them to complete packages from Sanity."
      items={items}
      servicePath="/accommodation"
    />
  )
}

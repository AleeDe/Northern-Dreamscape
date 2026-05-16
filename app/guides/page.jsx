import {SanityServiceListingPage} from '@/components/sanity-pages'
import {sanityFetch} from '@/lib/sanity/fetch'
import {servicesByTypeQuery} from '@/lib/sanity/queries'

export default async function Page() {
  const items = await sanityFetch({query: servicesByTypeQuery, params: {type: 'guide'}})
  return (
    <SanityServiceListingPage
      title="Tour guides."
      eyebrow="Local experts"
      description="Book individual guides by language, region, specialty, experience and profile instead of only showing generic guide service cards."
      items={items}
      servicePath="/guides"
    />
  )
}

import {SanityDestinationsPage} from '@/components/sanity-pages'
import {sanityFetch} from '@/lib/sanity/fetch'
import {destinationsQuery} from '@/lib/sanity/queries'

export default async function Page() {
  const destinations = await sanityFetch({query: destinationsQuery})
  return <SanityDestinationsPage destinations={destinations} />
}

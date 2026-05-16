import {SanityDestinationDetailPage} from '@/components/sanity-pages'
import {sanityFetch} from '@/lib/sanity/fetch'
import {destinationBySlugQuery} from '@/lib/sanity/queries'

export default async function Page({params}) {
  const {id} = await params
  const destination = await sanityFetch({query: destinationBySlugQuery, params: {slug: id}})
  return <SanityDestinationDetailPage destination={destination} />
}

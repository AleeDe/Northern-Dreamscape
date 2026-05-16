import {SanityServiceDetailPage} from '@/components/sanity-pages'
import {sanityFetch} from '@/lib/sanity/fetch'
import {serviceBySlugQuery} from '@/lib/sanity/queries'

export default async function Page({params}) {
  const {id} = await params
  const item = await sanityFetch({query: serviceBySlugQuery, params: {type: 'restaurant', slug: id}})
  return <SanityServiceDetailPage item={item} backHref="/restaurants" backLabel="All restaurants" />
}

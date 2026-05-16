import {SanityJournalDetailPage} from '@/components/sanity-pages'
import {sanityFetch} from '@/lib/sanity/fetch'
import {blogPostBySlugQuery} from '@/lib/sanity/queries'

export default async function Page({params}) {
  const {id} = await params
  const post = await sanityFetch({query: blogPostBySlugQuery, params: {slug: id}})
  return <SanityJournalDetailPage post={post} />
}

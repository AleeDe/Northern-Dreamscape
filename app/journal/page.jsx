import {SanityJournalPage} from '@/components/sanity-pages'
import {sanityFetch} from '@/lib/sanity/fetch'
import {blogPostsQuery} from '@/lib/sanity/queries'

export default async function Page() {
  const posts = await sanityFetch({query: blogPostsQuery})
  return <SanityJournalPage posts={posts} />
}

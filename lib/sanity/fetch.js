import {sanityClient} from './client'

export const isSanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)

export async function sanityFetch({query, params = {}}) {
  if (!isSanityConfigured) return null
  return sanityClient.fetch(query, params)
}

import {createClient} from 'next-sanity'

export const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'k6sihcqo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-15',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
})

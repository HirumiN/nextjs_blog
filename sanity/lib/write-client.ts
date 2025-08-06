import "server-only"

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const writeCLient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
    token,
})

if(!writeCLient.config().token) {
  throw new Error(
    'Missing environment variable: SANITY_WRITE_TOKEN. Please set it in your .env file.'
  )
}
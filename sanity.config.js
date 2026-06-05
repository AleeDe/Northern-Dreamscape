import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'k6sihcqo'
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET    || 'production'

const structure = (S) =>
  S.list()
    .title('Northern Dreamscape')
    .items([

      S.listItem().title('📦 Packages').schemaType('package').child(
        S.documentTypeList('package').title('Packages')
      ),

      S.divider(),

      S.listItem().title('🗺️ Destinations').schemaType('destination').child(
        S.documentTypeList('destination').title('Destinations')
      ),

      S.listItem().title('📍 Famous Places & Landmarks').schemaType('landmark').child(
        S.documentTypeList('landmark').title('Famous Places & Landmarks')
      ),

      S.divider(),

      S.listItem().title('🏨 Accommodation').schemaType('accommodation').child(
        S.documentTypeList('accommodation').title('Accommodation')
      ),

      S.listItem().title('🚙 Vehicles').schemaType('vehicle').child(
        S.documentTypeList('vehicle').title('Vehicles')
      ),

      S.listItem().title('🧭 Tour Guides').schemaType('guide').child(
        S.documentTypeList('guide').title('Tour Guides')
      ),

      S.listItem().title('🍽️ Restaurants').schemaType('restaurant').child(
        S.documentTypeList('restaurant').title('Restaurants')
      ),

      S.divider(),

      S.listItem().title('📋 Booking Inquiries').schemaType('bookingInquiry').child(
        S.documentTypeList('bookingInquiry').title('Booking Inquiries')
      ),

      S.listItem().title('⭐ Reviews').schemaType('review').child(
        S.documentTypeList('review').title('Reviews')
      ),

      S.divider(),

      S.listItem().title('📝 Journal / Blog').schemaType('blogPost').child(
        S.documentTypeList('blogPost').title('Blog Posts')
      ),

      S.listItem().title('✍️ Authors').schemaType('author').child(
        S.documentTypeList('author').title('Authors')
      ),

      S.divider(),

      S.listItem().title('⚙️ Site Settings').schemaType('siteSettings').child(
        S.documentTypeList('siteSettings').title('Site Settings')
      ),

    ])

export default defineConfig({
  name: 'northern-dreamscape',
  title: 'Northern Dreamscape',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})

import {defineField, defineType} from 'sanity'

export const locationType = defineType({
  name: 'location',
  title: 'Location',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Place name', type: 'string'}),
    defineField({name: 'address', title: 'Address', type: 'text', rows: 2}),
    defineField({name: 'city', title: 'City / town', type: 'string'}),
    defineField({name: 'region', title: 'Region', type: 'string'}),
    defineField({name: 'country', title: 'Country', type: 'string', initialValue: 'Pakistan'}),
    defineField({name: 'geo', title: 'Map coordinates', type: 'geopoint'}),
    defineField({name: 'googleMapsUrl', title: 'Google Maps URL', type: 'url'}),
  ],
})

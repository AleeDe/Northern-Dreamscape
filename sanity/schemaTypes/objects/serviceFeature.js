import {defineField, defineType} from 'sanity'

export const serviceFeatureType = defineType({
  name: 'serviceFeature',
  title: 'Feature',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'description', title: 'Description', type: 'text', rows: 2}),
  ],
})

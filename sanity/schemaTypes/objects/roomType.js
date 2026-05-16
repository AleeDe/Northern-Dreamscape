import {defineField, defineType} from 'sanity'

export const roomTypeType = defineType({
  name: 'roomType',
  title: 'Room type',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Room name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'capacity', title: 'Capacity', type: 'number', validation: (Rule) => Rule.min(1)}),
    defineField({name: 'beds', title: 'Beds', type: 'string'}),
    defineField({name: 'pricing', title: 'Pricing', type: 'pricing'}),
    defineField({name: 'amenities', title: 'Amenities', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}}),
    defineField({name: 'images', title: 'Room images', type: 'array', of: [{type: 'mediaImage'}]}),
  ],
})

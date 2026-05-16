import {defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Authors',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'name', maxLength: 96}, validation: (Rule) => Rule.required()}),
    defineField({name: 'role', title: 'Role', type: 'string'}),
    defineField({name: 'avatar', title: 'Avatar', type: 'mediaImage'}),
    defineField({name: 'bio', title: 'Bio', type: 'text', rows: 4}),
    defineField({name: 'expertise', title: 'Expertise', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}}),
    defineField({name: 'sameAs', title: 'Profile links', type: 'array', of: [{type: 'url'}]}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'avatar'},
  },
})

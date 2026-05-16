import {defineField, defineType} from 'sanity'

export const destinationType = defineType({
  name: 'destination',
  title: 'Destinations',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', group: 'content', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', group: 'content', options: {source: 'name', maxLength: 96}, validation: (Rule) => Rule.required()}),
    defineField({name: 'tagline', title: 'Tagline', type: 'string', group: 'content'}),
    defineField({name: 'location', title: 'Location', type: 'location', group: 'content'}),
    defineField({name: 'bestSeason', title: 'Best season', type: 'string', group: 'content'}),
    defineField({name: 'elevationRange', title: 'Elevation range', type: 'string', group: 'content'}),
    defineField({name: 'summary', title: 'Summary', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'content', title: 'Rich content', type: 'portableContent', group: 'content'}),
    defineField({name: 'heroImage', title: 'Hero image', type: 'mediaImage', group: 'content'}),
    defineField({name: 'gallery', title: 'Gallery', type: 'array', of: [{type: 'mediaImage'}], group: 'content'}),
    defineField({name: 'faqs', title: 'FAQs', type: 'array', of: [{type: 'faqItem'}], group: 'seo'}),
    defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: 'seo'}),
    defineField({name: 'featured', title: 'Featured', type: 'boolean', initialValue: false, group: 'settings'}),
    defineField({name: 'status', title: 'Status', type: 'string', initialValue: 'draft', group: 'settings', options: {list: ['draft', 'live', 'hidden']}}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'tagline', media: 'heroImage'},
  },
})

import {defineField, defineType} from 'sanity'

export const blogPostType = defineType({
  name: 'blogPost',
  title: 'Blog posts',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', group: 'content', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', group: 'content', options: {source: 'title', maxLength: 96}, validation: (Rule) => Rule.required()}),
    defineField({name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3, group: 'content'}),
    defineField({name: 'category', title: 'Category', type: 'string', group: 'content', options: {list: ['Guide', 'Practical', 'Story', 'Destination', 'Safety', 'Food', 'Packing', 'News']}}),
    defineField({name: 'author', title: 'Author', type: 'reference', to: [{type: 'author'}, {type: 'guide'}], group: 'content'}),
    defineField({name: 'publishedAt', title: 'Published at', type: 'datetime', group: 'content'}),
    defineField({name: 'updatedAt', title: 'Updated at', type: 'datetime', group: 'content'}),
    defineField({name: 'heroImage', title: 'Hero image', type: 'mediaImage', group: 'content'}),
    defineField({name: 'content', title: 'Article body', type: 'portableContent', group: 'content', validation: (Rule) => Rule.required()}),
    defineField({name: 'relatedDestinations', title: 'Related destinations', type: 'array', of: [{type: 'reference', to: [{type: 'destination'}]}], group: 'content'}),
    defineField({name: 'relatedPackages', title: 'Related packages', type: 'array', of: [{type: 'reference', to: [{type: 'package'}]}], group: 'content'}),
    defineField({name: 'relatedServices', title: 'Related services', type: 'array', of: [{type: 'reference', to: [{type: 'accommodation'}, {type: 'vehicle'}, {type: 'guide'}, {type: 'restaurant'}]}], group: 'content'}),
    defineField({name: 'faqs', title: 'Article FAQs', type: 'array', of: [{type: 'faqItem'}], group: 'seo'}),
    defineField({name: 'seo', title: 'SEO', type: 'seoFields', group: 'seo'}),
    defineField({name: 'featured', title: 'Featured', type: 'boolean', initialValue: false, group: 'settings'}),
    defineField({name: 'status', title: 'Status', type: 'string', initialValue: 'draft', group: 'settings', options: {list: ['draft', 'live', 'hidden']}}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'heroImage'},
  },
})

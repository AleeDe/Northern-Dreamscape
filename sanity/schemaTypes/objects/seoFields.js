import {defineField, defineType} from 'sanity'

export const seoFieldsType = defineType({
  name: 'seoFields',
  title: 'SEO',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'Aim for 45-60 characters. Use the main search intent first.',
      validation: (Rule) => Rule.max(65).warning('Long titles may be truncated in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Aim for 140-160 characters. Include destination, service type, and trust signal.',
      validation: (Rule) => Rule.max(170).warning('Long descriptions may be truncated.'),
    }),
    defineField({
      name: 'focusKeywords',
      title: 'Focus keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'Internal planning only. Do not keyword-stuff content.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'mediaImage',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

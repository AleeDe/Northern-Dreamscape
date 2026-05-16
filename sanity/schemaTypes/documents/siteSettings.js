import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Site title', type: 'string'}),
    defineField({name: 'description', title: 'Site description', type: 'text', rows: 3}),
    defineField({name: 'siteUrl', title: 'Site URL', type: 'url'}),
    defineField({name: 'logo', title: 'Logo', type: 'mediaImage'}),
    defineField({name: 'defaultSeoImage', title: 'Default SEO image', type: 'mediaImage'}),
    defineField({name: 'whatsappNumber', title: 'WhatsApp number', type: 'string'}),
    defineField({name: 'contactEmail', title: 'Contact email', type: 'string'}),
    defineField({name: 'officeLocation', title: 'Office location', type: 'location'}),
    defineField({name: 'sameAs', title: 'Social profile URLs', type: 'array', of: [{type: 'url'}]}),
  ],
})

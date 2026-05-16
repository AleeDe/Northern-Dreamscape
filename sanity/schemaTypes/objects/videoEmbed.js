import {defineField, defineType} from 'sanity'

export const videoEmbedType = defineType({
  name: 'videoEmbed',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Video title', type: 'string'}),
    defineField({
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or hosted video URL.',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({name: 'thumbnail', title: 'Thumbnail', type: 'mediaImage'}),
  ],
})

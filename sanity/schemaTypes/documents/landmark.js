import {defineField, defineType} from 'sanity'

export const landmarkType = defineType({
  name: 'landmark',
  title: 'Famous Places & Landmarks',
  type: 'document',
  groups: [
    {name: 'content',  title: '📝 Content',  default: true},
    {name: 'media',    title: '🖼️ Media'},
    {name: 'settings', title: '⚙️ Settings'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Place Name',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: '⛰️  Mountain / Peak',   value: 'mountain'},
          {title: '🏞️  Lake / River',       value: 'lake'},
          {title: '🌄  Valley',             value: 'valley'},
          {title: '🏯  Fort / Historical',  value: 'fort'},
          {title: '🏘️  Village',            value: 'village'},
          {title: '🛤️  Pass / Route',       value: 'pass'},
          {title: '🧊  Glacier',            value: 'glacier'},
          {title: '🌿  Park / Reserve',     value: 'park'},
          {title: '📍  Other',             value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'content',
    }),
    defineField({
      name: 'elevation',
      title: 'Elevation (metres)',
      type: 'number',
      group: 'content',
    }),
    defineField({
      name: 'mapsLink',
      title: 'Google Maps Link',
      type: 'url',
      group: 'content',
    }),
    defineField({
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'travelTip',
      title: 'Travel Tip',
      type: 'text',
      rows: 2,
      group: 'content',
    }),

    // Which destination(s) this landmark belongs to
    defineField({
      name: 'destinations',
      title: 'Destinations',
      description: 'Which destination(s) this place is part of',
      type: 'array',
      group: 'settings',
      of: [{type: 'reference', to: [{type: 'destination'}]}],
    }),

    // Media
    defineField({
      name: 'heroImage',
      title: 'Main Photo',
      type: 'mediaImage',
      group: 'media',
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      group: 'media',
      of: [{type: 'mediaImage'}],
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'live',
      group: 'settings',
      options: {list: ['draft', 'live', 'hidden']},
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'heroImage',
    },
    prepare({title, subtitle, media}) {
      const icons = {mountain:'⛰️', lake:'🏞️', valley:'🌄', fort:'🏯', village:'🏘️', pass:'🛤️', glacier:'🧊', park:'🌿', other:'📍'}
      return {
        title: `${icons[subtitle] || '📍'} ${title}`,
        subtitle: subtitle || 'landmark',
        media,
      }
    },
  },
})

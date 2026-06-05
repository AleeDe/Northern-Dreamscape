import {defineField, defineType} from 'sanity'

export const destinationType = defineType({
  name: 'destination',
  title: 'Destinations',
  type: 'document',
  groups: [
    {name: 'content',  title: '📝 Content',  default: true},
    {name: 'media',    title: '🖼️ Media'},
    {name: 'places',   title: '📍 Famous Places'},
    {name: 'services', title: '🔗 Linked Services'},
    {name: 'seo',      title: '🔍 SEO & FAQs'},
    {name: 'settings', title: '⚙️ Settings'},
  ],
  fields: [
    // ── Basic info ───────────────────────────────────────────────────────────
    defineField({name: 'name',           title: 'Name',           type: 'string',       group: 'content', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug',           title: 'Slug',           type: 'slug',         group: 'content', options: {source: 'name', maxLength: 96}, validation: (Rule) => Rule.required()}),
    defineField({name: 'tagline',        title: 'Tagline',        type: 'string',       group: 'content'}),
    defineField({name: 'summary',        title: 'Summary',        type: 'text', rows: 4, group: 'content'}),
    defineField({name: 'content',        title: 'Rich Content',   type: 'portableContent', group: 'content'}),
    defineField({name: 'location',       title: 'Location',       type: 'location',     group: 'content'}),
    defineField({name: 'bestSeason',     title: 'Best Season',    type: 'string',       group: 'content'}),
    defineField({name: 'elevationRange', title: 'Elevation Range',type: 'string',       group: 'content'}),
    defineField({name: 'climate',        title: 'Climate',        type: 'string',       group: 'content'}),
    defineField({name: 'travelTime',     title: 'Travel Time from Islamabad', type: 'string', group: 'content'}),

    // ── Media ────────────────────────────────────────────────────────────────
    defineField({name: 'heroImage', title: 'Hero Image', type: 'mediaImage', group: 'media'}),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      group: 'media',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'image',   title: 'Image',   type: 'mediaImage'}),
          defineField({name: 'caption', title: 'Caption', type: 'string'}),
        ],
        preview: {select: {media: 'image', title: 'caption'}},
      }],
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      group: 'media',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'title',      title: 'Video Title',  type: 'string'}),
          defineField({name: 'youtubeUrl', title: 'YouTube URL',  type: 'url'}),
          defineField({name: 'vimeoUrl',   title: 'Vimeo URL',    type: 'url'}),
          defineField({name: 'caption',    title: 'Caption',      type: 'string'}),
        ],
        preview: {select: {title: 'title', subtitle: 'youtubeUrl'}},
      }],
    }),

    // ── Famous Locations / Landmarks ─────────────────────────────────────────
    defineField({
      name: 'famousPlaces',
      title: 'Famous Places & Landmarks',
      type: 'array',
      group: 'places',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'name',        title: 'Place Name',    type: 'string', validation: (Rule) => Rule.required()}),
          defineField({name: 'description', title: 'Description',   type: 'text', rows: 2}),
          defineField({name: 'image',       title: 'Photo',         type: 'mediaImage'}),
          defineField({name: 'category',    title: 'Category',      type: 'string', options: {list: [
            {title: 'Mountain / Peak',   value: 'mountain'},
            {title: 'Lake / River',      value: 'lake'},
            {title: 'Valley',            value: 'valley'},
            {title: 'Fort / Historical', value: 'fort'},
            {title: 'Village',           value: 'village'},
            {title: 'Pass / Route',      value: 'pass'},
            {title: 'Glacier',           value: 'glacier'},
            {title: 'Other',             value: 'other'},
          ]}}),
          defineField({name: 'elevation',   title: 'Elevation (m)', type: 'number'}),
          defineField({name: 'mapsLink',    title: 'Google Maps Link', type: 'url'}),
        ],
        preview: {select: {title: 'name', subtitle: 'category', media: 'image'}},
      }],
    }),

    // ── Linked Services ───────────────────────────────────────────────────────
    defineField({
      name: 'accommodations',
      title: 'Accommodations in this Destination',
      type: 'array',
      group: 'services',
      of: [{type: 'reference', to: [{type: 'accommodation'}]}],
    }),
    defineField({
      name: 'restaurants',
      title: 'Restaurants in this Destination',
      type: 'array',
      group: 'services',
      of: [{type: 'reference', to: [{type: 'restaurant'}]}],
    }),
    defineField({
      name: 'guides',
      title: 'Tour Guides for this Destination',
      type: 'array',
      group: 'services',
      of: [{type: 'reference', to: [{type: 'guide'}]}],
    }),
    defineField({
      name: 'vehicles',
      title: 'Vehicles available here',
      type: 'array',
      group: 'services',
      of: [{type: 'reference', to: [{type: 'vehicle'}]}],
    }),

    // ── SEO & FAQs ────────────────────────────────────────────────────────────
    defineField({name: 'faqs', title: 'FAQs', type: 'array', of: [{type: 'faqItem'}], group: 'seo'}),
    defineField({name: 'seo',  title: 'SEO',  type: 'seoFields', group: 'seo'}),

    // ── Settings ─────────────────────────────────────────────────────────────
    defineField({name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false, group: 'settings'}),
    defineField({name: 'status',   title: 'Status', type: 'string', initialValue: 'draft', group: 'settings', options: {list: ['draft', 'live', 'hidden']}}),
  ],

  preview: {
    select: {title: 'name', subtitle: 'tagline', media: 'heroImage'},
  },
})

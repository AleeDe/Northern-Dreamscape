import {defineField, defineType} from 'sanity'

export const reviewType = defineType({
  name: 'review',
  title: 'Reviews',
  type: 'document',
  fields: [
    defineField({name: 'reviewerName', title: 'Reviewer name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'rating', title: 'Rating', type: 'number', validation: (Rule) => Rule.required().min(1).max(5)}),
    defineField({name: 'reviewText', title: 'Review text', type: 'text', rows: 5, validation: (Rule) => Rule.required()}),
    defineField({name: 'reviewDate', title: 'Review date', type: 'date'}),
    defineField({name: 'verified', title: 'Verified booking', type: 'boolean', initialValue: false}),
    defineField({name: 'photo', title: 'Reviewer photo / trip image', type: 'mediaImage'}),
    defineField({
      name: 'relatedTo',
      title: 'Related item',
      type: 'reference',
      to: [{type: 'package'}, {type: 'accommodation'}, {type: 'vehicle'}, {type: 'guide'}, {type: 'restaurant'}],
    }),
  ],
  preview: {
    select: {title: 'reviewerName', rating: 'rating', subtitle: 'reviewText', media: 'photo'},
    prepare({title, rating, subtitle, media}) {
      return {title: `${title} · ${rating || '?'} stars`, subtitle, media}
    },
  },
})

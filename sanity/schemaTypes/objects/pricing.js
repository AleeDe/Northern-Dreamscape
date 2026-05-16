import {defineField, defineType} from 'sanity'

export const pricingType = defineType({
  name: 'pricing',
  title: 'Pricing',
  type: 'object',
  fields: [
    defineField({
      name: 'priceFrom',
      title: 'Price from',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'PKR',
      options: {
        list: [
          {title: 'PKR', value: 'PKR'},
          {title: 'USD', value: 'USD'},
          {title: 'EUR', value: 'EUR'},
          {title: 'GBP', value: 'GBP'},
        ],
      },
    }),
    defineField({
      name: 'unit',
      title: 'Price unit',
      type: 'string',
      options: {
        list: [
          {title: 'Per person', value: 'per_person'},
          {title: 'Per day', value: 'per_day'},
          {title: 'Per night', value: 'per_night'},
          {title: 'Per route', value: 'per_route'},
          {title: 'Custom quote', value: 'custom_quote'},
        ],
      },
    }),
    defineField({
      name: 'priceNote',
      title: 'Price note',
      type: 'string',
      description: 'Example: Includes driver, fuel, tolls and parking.',
    }),
  ],
})

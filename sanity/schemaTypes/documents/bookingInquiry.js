import {defineField, defineType} from 'sanity'

export const bookingInquiryType = defineType({
  name: 'bookingInquiry',
  title: 'Booking inquiries',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Customer name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({name: 'whatsapp', title: 'WhatsApp', type: 'string'}),
    defineField({name: 'serviceType', title: 'Service type', type: 'string', options: {list: ['package', 'accommodation', 'vehicle', 'guide', 'restaurant', 'custom_trip']}}),
    defineField({
      name: 'requestedItem',
      title: 'Requested item',
      type: 'reference',
      to: [{type: 'package'}, {type: 'accommodation'}, {type: 'vehicle'}, {type: 'guide'}, {type: 'restaurant'}],
    }),
    defineField({name: 'travelDate', title: 'Travel date', type: 'date'}),
    defineField({name: 'guests', title: 'Guests', type: 'number', validation: (Rule) => Rule.min(1)}),
    defineField({name: 'message', title: 'Message', type: 'text', rows: 5}),
    defineField({name: 'sourceUrl', title: 'Source URL', type: 'url'}),
    defineField({name: 'status', title: 'Lead status', type: 'string', initialValue: 'new', options: {list: ['new', 'contacted', 'quoted', 'confirmed', 'cancelled']}}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'serviceType'},
  },
})

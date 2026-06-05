import {defineField, defineType} from 'sanity'

export const bookingInquiryType = defineType({
  name: 'bookingInquiry',
  title: 'Booking Inquiries',
  type: 'document',
  fields: [
    defineField({
      name: 'bookingRef',
      title: 'Booking Reference',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          {title: '🆕 New', value: 'new'},
          {title: '📞 Contacted', value: 'contacted'},
          {title: '💬 Quoted', value: 'quoted'},
          {title: '✅ Confirmed', value: 'confirmed'},
          {title: '❌ Cancelled', value: 'cancelled'},
        ],
      },
    }),

    // ── What they're booking ──────────────────────────────────────
    defineField({
      name: 'serviceType',
      title: 'Service Type',
      type: 'string',
      options: {
        list: [
          {title: 'Package / Tour', value: 'package'},
          {title: 'Accommodation', value: 'accommodation'},
          {title: 'Vehicle', value: 'vehicle'},
          {title: 'Tour Guide', value: 'guide'},
          {title: 'Restaurant', value: 'restaurant'},
          {title: 'Custom Trip', value: 'custom_trip'},
        ],
      },
    }),
    defineField({
      name: 'serviceName',
      title: 'Service / Package Name',
      type: 'string',
    }),
    defineField({
      name: 'serviceSlug',
      title: 'Service Slug',
      type: 'string',
    }),

    // ── Travel details ────────────────────────────────────────────
    defineField({name: 'travelDate', title: 'Travel Date', type: 'date'}),
    defineField({name: 'returnDate', title: 'Return Date', type: 'date'}),
    defineField({
      name: 'guests',
      title: 'Number of Guests',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(50),
    }),

    // ── Personal info ─────────────────────────────────────────────
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'phone', title: 'Phone / WhatsApp', type: 'string'}),
    defineField({name: 'nationality', title: 'Nationality', type: 'string'}),
    defineField({name: 'cnic', title: 'CNIC / Passport No.', type: 'string'}),

    // ── Emergency contact ────────────────────────────────────────
    defineField({name: 'emergencyName', title: 'Emergency Contact Name', type: 'string'}),
    defineField({name: 'emergencyPhone', title: 'Emergency Contact Phone', type: 'string'}),

    // ── Special requirements ─────────────────────────────────────
    defineField({name: 'dietaryRequirements', title: 'Dietary Requirements', type: 'string'}),
    defineField({name: 'medicalConditions', title: 'Medical Conditions', type: 'text', rows: 2}),
    defineField({name: 'message', title: 'Additional Message', type: 'text', rows: 3}),

    // ── Meta ─────────────────────────────────────────────────────
    defineField({name: 'sourceUrl', title: 'Booked From URL', type: 'string'}),
    defineField({name: 'submittedAt', title: 'Submitted At', type: 'datetime', readOnly: true}),
  ],

  preview: {
    select: {
      title: 'fullName',
      subtitle: 'serviceName',
      status: 'status',
    },
    prepare({title, subtitle, status}) {
      const icons = {new: '🆕', contacted: '📞', quoted: '💬', confirmed: '✅', cancelled: '❌'}
      return {
        title: `${icons[status] || '🆕'} ${title || 'Unknown'}`,
        subtitle: subtitle || 'No service selected',
      }
    },
  },

  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
})

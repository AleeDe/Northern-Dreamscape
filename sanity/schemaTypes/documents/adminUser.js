import {defineField, defineType} from 'sanity'

export const adminUserType = defineType({
  name: 'adminUser',
  title: 'Admin Users',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'passwordHash',
      title: 'Password Hash',
      description: 'Auto-generated when you set password via the setup page. Do NOT edit manually.',
      type: 'string',
      readOnly: false,
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      initialValue: 'editor',
      options: {
        list: [
          {title: '👑 Administrator — Full access', value: 'admin'},
          {title: '✏️  Editor — Content only',       value: 'editor'},
          {title: '📋 Bookings — Bookings only',    value: 'bookings'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      description: 'Disable to block login without deleting account',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'lastLogin',
      title: 'Last Login',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'email', role: 'role', active: 'isActive'},
    prepare({title, subtitle, role, active}) {
      const icons = {admin: '👑', editor: '✏️', bookings: '📋'}
      return {
        title: `${active ? '' : '🔴 '}${icons[role] || '👤'} ${title}`,
        subtitle,
      }
    },
  },
})

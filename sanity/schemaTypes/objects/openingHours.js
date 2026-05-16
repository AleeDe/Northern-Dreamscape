import {defineField, defineType} from 'sanity'

export const openingHoursType = defineType({
  name: 'openingHours',
  title: 'Opening hours',
  type: 'object',
  fields: [
    defineField({name: 'days', title: 'Days', type: 'string', description: 'Example: Mon-Sun'}),
    defineField({name: 'opens', title: 'Opens', type: 'string', description: 'Example: 09:00'}),
    defineField({name: 'closes', title: 'Closes', type: 'string', description: 'Example: 22:00'}),
    defineField({name: 'note', title: 'Note', type: 'string'}),
  ],
})

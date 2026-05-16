import {defineField, defineType} from 'sanity'

export const itineraryDayType = defineType({
  name: 'itineraryDay',
  title: 'Itinerary day',
  type: 'object',
  fields: [
    defineField({name: 'dayNumber', title: 'Day number', type: 'number', validation: (Rule) => Rule.required().min(1)}),
    defineField({name: 'title', title: 'Day title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'summary', title: 'Short summary', type: 'text', rows: 3}),
    defineField({name: 'locationName', title: 'Main location', type: 'string'}),
    defineField({name: 'coordinates', title: 'Map coordinates', type: 'geopoint'}),
    defineField({name: 'routeFrom', title: 'Route from', type: 'string'}),
    defineField({name: 'routeTo', title: 'Route to', type: 'string'}),
    defineField({name: 'distanceKm', title: 'Distance in km', type: 'number'}),
    defineField({name: 'travelTime', title: 'Travel time', type: 'string', description: 'Example: 7 hrs drive'}),
    defineField({name: 'altitudeMeters', title: 'Altitude meters', type: 'number'}),
    defineField({name: 'difficulty', title: 'Day difficulty', type: 'string', options: {list: ['Easy', 'Moderate', 'Strenuous']}}),
    defineField({name: 'morningPlan', title: 'Morning plan', type: 'portableContent'}),
    defineField({name: 'afternoonPlan', title: 'Afternoon plan', type: 'portableContent'}),
    defineField({name: 'eveningPlan', title: 'Evening plan', type: 'portableContent'}),
    defineField({name: 'mealsIncluded', title: 'Meals included', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}}),
    defineField({name: 'accommodation', title: 'Accommodation', type: 'reference', to: [{type: 'accommodation'}]}),
    defineField({name: 'vehicle', title: 'Vehicle', type: 'reference', to: [{type: 'vehicle'}]}),
    defineField({name: 'guide', title: 'Guide', type: 'reference', to: [{type: 'guide'}]}),
    defineField({name: 'restaurants', title: 'Restaurants / meal stops', type: 'array', of: [{type: 'reference', to: [{type: 'restaurant'}]}]}),
    defineField({name: 'gallery', title: 'Day gallery', type: 'array', of: [{type: 'mediaImage'}]}),
    defineField({name: 'video', title: 'Day video', type: 'videoEmbed'}),
    defineField({name: 'featuredMoment', title: 'Featured moment', type: 'string'}),
  ],
  preview: {
    select: {title: 'title', dayNumber: 'dayNumber', media: 'gallery.0'},
    prepare({title, dayNumber, media}) {
      return {title: `Day ${dayNumber || '?'}: ${title || 'Untitled'}`, media}
    },
  },
})

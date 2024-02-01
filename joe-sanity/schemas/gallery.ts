import {defineField, defineType, useProjectId} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {
        // hotspot: true,
        metadata: ['blurhash', 'lqip'],
      },
    }),
    defineField({
      name: 'projectId',
      title: 'Prosjekt Id',
      type: 'reference',
      to: [{type: 'project'}],
    }),
  ],
})

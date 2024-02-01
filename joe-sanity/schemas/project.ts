import {defineField, defineType} from 'sanity'
// hey this is a test sentence

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'projectId',
      title: 'Prosjekt Id',
      type: 'string',
    }),
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
      name: 'squareFootage',
      title: 'Kvadratmeter',
      type: 'number',
    }),
    defineField({
      name: 'assignmentType',
      title: 'Oppdragstype',
      type: 'string',
    }),
    defineField({
      name: 'authors',
      title: 'Forfattere',
      type: 'array',
      of: [{type: 'string'}],
    }),
    // defineField({
    //   name: 'gallery',
    //   title: 'Bilder',
    //   type: 'array',
    //   of: [{type: 'reference', to: {type: 'gallery'}}]
    // }),
    defineField({
      name: 'gallery',
      title: 'Bilder',
      type: 'array',
      of: [
        {
          name: 'projectImage',
          title: 'Prosjektbilde',
          type: 'image',
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip'],
          },
          fields: [
            {
              name: 'title',
              title: 'Tittel',
              type: 'string',
            },
            {
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: {
                source: (doc, options) => options.parent && options.parent.title,
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'publisert',
      title: 'Publisert',
      type: 'datetime',
    }),
    defineField({
      name: 'oppsummering',
      title: 'Oppsummering',
      type: 'text',
    }),
  ],

  // preview: {
  //   select: {
  //     title: 'title',
  //     author: 'author.name',
  //     media: 'mainImage',
  //   },
  //   prepare(selection) {
  //     const {author} = selection
  //     return {...selection, subtitle: author && `by ${author}`}
  //   },
  // },
})

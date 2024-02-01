import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media, mediaAssetSource} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'joe-portfolio',

  projectId: 's0d0t3an',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),
    media(),
    {
      name: 'media',
      options: {
        lqip: true,
      },
    },
  ],

  schema: {
    types: schemaTypes,
  },
})

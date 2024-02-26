<script lang="ts">
  import { urlFor } from '$lib/config/images'
  import type { Project } from '$lib/types/project'
  import { register } from 'swiper/element/bundle'

  register()

  export let project: Project
</script>

<swiper-container keyboard={true} navigation={true} effect="fade" fade-effect-cross-fade={true}>
  {#each project.gallery as image}
    <swiper-slide class="grid place-items-center min-h-screen">
      <img
        class="max-h-screen sm:max-w-screen-sm"
        src={image.ref && urlFor(image.ref).url()}
        alt={image.slug}
      />
    </swiper-slide>
  {/each}
</swiper-container>

<!-- effect="fade" -->

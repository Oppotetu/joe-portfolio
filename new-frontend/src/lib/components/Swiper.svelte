<script lang="ts">
  import { urlFor } from '$lib/config/images'
  import type { Project } from '$lib/types/project'
  import { register } from 'swiper/element/bundle'

  register()

  export let project: Project
</script>

<swiper-container navigation={true} effect="fade" fade-effect-cross-fade={false}>
  {#each project.gallery as image}
    <swiper-slide class="flex">
      <img
        class="max-h-screen justify-center"
        src={image.ref && urlFor(image.ref).url()}
        alt={image.slug}
      />
    </swiper-slide>
  {/each}
</swiper-container>

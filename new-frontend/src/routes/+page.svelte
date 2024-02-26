<script lang="ts">
  import HomeEmblem from '$lib/components/HomeEmblem.svelte'
  import Swiper from '$lib/components/Swiper.svelte'
  import type { Project } from '$lib/types/project.js'

  export let data
  let projects: Project[] = data.projects

  let project = projects[1]
</script>

<!-- <pre> -->
<!--   {JSON.stringify(data, null, 2)} -->
<!-- </pre> -->

<HomeEmblem></HomeEmblem>

<button class="absolute lg:text-7xl md:text-5xl text-3xl top-0 right-2 z-30 inverted-text">
  +
</button>

<Swiper {project}></Swiper>

<style>
  .slider-image {
    height: 100svh;
  }
</style>

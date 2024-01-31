<script lang="ts">
  import { page } from '$app/stores'
  import * as Carousel from '$lib/components/ui/carousel/index.ts'
  import * as Drawer from '$lib/components/ui/drawer/index.js'
  import type { Project } from '$lib/types/project.js'

  export let data
  let projects: Project[] = data.projects
  // let galleries = data.gallery
</script>

<!-- <pre> -->
<!--   {JSON.stringify(data, null, 2)} -->
<!-- </pre> -->

<div class="flex">
  <Carousel.Root
    opts={{
      align: 'start'
      // slidesToScroll: 'auto'
    }}
    class="mt-auto"
  >
    <Carousel.Content>
      {#each projects as project}
        {#each project.gallery as gallery}
          <Carousel.Item>
            <Drawer.Root>
              <Drawer.Trigger>
                <!-- <a href={`${$page.url.origin}/${project.slug}`}> -->
                <img class="slider-image" src={gallery.asset.metadata.lqip} alt={gallery.slug} />
                <!-- </a> -->
              </Drawer.Trigger>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>{project.title}</Drawer.Title>
                  <Drawer.Description>{project.oppsummering}</Drawer.Description>
                </Drawer.Header>
              </Drawer.Content>
            </Drawer.Root>
          </Carousel.Item>
        {/each}
      {/each}
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root>
</div>

<!-- class="pl-1 md:basis-1/2 lg:basis-1/3" -->

<style>
  .slider-image {
    height: 100svh;
  }
</style>

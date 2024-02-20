<script lang="ts">
  import { Button, type Props, buttonVariants } from '$lib/components/ui/button/index.js'
  import { cn } from '$lib/utils'
  import { ArrowRight } from 'lucide-svelte'
  import type { VariantProps } from 'tailwind-variants'
  import { getEmblaContext } from './context.js'
  import { onMount } from 'svelte'

  type $$Props = Props

  let className: $$Props['class'] = undefined
  export { className as class }
  export let variant: VariantProps<typeof buttonVariants>['variant'] = 'outline'
  export let size: VariantProps<typeof buttonVariants>['size'] = 'icon'
  const { orientation, canScrollNext, scrollNext, handleKeyDown } =
    getEmblaContext('<Carousel.Next/>')

  onMount(() => {
    var circle = document.querySelector<HTMLElement>('.circle')
    if (circle) {
      circle.style.transform = 'translate(-9999px, -9999px)'
    }
    var box = document.querySelectorAll<HTMLElement>('.box')

    document.addEventListener('mousemove', function (event) {
      var isInBox = false
      // Check if the event target is inside any of the box
      box?.forEach((el: any) => {
        if (el.contains(event.target)) {
          isInBox = true
          return
        }
      })
      // for (var i = 0; i < box.length; i++) {
      // 	if (box[i].contains(event.target)) {
      // 		isInBox = true
      // 		break
      // 	}
      // }
      if (isInBox) {
        if (circle) {
          circle.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
        }
      } else {
        if (circle) {
          // Move the circle out of the viewport
          circle.style.transform = 'translate(-9999px, -9999px)'
        }
      }
    })
  })
</script>

<div class="circle" />
<!-- <button on:click={scrollNext} on:keydown={handleKeyDown} class="box next" /> -->

<Button
  {variant}
  {size}
  class={cn(
    'absolute h-8 w-8 rounded-full touch-manipulation',
    $orientation === 'horizontal'
      ? 'right-12 top-1/2 -translate-y-1/2'
      : 'bottom-12 left-1/2 -translate-x-1/2 rotate-90',
    className
  )}
  disabled={!$canScrollNext}
  on:click={scrollNext}
  on:keydown={handleKeyDown}
  {...$$restProps}
>
  <ArrowRight class="h-4 w-4" />
  <span class="sr-only">Next slide</span>
</Button>

<style>
  .circle {
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    z-index: 9999;
    pointer-events: none;
    transform: translate(-50%, -50%);

    -webkit-background-clip: border-box;
    background-clip: border-box;

    background-color: white;
    mix-blend-mode: difference;
  }

  .box {
    cursor: none;
    content: '';
  }

  .next {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 6rem;
    height: 20rem;
    background-color: red;
  }
</style>

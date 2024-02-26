<script lang="ts">
	import { Carousel } from 'flowbite-svelte'
	// import { scale } from 'svelte/transition'
	// import { quintOut } from 'svelte/easing'

	export let images

	// const scaleAnimation = (x) => scale(x, { duration: 500, easing: quintOut })
</script>

<div class="max-w-4xl">
	<Carousel {images} transition={null} let:Controls let:Indicators>
		<Controls />
		<Indicators />
	</Carousel>
</div>

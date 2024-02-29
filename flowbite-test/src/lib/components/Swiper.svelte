<script lang="ts">
	import { urlFor } from '$lib/config/images'
	import type { Project } from '$lib/types/project'
	import { onMount } from 'svelte'
	import { register } from 'swiper/element/bundle'
	import Cursor from './Cursor.svelte'
	import prevSvg from '$lib/assets/ooui--previous-ltr.svg'
	import nextSvg from '$lib/assets/ooui--previous-rtl.svg'

	register()

	export let project: Project

	// let mouseX = 0
	// let mouseY = 0

	// function handleMouseMove(event) {
	// 	mouseX = event.clientX
	// 	mouseY = event.clientY
	// }

	// let circle: HTMLElement

	onMount(() => {
		// circle = document.querySelector('circle')

		// if (circle) {
		// 	circle.style.transform = 'translate(-9999px, -9999px)'
		// }

		// const container = document.querySelector('container')
		const swiperEl = document.querySelector('swiper-container')
		const prevButton = document.getElementById('prev-button')
		const nextButton = document.getElementById('next-button')

		prevButton.addEventListener('click', () => {
			swiperEl.swiper.slidePrev()
		})
		nextButton.addEventListener('click', () => {
			swiperEl.swiper.slideNext()
		})

		// document.addEventListener('mousemove', function (event: MouseEvent) {
		// 	const y = event.clientY
		// 	const x = event.clientX
		// 	circle.style.top = y + 'px'
		// 	circle.style.left = x + 'px'
		// 	circle.style.left = event.pageX + 'px'
		// 	circle.style.top = event.pageY + 'px'
		// 	var isInBox = false
		// 	if (prevButton && prevButton.contains(event.target as Node)) {
		// 		isInBox = true
		// 	}
		// 	if (isInBox) {
		// 		circle.classList.add('show')
		// 		circle.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
		// 	} else {
		// 		circle.classList.remove('show')
		// 		circle.style.transform = 'translate(-9999px, -9999px)'
		// 	}
		// })
	})
</script>

<!-- <div class="circle" /> -->
<!-- <div class="container h-full w-full relative">
	<div class="circle"></div>
</div> -->

<!-- <div on:mousemove={handleMouseMove}>
	<div class="circle" style="left: {mouseX}px; top: {mouseY}px;"></div>
</div> -->

<!-- <Cursor next={nextButton}></Cursor> -->

<swiper-container keyboard={true} effect="fade" fade-effect-cross-fade={true}>
	{#each project.gallery as image}
		<swiper-slide class="grid place-items-center min-h-screen">
			<img
				class="max-h-screen sm:max-w-screen-sm"
				src={image.ref && urlFor(image.ref).url()}
				alt={image.slug}
				loading="lazy"
			/>
		</swiper-slide>
	{/each}

	<button id="prev-button" class="prev-button absolute"></button>
	<button id="next-button" class="next-button absolute"></button>
</swiper-container>

<style>
	.prev-button,
	.next-button {
		top: 7%;
		width: 50%;
		height: 93%;

		/* cursor: none; */
	}
	.prev-button {
		left: 0;
		cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 20 20'%3E%3Cpath fill='white' stroke='black' d='m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z'/%3E%3C/svg%3E"),
			auto;
		mix-blend-mode: difference;
		/* background-color: white; */
	}
	.next-button {
		right: 0;
		cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 20 20'%3E%3Cpath fill='white' stroke='black' d='M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z'/%3E%3C/svg%3E"),
			auto;
		mix-blend-mode: difference;
		/* background-color: white;  */
	}

	/* .circle {
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		z-index: 9999;
		user-select: none;
		transform: translate(-50%, -50%);

		background-clip: border-box;

		mix-blend-mode: difference;
		background-color: white;
	} */

	/* swiper-container::part(button-prev),
	swiper-container::part(button-next) {
		cursor: none;

		top: 50%;
		transform: translateY(-50%);
		width: 6rem;
		height: 100%;
		background-color: aquamarine;
	}

	swiper-container::part(button-prev)::after,
	swiper-container::part(button-next)::after {
		content: '';
	}

	swiper-container::part(button-prev) {
		left: 0;
	}

	swiper-container::part(button-next) {
		right: 0;
	} */

	/* @media (max-width: 500px) {
		.swiper-button-next,
		.swiper-button-prev,
		.circle {
			visibility: hidden;
		}
	} */
</style>

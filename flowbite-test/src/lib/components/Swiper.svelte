<script lang="ts">
	import { urlFor } from '$lib/config/images'
	import type { Project } from '$lib/types/project'
	import { onMount } from 'svelte'
	import { register } from 'swiper/element/bundle'

	import Swiper from 'swiper'
	import { Navigation, Pagination } from 'swiper/modules'
	import 'swiper/css'
	import 'swiper/css/navigation'
	import { fade } from 'svelte/transition'

	register()

	export let project: Project

	onMount(() => {
		const swiper = new Swiper('.swiper', {
			modules: [Navigation],
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			keyboard: true

			// effect: 'fade',
			// fadeEffect: {
			// 	crossFade: false
			// }
		})

		// const swiperEl = document.querySelector('swiper-container')
		// const prevButton = document.getElementById('prev-button')
		// const nextButton = document.getElementById('next-button')

		// prevButton.addEventListener('click', () => {
		// 	swiperEl.swiper.slidePrev()
		// })
		// nextButton.addEventListener('click', () => {
		// 	swiperEl.swiper.slideNext()
		// })
	})
</script>

<div class="swiper w-full h-full">
	<div class="swiper-wrapper">
		{#each project.gallery as image}
			<div class="swiper-slide flex items-center justify-center">
				<img
					class="max-h-screen block h-full object-cover mx-auto"
					src={image.ref && urlFor(image.ref).quality(50).url()}
					alt={image.slug}
					loading="lazy"
				/>
			</div>
		{/each}
	</div>

	<button class="swiper-button-prev absolute"></button>
	<button class="swiper-button-next absolute"></button>
</div>

<!-- <swiper-container class="w-full h-full" keyboard={true} navigation={true} effect="fade"
	fade-effect={{
		crossFade: false
	}}>
	{#each project.gallery as image}
		<swiper-slide class="flex justify-center items-center">
			<img
				class="max-h-screen block h-full object-cover"
				src={image.ref && urlFor(image.ref).fit('max').quality(50).url()}
				alt={image.slug}
				loading="lazy"
			/>
		</swiper-slide>
	{/each}

	<button id="prev-button" class="prev-button absolute"></button>
	<button id="next-button" class="next-button absolute"></button>
</swiper-container> -->

<style>
	.swiper-button-prev::after,
	.swiper-button-next::after {
		content: '';
	}

	.swiper-button-prev,
	.swiper-button-next {
		width: 50%;
		height: 93%;
		top: 7%;
		margin: 0;
	}
	.swiper-button-prev {
		left: 0;
		cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 20 20'%3E%3Cpath fill='white' stroke='black' d='m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z'/%3E%3C/svg%3E"),
			auto;
	}
	.swiper-button-next {
		right: 0;
		cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 20 20'%3E%3Cpath fill='white' stroke='black' d='M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z'/%3E%3C/svg%3E"),
			auto;
	}

	/* swiper-container::part(button-next) {
		display: none;
		content: '';
	}

	swiper-container::part(button-prev),
	swiper-container::part(button-next) {
		width: 50%;
		top: 7%;
		height: 93%;
		content: '';
		
	}
	swiper-container::part(button-prev) {
		left: 0;
		cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 20 20'%3E%3Cpath fill='white' stroke='black' d='m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z'/%3E%3C/svg%3E"),
			auto;
	}
	swiper-container::part(button-next) {
		right: 0;
		cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 20 20'%3E%3Cpath fill='white' stroke='black' d='M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z'/%3E%3C/svg%3E"),
			auto;
	} */

	/* @media (max-width: 500px) {
		.swiper-button-next,
		.swiper-button-prev,
		.circle {
			visibility: hidden;
		}
	} */
</style>

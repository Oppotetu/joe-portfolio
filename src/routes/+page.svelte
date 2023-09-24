<script lang="ts">
	import { onMount } from 'svelte'
	import Swiper from 'swiper'
	import { HashNavigation, Navigation, Pagination, History, Scrollbar, A11y } from 'swiper/modules'
	import 'swiper/css'
	import 'swiper/css/navigation'
	import 'swiper/css/pagination'
	import 'swiper/css/history'
	import type { SwiperOptions } from 'swiper/types/swiper-options.js'
	import type { PaginationOptions } from 'swiper/types/modules/pagination.js'
	import type { NavigationOptions } from 'swiper/types/modules/navigation.js'
	import { urlFor } from '$lib/config/images.js'
	import { getDrawerStore, getModalStore } from '@skeletonlabs/skeleton'
	import type { DrawerSettings, ModalComponent, ModalSettings } from '@skeletonlabs/skeleton'
	import ProjectModal from '$lib/components/ProjectModal.svelte'
	import type { Project } from '$lib/types/project.js'

	const modalStore = getModalStore()
	const drawerStore = getDrawerStore()

	export let data
	let { projects } = data

	const swiperParams1: SwiperOptions = {
		modules: [Navigation, Pagination, HashNavigation, Scrollbar, A11y],
		direction: 'vertical',
		spaceBetween: 8,
		// pagination: {
		// 	el: '.swiper-pagination',
		// 	clickable: true,
		// },
		navigation: {
			nextEl: '.down-b',
			prevEl: '.up-b',
		},
		keyboard: true,
		scrollbar: true,
		// nested: true,
		// centeredSlides: true,
		// centeredSlidesBounds: true,
		// slidesPerView: 2,
		hashNavigation: {
			watchState: true,
		},
	}

	const swiperParams2: SwiperOptions = {
		modules: [Navigation, Pagination],
		spaceBetween: 8,
		// freeMode: true,
		// pagination: {
		// 	el: '.swiper-pagination',
		// 	clickable: true,
		// },
		navigation: {
			nextEl: '.next-b',
			prevEl: '.prev-b',
		},
		keyboard: true,
		// nested: true,
		slidesPerView: 2,
	}

	let swiper: Swiper
	let swiper2: Swiper

	let lastScrollTop = 0
	let isScrollingDown = false

	onMount(() => {
		var swiper = new Swiper('.my-swiper', swiperParams1)

		var swiper2 = new Swiper('.my-swiper-2', swiperParams2)

		document.addEventListener('keydown', function (event) {
			if (event.key === 'ArrowDown') {
				swiper.slideNext()
			} else if (event.key === 'ArrowUp') {
				swiper.slidePrev()
			} else if (event.key === 'ArrowRight') {
				// console.log(swiper2)
			} else if (event.key === 'ArrowLeft') {
				// swiper2.slidePrev() // causes error
			}
		})
		// const swiperElement = document.getElementById('my-swiper')
		// swiperElement.addEventListener('scroll', function (event) {
		// 	console.log('scrolling')
		// 	const currentScrollTop = window.scrollY || document.documentElement.scrollTop

		// 	isScrollingDown = currentScrollTop > lastScrollTop

		// 	lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop

		// 	if (isScrollingDown) {
		// 		console.log('scrolled down')
		// 	}
		// })
	})

	const getModalComponent = (project: Project) => {
		const modalComponent: ModalComponent = {
			ref: ProjectModal,
			props: {
				project: project,
				// height: '24rem',
			},
			// slot: '<p>Default</p>',
		}
		return modalComponent
	}

	const modalOpen = (project: Project) => {
		const modal: ModalSettings = {
			type: 'component',
			component: getModalComponent(project),
			// title: project.title,
			// body: modalBody
		}
		modalStore.trigger(modal)
	}

	const drawerSettings: DrawerSettings = {
		id: 'menu',
		// Provide your property overrides:
		bgDrawer: 'bg-surface-900 text-surface-50',
		bgBackdrop: 'bg-gradient-to-tr from-surface-500/50 via-surface-500/50 to-surface-500/50',
		width: 'w-[280px] md:w-[480px]',
		// padding: 'p-4',
		// rounded: 'rounded-md',
	}

	const drawerOpen = () => {
		drawerStore.open(drawerSettings)
	}
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-element-bundle.min.js"></script>
</svelte:head>

<!-- <button on:click={drawerOpen} class="absolute top-2 left-2 z-10 h3">Joey_Crakc</button> -->

<!-- <div class="space-x-4 overflow-scroll flex flex-col h-full">
	{#each projects as project}
		<div id={`${project.project}`} class="">
			<div class="swiper my-swiper-2 h-full w-full">
				<div class="swiper-wrapper">
					<button class="absolute top-2 right-2 z-10" on:click={() => modalOpen(project)}
						>Project</button
					>0
					{#each project.gallery as image}
						<img
							class="h-screen max-w-full object-contain swiper-slide"
							src={image && urlFor(image.image).url()}
							alt={image.slug}
						/>
					{/each}
				</div>
				<div class="swiper-pagination" />

				<button class="swiper-button-prev prev-b" />
				<button class="swiper-button-next next-b" />
			</div>
		</div>
	{/each}
</div> -->

<swiper-container
	class="my-swiper-o swiper-v"
	pagination="true"
	pagination-clickable="true"
	space-between="50"
	direction="vertical"
	on:swiper={(e) => (swiper = e.detail[0])}
>
	<swiper-slide>Horizontal Slide 1</swiper-slide>
	<swiper-slide>
		<swiper-container
			class="my-swiper-o-2 swiper-h"
			pagination="true"
			pagination-clickable="true"
			space-between="50"
		>
			<swiper-slide>Vertical Slide 1</swiper-slide>
			<swiper-slide>Vertical Slide 2</swiper-slide>
			<swiper-slide>Vertical Slide 3</swiper-slide>
			<swiper-slide>Vertical Slide 4</swiper-slide>
			<swiper-slide>Vertical Slide 5</swiper-slide>
		</swiper-container>
	</swiper-slide>
	<swiper-slide>Horizontal Slide 3</swiper-slide>
	<swiper-slide>Horizontal Slide 4</swiper-slide>
</swiper-container>

<!-- <div class="swiper my-swiper swiper-v h-full max-h-screen w-full">
	<div class="swiper-wrapper">
		{#each projects as project}
			<div data-hash={project.project} class="swiper-slide">
				<div class="swiper my-swiper-2 swiper-h h-full w-full">
					<div class="swiper-wrapper">
						<button class="absolute top-2 right-2 z-10" on:click={() => modalOpen(project)}
							>Project</button
						>
						{#each project.gallery as image}
							<img
								class="h-screen max-w-full object-contain swiper-slide"
								src={image && urlFor(image.image).url()}
								alt={image.slug}
							/>
						{/each}
					</div>
					<div class="swiper-pagination" />

					<button class="swiper-button-prev prev-b" />
					<button class="swiper-button-next next-b" />
				</div>
			</div>
		{/each}
	</div>
	<div class="swiper-pagination" />
	<button class="swiper-button-prev up-b" />
	<button class="swiper-button-next down-b" />
</div> -->

<style>
	html,
	body {
		position: relative;
		height: 100%;
	}

	body {
		background: #eee;
		font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
		font-size: 14px;
		color: #000;
		margin: 0;
		padding: 0;
	}

	swiper-container {
		width: 100%;
		height: 100%;
	}

	swiper-slide {
		text-align: center;
		font-size: 18px;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	swiper-slide img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.swiper-button-prev,
	.swiper-button-next {
		/* width: 35%;
		height: 12rem; */
		cursor: pointer;
		background-clip: border-box;
		/* cursor: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 512 512'%3e%3cg transform='rotate(45 256 256)'%3e%3crect id='r' x='16' y='216' width='480' height='80' rx='14'/%3e%3cuse href='%23r' transform='rotate(90 256 256)'/%3e%3c/g%3e%3c/svg%3e")
				16 16,
			pointer; */
	}

	.swiper-button-prev,
	.swiper-button-next {
		/* background-position: center;
		background-size: 40px;
		background-repeat: no-repeat;
		padding: 8px 16px;
		border-radius: 100%; */

		/* background-clip: border-box; */
		/* mix-blend-mode: difference; */
		/* background: radial-gradient(farthest-side, #fff 95%, transparent 100%) calc(var(--x) - 0.75em)
			calc(var(--y) - 0.75em) / 1.5em 1.5em fixed no-repeat; */
	}

	.swiper-button-next::after,
	.swiper-button-prev::after {
		content: '';
	}

	.swiper-button-prev {
		/* background-image: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="45" height="45" viewBox="0 0 512 512"%3E%3Cg transform="rotate(-90 256 256)"%3E%3Cpath fill="currentColor" d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48Zm107.31 259.31a16 16 0 0 1-22.62 0L256 222.63l-84.69 84.68a16 16 0 0 1-22.62-22.62l96-96a16 16 0 0 1 22.62 0l96 96a16 16 0 0 1 0 22.62Z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'); */
		/* cursor: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="45" height="45" viewBox="0 0 512 512"%3E%3Cg transform="rotate(-90 256 256)"%3E%3Cpath fill="currentColor" d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48Zm107.31 259.31a16 16 0 0 1-22.62 0L256 222.63l-84.69 84.68a16 16 0 0 1-22.62-22.62l96-96a16 16 0 0 1 22.62 0l96 96a16 16 0 0 1 0 22.62Z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')
				16 16,
			pointer; */
	}

	.swiper-button-next {
		/* cursor: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="45" height="45" viewBox="0 0 512 512"%3E%3Cg transform="rotate(90 256 256)"%3E%3Cpath fill="currentColor" d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48Zm107.31 259.31a16 16 0 0 1-22.62 0L256 222.63l-84.69 84.68a16 16 0 0 1-22.62-22.62l96-96a16 16 0 0 1 22.62 0l96 96a16 16 0 0 1 0 22.62Z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')
				16 16,
			pointer; */
		/* background-image: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="45" height="45" viewBox="0 0 512 512"%3E%3Cg transform="rotate(90 256 256)"%3E%3Cpath fill="currentColor" d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48Zm107.31 259.31a16 16 0 0 1-22.62 0L256 222.63l-84.69 84.68a16 16 0 0 1-22.62-22.62l96-96a16 16 0 0 1 22.62 0l96 96a16 16 0 0 1 0 22.62Z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E'); */
	}

	.up-b,
	.down-b {
		left: 48%;
		transform: translate(-50%);
		/* transform: rotate(90deg); */
		width: 40rem;
		height: 10rem;
		/* background-color: red; */
	}

	.up-b {
		top: 5%;
		cursor: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="45" height="45" viewBox="0 0 512 512"%3E%3Cg transform="rotate(0 256 256)"%3E%3Cpath fill="currentColor" d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48Zm107.31 259.31a16 16 0 0 1-22.62 0L256 222.63l-84.69 84.68a16 16 0 0 1-22.62-22.62l96-96a16 16 0 0 1 22.62 0l96 96a16 16 0 0 1 0 22.62Z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')
				16 16,
			pointer;
	}

	.down-b {
		top: 80%;
		cursor: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="45" height="45" viewBox="0 0 512 512"%3E%3Cg transform="rotate(180 256 256)"%3E%3Cpath fill="currentColor" d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48Zm107.31 259.31a16 16 0 0 1-22.62 0L256 222.63l-84.69 84.68a16 16 0 0 1-22.62-22.62l96-96a16 16 0 0 1 22.62 0l96 96a16 16 0 0 1 0 22.62Z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')
				16 16,
			pointer;
	}

	.prev-b,
	.next-b {
		top: 50%;
		transform: translateY(-50%);
		/* transform: rotate(90deg); */
		/* top: 5%; */
		width: 10rem;
		height: 40rem;
		/* background-color: red; */
	}

	.prev-b {
		left: 5%;
		cursor: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="45" height="45" viewBox="0 0 512 512"%3E%3Cg transform="rotate(-90 256 256)"%3E%3Cpath fill="currentColor" d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48Zm107.31 259.31a16 16 0 0 1-22.62 0L256 222.63l-84.69 84.68a16 16 0 0 1-22.62-22.62l96-96a16 16 0 0 1 22.62 0l96 96a16 16 0 0 1 0 22.62Z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')
				16 16,
			pointer;
	}

	.next-b {
		right: 5%;
		cursor: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="45" height="45" viewBox="0 0 512 512"%3E%3Cg transform="rotate(90 256 256)"%3E%3Cpath fill="currentColor" d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48Zm107.31 259.31a16 16 0 0 1-22.62 0L256 222.63l-84.69 84.68a16 16 0 0 1-22.62-22.62l96-96a16 16 0 0 1 22.62 0l96 96a16 16 0 0 1 0 22.62Z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')
				16 16,
			pointer;
	}

	/* :root {
		--swiper-navigation-color: #e49a38;
	} */
</style>

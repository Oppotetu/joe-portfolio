<script lang="ts">
	import { onMount } from 'svelte'
	// import Swiper from 'swiper/swiper-bundle'
	// import 'swiper/css/bundle'
	// import { register } from 'swiper/element/bundle'
	// import {
	// 	HashNavigation,
	// 	Navigation,
	// 	Pagination,
	// 	Scrollbar,
	// 	A11y,
	// 	Keyboard,
	// 	Mousewheel,
	// } from 'swiper/modules'
	// import Swiper from 'swiper'
	// import type Swiper from 'swiper/types/swiper-class.js'
	import 'swiper/css'
	import 'swiper/css/navigation'
	import 'swiper/css/pagination'
	import type { SwiperOptions } from 'swiper/types/swiper-options.js'
	import { urlFor } from '$lib/config/images.js'
	import { Drawer, getDrawerStore, getModalStore } from '@skeletonlabs/skeleton'
	import type { DrawerSettings, ModalComponent, ModalSettings } from '@skeletonlabs/skeleton'
	import ProjectModal from '$lib/components/ProjectModal.svelte'
	import type { Project } from '$lib/types/project.js'
	import InfoModal from '$lib/components/InfoModal.svelte'
	import type { LoadEvent } from '@sveltejs/kit'
	import type Swiper from 'swiper/types/swiper-class.js'

	const modalStore = getModalStore()
	const drawerStore = getDrawerStore()

	// register()

	export let data
	let projects: Project[] = data.projects

	const swiperParamsOuter: SwiperOptions = {
		// modules: [Navigation, Pagination, HashNavigation, Keyboard, Mousewheel],
		// virtual: true,
		direction: 'vertical',
		spaceBetween: 8,
		// loop: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.down-b',
			prevEl: '.up-b',
		},
		keyboard: true,
		mousewheel: true,
	}

	const swiperParamsInner: SwiperOptions = {
		// modules: [Navigation, Pagination, Keyboard],
		spaceBetween: 8,
		// loop: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.next-b',
			prevEl: '.prev-b',
		},
		keyboard: true,
		slidesPerView: 'auto',
	}

	let swiper: Swiper
	let swiper2: Swiper

	function isElementInViewport(el: Element) {
		var rect = el.getBoundingClientRect()
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <=
				(window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */ &&
			rect.right <=
				(window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
		)
	}

	function sourceChange() {
		var imgElements = document.getElementsByTagName('img')
		for (let i of imgElements) {
			if (i.getAttribute('data-src')) {
				i?.setAttribute('src', i?.getAttribute('data-src'))
			}
		}
	}

	function tryImages(event: Event) {
		const el = event.target as Element
		if (isElementInViewport(el)) {
			const dataSrc = el.getAttribute('data-src')
			if (dataSrc) {
				el.setAttribute('src', dataSrc)
				// if (el.getAttribute('data-src')) {
				//   el.setAttribute('src', el.getAttribute('data-src'))
				// }
			}
		}
	}

	onMount(() => {
		// window.addEventListener('load', sourceChange())

		swiper = new Swiper('.my-swiper-outer', swiperParamsOuter)
		swiper2 = new Swiper('.my-swiper-inner', swiperParamsInner)

		var circle = document.querySelector<HTMLElement>('.circle')
		if (circle) {
			circle.style.transform = 'translate(-9999px, -9999px)'
		}
		var boxes = document.querySelectorAll<HTMLElement>('.box')
		document.addEventListener('mousemove', function (event) {
			var isInBox = false
			// Check if the event target is inside any of the boxes
			boxes?.forEach((el: any) => {
				if (el.contains(event.target)) {
					isInBox = true
					return
				}
			})
			// for (var i = 0; i < boxes.length; i++) {
			// 	if (boxes[i].contains(event.target)) {
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

	const getProjectModal = (project: Project) => {
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

	const projectModalOpen = () => {
		let activeId = swiper.activeIndex
		let project = projects.filter((i) => i.index === activeId)[0]
		const projectModal: ModalSettings = {
			type: 'component',
			component: getProjectModal(project),
			// title: project.title,
			// body: modalBody
		}
		modalStore.trigger(projectModal)
	}

	const InfoComponent: ModalComponent = {
		ref: InfoModal,
		props: {},
		// slot: '<p>Default</p>',
	}

	const infoModal: ModalSettings = {
		type: 'component',
		component: InfoComponent,
		// title: project.title,
		// body: modalBody
	}

	const infoModalOpen = () => {
		modalStore.trigger(infoModal)
	}

	// drawer
	const drawerSettings: DrawerSettings = {
		id: 'menu',
		// Provide your property overrides:
		bgDrawer: 'bg-surface-900 text-surface-50',
		bgBackdrop: 'bg-gradient-to-tr from-surface-500/50 via-surface-500/50 to-surface-500/50',
		width: 'w-96',
		// padding: 'p-4',
		rounded: 'rounded-none',
	}

	const drawerOpen = () => {
		drawerStore.open(drawerSettings)
	}
</script>

<Drawer>
	{#if $drawerStore.id === 'menu'}
		<ul class="list p-4 space-y-2">
			<li>
				<button class="h3" on:click={() => infoModalOpen()} on:click={() => drawerStore.close()}
					>INFO</button
				>
			</li>
			<li><a class="h3" href="/" on:click={() => drawerStore.close()}>INSTAGRAM</a></li>
			<!-- {#each projects as project}
				<li>
					<button
						class="h3"
						on:click={() => drawerStore.close()}
						on:click={() => swiper.slideTo(project.index)}>{project.title}</button
					>
				</li>
			{/each} -->
		</ul>
	{/if}
</Drawer>

<div class="circle" />

<button
	on:click={drawerOpen}
	class="lg:text-7xl md:text-5xl text-3xl border-4 top-1 left-1 z-30 inverted-text">Johannes</button
>

<button
	class="absolute lg:text-7xl md:text-5xl text-3xl top-2 right-2 z-30 inverted-text"
	on:click={projectModalOpen}
>
	+
</button>

<!-- <div> -->
<!-- 	{#each data.lqips as project} -->
<!-- 		<div class="flex"> -->
<!-- 			{#each project.gallery as image} -->
<!-- 				<img -->
<!-- 					class="h-screen w-full" -->
<!-- 					src={image.asset.metadata.lqip} -->
<!-- 					data-src={image.ref && urlFor(image.ref).maxHeight(1000).maxWidth(2300).quality(2).url()} -->
<!-- 					alt="something" -->
<!-- 					loading="lazy" -->
<!-- 					on:load={tryImages} -->
<!-- 				/> -->
<!-- 			{/each} -->
<!-- 		</div> -->
<!-- 	{/each} -->
<!-- </div> -->

<div class="swiper my-swiper-outer max-h-screen swiper-h h-full w-full">
	<div class="swiper-wrapper">
		{#each data.lqips as project}
			<div class="swiper-slide">
				<div class="swiper my-swiper-inner swiper-v h-full w-full max-h-fit">
					<div class="swiper-wrapper">
						{#each project.gallery as image}
							<img
								class="swiper-slide h-max md:h-full w-fit md:max-w-fit max-h-full"
								src={image.asset.metadata.lqip}
								data-src={image.ref &&
									urlFor(image.ref).maxHeight(1000).maxWidth(2300).quality(2).url()}
								alt={image.slug}
								loading="lazy"
							/>
						{/each}
					</div>
					<div class="swiper-pagination" />
					<button class="swiper-button-prev prev-b box" />
					<button class="swiper-button-next next-b box" />
				</div>
			</div>
		{/each}
	</div>
	<div class="swiper-pagination" />
	<button class="swiper-button-prev up-b box" />
	<button class="swiper-button-next down-b box" />
</div>

<style>
	.inverted-text {
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		background-clip: text;
		background-color: white;
		mix-blend-mode: difference;
		position: absolute;

		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		text-align: center;
	}

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

	@media (max-width: 500px) {
		.swiper-button-next,
		.swiper-button-prev,
		.circle {
			visibility: hidden;
		}
	}

	.swiper-button-next,
	.swiper-button-prev {
		cursor: none;
	}

	.swiper-button-next::after,
	.swiper-button-prev::after {
		content: '';
	}

	.up-b,
	.down-b {
		left: 48%;
		transform: translate(-50%);
		width: 20rem;
		height: 7rem;
	}

	.up-b {
		top: 0;
	}

	.down-b {
		top: 87%;
	}

	.prev-b,
	.next-b {
		top: 50%;
		transform: translateY(-50%);
		width: 6rem;
		height: 20rem;
	}

	.prev-b {
		left: 0;
	}

	.next-b {
		right: 0;
	}
</style>

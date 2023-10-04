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
	import 'swiper/css'
	import 'swiper/css/navigation'
	import 'swiper/css/pagination'
	import type Swiper from 'swiper/types/swiper-class.js'
	import type { SwiperOptions } from 'swiper/types/swiper-options.js'
	import { urlFor } from '$lib/config/images.js'
	import { Drawer, getDrawerStore, getModalStore } from '@skeletonlabs/skeleton'
	import type { DrawerSettings, ModalComponent, ModalSettings } from '@skeletonlabs/skeleton'
	import ProjectModal from '$lib/components/ProjectModal.svelte'
	import type { Project } from '$lib/types/project.js'
	import InfoModal from '$lib/components/InfoModal.svelte'

	const modalStore = getModalStore()
	const drawerStore = getDrawerStore()

	// register()

	export let data
	let projects: Project[] = data.projects
	// let dataFetched: boolean = false

	const swiperParamsOuter: SwiperOptions = {
		// modules: [Navigation, Pagination, HashNavigation, Keyboard, Mousewheel],
		direction: 'vertical',
		spaceBetween: 8,
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
		// nested: true,
		// centeredSlides: true,
		// centeredSlidesBounds: true,
		// slidesPerView: 2,
		// hashNavigation: {
		// 	watchState: true,
		// },
	}

	const swiperParamsInner: SwiperOptions = {
		// modules: [Navigation, Pagination, Keyboard],
		spaceBetween: 8,
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
		slidesPerGroupAuto: true,
	}

	let swiper: Swiper
	let swiper2: Swiper
	// let swiperElOuter

	onMount(() => {
		// swiperElOuter = document.querySelector('outer-container')
		// const swiperElInner: any = document.getElementsByClassName('inner-container')

		// Object.assign(swiperElOuter, swiperParamsOuter)
		// swiperElOuter?.initialize()

		// swiperElInner.forEach((el: any) => {
		// 	Object.assign(el, swiperParamsInner)
		// 	swiperElInner?.initialize()
		// })

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
					circle.style.transform = 'translate(-9999px, -9999px)' // Move the circle out of the viewport
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
		console.log(activeId)
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
			{#each projects as project}
				<li>
					<button
						class="h3"
						on:click={() => drawerStore.close()}
						on:click={() => swiper.slideTo(project.index)}>{project.title}</button
					>
				</li>
			{/each}
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

<!-- <swiper-container
	class="outer-container"
	direction={'vertical'}
	space-between={8}
	pagination={{
		el: '.swiper-pagination',
	}}
	navigation={{
		nextEl: '.down-b',
		prevEl: '.up-b',
	}}
	keyboard={true}
	mousewheel={true}
>
	{#each projects as project (project.index)}
		<swiper-slide>
			<swiper-container
				space-between={8}
				pagination={{
					el: '.swiper-pagination',
				}}
				keyboard={true}
				slider-per-view={'auto'}
				slider-per-group-auto={true}
			>
				{#each project.gallery as image}
					<swiper-slide class="max-w-fit" lazy={true}>
						<img
							class="block h-full w-full max-h-max"
							src={image.image && urlFor(image.image).fit('clip').quality(5).url()}
							alt={image.slug}
							loading={'lazy'}
						/>
					</swiper-slide>
				{/each}
			</swiper-container>
		</swiper-slide>
		<div class="swiper-pagination" />
	{/each}
	<button class="swiper-button-prev up-b box" />
	<button class="swiper-button-next down-b box" />
</swiper-container> -->

<div class="swiper my-swiper-outer max-h-screen swiper-h h-full w-full">
	<div class="swiper-wrapper">
		{#each projects as project}
			<div class="swiper-slide">
				<div class="swiper my-swiper-inner swiper-v h-full w-full max-h-fit">
					<div class="swiper-wrapper">
						{#each project.gallery as image}
							<img
								class="swiper-slide max-h-screen h-max max-w-fit w-max"
								src={image && urlFor(image.image).quality(25).url()}
								loading="lazy"
								alt={image.slug && image.slug}
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

<!-- 
class="swiper-slide max-h-screen h-max max-w-fit w-max" 
class="swiper-slide block h-full w-full max-w-max max-h-max"
-->

<style>
	/* swiper-container {
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
	} */

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

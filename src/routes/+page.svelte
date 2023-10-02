<script lang="ts">
	import { onMount } from 'svelte'
	import Swiper from 'swiper'
	import {
		HashNavigation,
		Navigation,
		Pagination,
		Scrollbar,
		A11y,
		Keyboard,
		Mousewheel,
	} from 'swiper/modules'
	import 'swiper/css'
	import 'swiper/css/navigation'
	import 'swiper/css/pagination'
	import type { SwiperOptions } from 'swiper/types/swiper-options.js'
	import { urlFor } from '$lib/config/images.js'
	import { Drawer, getDrawerStore, getModalStore } from '@skeletonlabs/skeleton'
	import type { DrawerSettings, ModalComponent, ModalSettings } from '@skeletonlabs/skeleton'
	import ProjectModal from '$lib/components/ProjectModal.svelte'
	import type { Project } from '$lib/types/project.js'
	import Icon from '@iconify/svelte'
	import InfoModal from '$lib/components/InfoModal.svelte'

	const modalStore = getModalStore()
	const drawerStore = getDrawerStore()

	export let data
	let projects: Project[] = data.projects

	const swiperParamsOuter: SwiperOptions = {
		modules: [Navigation, Pagination, HashNavigation, Scrollbar, A11y, Keyboard, Mousewheel],
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
		scrollbar: false,
		mousewheel: true,
		// nested: true,
		// centeredSlides: true,
		// centeredSlidesBounds: true,
		// slidesPerView: 2,
		hashNavigation: {
			watchState: true,
		},
	}

	const swiperParamsInner: SwiperOptions = {
		modules: [Navigation, Pagination, Keyboard],
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

	onMount(() => {
		swiper = new Swiper('.my-swiper-outer', swiperParamsOuter)
		swiper2 = new Swiper('.my-swiper-inner', swiperParamsInner)

		var circle = document.querySelector<HTMLElement>('.circle')
		var boxes = document.querySelectorAll<HTMLElement>('.box')

		document.addEventListener('mousemove', function (event) {
			var isInBox = false

			// Check if the event target is inside any of the boxes

			// boxes.forEach((el) => {
			// 	if (el.contains(event.target)) {
			// 		isInBox = true
			// 		return
			// 	}
			// })

			// for (var i = 0; i < boxes.length; i++) {
			// 	if (boxes[i].contains(event.target)) {
			// 		isInBox = true
			// 		break
			// 	}
			// }

			// if (isInBox) {
			// 	if (circle) {
			// 		circle.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
			// 	}
			// } else {
			// 	if (circle) {
			// 		circle.style.transform = 'translate(-9999px, -9999px)' // Move the circle out of the viewport
			// 	}
			// }
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

	const projectModalOpen = (project: Project) => {
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

<!-- goto(`#${project.project}`, { replaceState: true, invalidateAll: true }) -->

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

<div class="swiper my-swiper-outer h-full max-h-screen w-full">
	<div class="swiper-wrapper">
		{#each projects as project (project.index)}
			<div data-hash={project.project} class="swiper-slide">
				<button class="absolute top-2 right-2 z-10" on:click={() => projectModalOpen(project)}>
					<Icon icon="ph:plus-bold" width="30" height="30" />
				</button>
				<div class="swiper my-swiper-inner h-max w-full">
					<div class="swiper-wrapper">
						{#each project.gallery as image}
							<img
								class="max-h-screen h-max max-w-fit w-max swiper-slide my-auto"
								src={image && urlFor(image.image).auto('format').fit('max').url()}
								alt={image.slug}
							/>
						{/each}
					</div>
					<div class="swiper-pagination" />

					<button class="prev-b swiper-button-prev box" />
					<button class="next-b swiper-button-next box" />
				</div>
			</div>
		{/each}
	</div>
	<div class="swiper-pagination" />
	<button class="up-b swiper-button-prev box" />
	<button class="down-b swiper-button-next box" />
</div>

<style>
	.inverted-text {
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		background-clip: text;
		background-color: white;
		mix-blend-mode: difference;
		position: absolute;

		/* font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; */
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		/* font-family: fantasy; */
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

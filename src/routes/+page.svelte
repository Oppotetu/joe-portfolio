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
	import { goto } from '$app/navigation'

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
		scrollbar: true,
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

		var circle = document.querySelector('.circle')
		var boxes = document.querySelectorAll('.box')

		document.addEventListener('mousemove', function (event) {
			var isInBox = false

			// Check if the event target is inside any of the boxes
			for (var i = 0; i < boxes.length; i++) {
				if (boxes[i].contains(event.target)) {
					isInBox = true
					break
				}
			}

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
		rounded: 'rounded-none',
	}

	const drawerOpen = () => {
		drawerStore.open(drawerSettings)
	}
</script>

<Drawer>
	{#if $drawerStore.id === 'menu'}
		<ul class="list p-4 space-y-2">
			<li><button>Info</button></li>
			<li><a href="/">Instagram</a></li>
			{#each projects as project}
				<li>
					<button
						class="h4"
						on:click={() => drawerStore.close()}
						on:click={() =>
							goto(`#${project.project}`, { replaceState: true, invalidateAll: true })}
						>{project.title}</button
					>
				</li>
			{/each}
		</ul>
	{/if}
</Drawer>

<div class="circle" />
<div class="shape" />
<button on:click={drawerOpen} class="lg:text-7xl text-5xl border-4 top-1 left-1 z-30 inverted-text"
	>Johannes</button
>

<div class="swiper my-swiper-outer h-full max-h-screen w-full">
	<div class="swiper-wrapper">
		{#each projects as project}
			<div data-hash={project.project} class="swiper-slide">
				<button class="absolute top-2 right-2 z-10" on:click={() => modalOpen(project)}>
					<Icon icon="ph:plus-bold" width="30" height="30" />
				</button>
				<div class="swiper my-swiper-inner h-max w-full">
					<div class="swiper-wrapper">
						{#each project.gallery as image}
							<img
								class="max-h-screen h-max max-w-fit w-max swiper-slide"
								src={image && urlFor(image.image).url()}
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

<!-- cursor: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="45" height="45" viewBox="0 0 512 512"%3E%3Cg transform="rotate(0 256 256)"%3E%3Cpath fill="currentColor" d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48Zm107.31 259.31a16 16 0 0 1-22.62 0L256 222.63l-84.69 84.68a16 16 0 0 1-22.62-22.62l96-96a16 16 0 0 1 22.62 0l96 96a16 16 0 0 1 0 22.62Z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')
16 16,
pointer;  -->

<style>
	.inverted-text {
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		background-clip: text;
		background-color: white;
		mix-blend-mode: difference;
		position: absolute;

		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		/* font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
		text-align: center;
	}

	.shape {
		width: 100%;
		height: 100%;
		top: 0%;
		left: 0%;
		background-color: white;
		position: absolute;
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

	/* .circle {
		-webkit-background-clip: border-box;
		background-clip: border-box;
	}

	.circle {
		width: 40px;
		height: 40px;
		border: 3px solid white;
		border-radius: 50%;
		position: absolute;
		box-shadow: 2px -3px 41px -1px rgba(250, 250, 250, 0.64);
		transition: all 0.1s linear;
		pointer-events: none;
		mix-blend-mode: difference;
		background: white;
	} */

	.swiper-button-next,
	.swiper-button-prev {
		cursor: none;
	}

	.swiper-button-next::after,
	.swiper-button-prev::after {
		content: '';
	}

	/* 
	.swiper-button-next:before,
	.swiper-button-prev:before {
		z-index: 999;
		background: radial-gradient(farthest-side, #fff 95%, transparent 100%) calc(var(--x) - 0.75em)
			calc(var(--y) - 0.75em) / 1.5em 1.5em fixed no-repeat;
		mix-blend-mode: difference;
	} */

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

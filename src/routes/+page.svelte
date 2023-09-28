<script lang="ts">
	import { onMount } from 'svelte'
	import Swiper from 'swiper'
	import { HashNavigation, Navigation, Pagination, History, Scrollbar, A11y } from 'swiper/modules'
	import 'swiper/css'
	import 'swiper/css/navigation'
	import 'swiper/css/pagination'
	import 'swiper/css/history'
	import type { SwiperOptions } from 'swiper/types/swiper-options.js'
	import { urlFor } from '$lib/config/images.js'
	import { getDrawerStore, getModalStore } from '@skeletonlabs/skeleton'
	import type { DrawerSettings, ModalComponent, ModalSettings } from '@skeletonlabs/skeleton'
	import ProjectModal from '$lib/components/ProjectModal.svelte'
	import type { Project } from '$lib/types/project.js'

	const modalStore = getModalStore()
	const drawerStore = getDrawerStore()

	export let data
	let projects: Project[] = data.projects

	const swiperParamsOuter: SwiperOptions = {
		modules: [Navigation, Pagination, HashNavigation, Scrollbar, A11y],
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
		modules: [Navigation, Pagination],
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

<!-- <svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-element-bundle.min.js"></script>
</svelte:head> -->

<div class="swiper my-swiper-outer h-full max-h-screen w-full">
	<button
		on:click={drawerOpen}
		class=" bg-white text-7xl border-4 mix-blend-difference absolute top-1 left-1 z-50 trns-text"
		>Joey_Crakc</button
	>
	<div class="shape w-full h-44 absolute top-0 left-0 bg-white" />
	<div class="swiper-wrapper">
		{#each projects as project}
			<div data-hash={project.project} class="swiper-slide">
				<button class="absolute top-2 right-2 z-10" on:click={() => modalOpen(project)}
					>Project</button
				>
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

					<button class="swiper-button-prev prev-b" />
					<button class="swiper-button-next next-b" />
				</div>
			</div>
		{/each}
	</div>
	<div class="swiper-pagination" />
	<button class="swiper-button-prev up-b" />
	<button class="swiper-button-next down-b" />
</div>

<style>
	.trns-text {
		/* background: url(https://www.yachtandboat.com/wp-content/uploads/2018/12/hero-image-2.jpg) -20px -20px
			no-repeat; */
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		background-clip: text;
		/* Below is not needed */
		/* display: block; */
		/* font-size: 200px; */
		font-weight: 300;
		font-family: arial;
		text-align: center;
		/* margin-top: -20px; */
		/* font-weight: bold; */
		/* letter-spacing: -25px; */
		/* background-size: cover; */
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

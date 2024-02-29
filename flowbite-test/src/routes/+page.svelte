<script lang="ts">
	import HomeEmblem from '$lib/components/HomeEmblem.svelte'
	import Swiper from '$lib/components/Swiper.svelte'
	import type { Project } from '$lib/types/project.js'
	import { projectStore } from '$lib/utils/stores.js'
	// import { lake } from '../../../assets/lake.jpg'
	// import { ship } from '../../../assets/ship.jpg'

	export let data
	let projects: Project[] = data.projects

	// let project = projects[1]

	$projectStore = 0

	$: projectStore

	function getProject() {
		projectStore.subscribe((value) => projects[value])
	}
</script>

<!-- <pre> -->
<!--   {JSON.stringify(data, null, 2)} -->
<!-- </pre> -->

<div class="bg-white h-full w-full absolute">
	<HomeEmblem {projects} {projectStore}></HomeEmblem>

	<button class="absolute lg:text-7xl md:text-5xl text-3xl z-30 top-0 right-4 inverted-text">
		+
	</button>

	<Swiper project={projects[$projectStore]}></Swiper>
</div>
<!-- <style> -->
<!-- 	.slider-image { -->
<!-- 		height: 100svh; -->
<!-- 	} -->
<!-- </style> -->

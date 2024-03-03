<script lang="ts">
	import HomeEmblem from '$lib/components/HomeEmblem.svelte'
	import Swiper from '$lib/components/Swiper.svelte'
	import { urlFor } from '$lib/config/images.js'
	import type { Project } from '$lib/types/project.js'
	import type { ProjectList } from '$lib/types/projectList.js'

	export let data
	$: project = data.project
	// let project: Project = data.project
	let projectList: ProjectList = data.projectList

	// $: (() => {
	// 	fetchData()
	// }).watch(useParams())

	// let project = projects[1]

	// $projectStore = ''

	// $: projectStore

	// function getProject() {
	// 	projectStore.subscribe((value) => project[value])
	// }
</script>

<div class="bg-white h-full w-full absolute">
	<HomeEmblem {projectList}></HomeEmblem>

	<button class="absolute lg:text-7xl md:text-5xl text-3xl z-30 top-0 right-4 inverted-text">
		+
	</button>

	<Swiper {project}></Swiper>
</div>

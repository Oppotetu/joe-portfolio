<script lang="ts">
	import '../app.pcss'
	import HomeEmblem from '$lib/components/HomeEmblem.svelte'
	import type { ProjectList } from '$lib/types/projectList.ts'
	import Details from '$lib/components/Details.svelte'

	export let data

	let projectList: ProjectList = data.projectList
</script>

<div class="bg-white h-full w-full absolute z-0">
	<HomeEmblem {projectList}></HomeEmblem>

	<Details />

	<!-- <button class="absolute lg:text-7xl md:text-5xl text-3xl z-30 top-0 right-4 inverted-text">
		+
	</button> -->

	<slot />
</div>

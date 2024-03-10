<script lang="ts">
	import '../app.pcss'
	import HomeEmblem from '$lib/components/HomeEmblem.svelte'
	// import VaulDrawer from '$lib/components/VaulDrawer.svelte'
	// import { urlFor } from '$lib/config/images.js'
	// import type { Project } from '$lib/types/project.js'
	import type { ProjectList } from '$lib/types/projectList.ts'

	export let data

	let projectList: ProjectList = data.projectList
</script>

<div class="bg-white h-full w-full absolute z-0">
	<HomeEmblem {projectList}></HomeEmblem>

	<button class="absolute lg:text-7xl md:text-5xl text-3xl z-30 top-0 right-4 inverted-text">
		+
	</button>

	<slot />
</div>

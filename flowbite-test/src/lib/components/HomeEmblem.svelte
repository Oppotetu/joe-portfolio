<script lang="ts">
	import { Drawer, CloseButton } from 'flowbite-svelte'
	import { sineIn } from 'svelte/easing'
	import type { Project } from '$lib/types/project'
	import type { Writable } from 'svelte/store'
	import { page } from '$app/stores'
	import type { ProjectList } from '$lib/types/projectList'
	import { goto } from '$app/navigation'

	export let projectList: ProjectList
	// export let projectStore: Writable<string>
	const searchParams = new URLSearchParams()

	function go(projectSlug: string) {
		searchParams.set('project', projectSlug)
		goto(`?${searchParams.toString()}`)
	}

	let hidden = true
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	}
</script>

<button
	on:click={() => (hidden = false)}
	class="absolute lg:text-7xl md:text-5xl text-3xl z-30 border-4 top-1 left-1 inverted-text"
>
	JD
</button>

<Drawer transitionType="fly" {transitionParams} bind:hidden id="sidebar1">
	<ul class="list p-4 space-y-2">
		<li class="flex items-center">
			<h2 class="text-xl font-bold">INFO</h2>
			<CloseButton on:click={() => (hidden = true)} class="mb-4 justify-self-end dark:text-white" />
		</li>
		<li><a class="text-xl font-bold" href="/">INSTAGRAM</a></li>

		{#each projectList as project}
			<li>
				<a href="?project={project.slug}" on:click={() => (hidden = true)} class="text-xl font-bold"
					>{project.title}</a
				>
			</li>
		{/each}
	</ul>

	<!-- on:click={() => projectStore.set(project.slug)}
					on:click={() => $page.url.searchParams.set('project', project.slug)} -->

	<!-- <div class="flex items-center"> -->
	<!-- 	<h5 -->
	<!-- 		id="drawer-label" -->
	<!-- 		class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400" -->
	<!-- 	> -->
	<!-- 		Info -->
	<!-- 	</h5> -->
	<!-- 	<CloseButton on:click={() => (hidden1 = true)} class="mb-4 dark:text-white" /> -->
	<!-- </div> -->
	<!-- <p class="mb-6">heyhey</p> -->
	<!-- <div class="grid grid-cols-2 gap-4"> -->
	<!-- 	<Button color="light" href="/">button</Button> -->
	<!-- 	<Button href="/" class="px-4">button</Button> -->
	<!-- </div> -->
</Drawer>

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
</style>

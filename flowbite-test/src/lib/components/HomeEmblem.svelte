<script lang="ts">
	import { sineIn } from 'svelte/easing'
	// import type { Project } from '$lib/types/project'
	// import type { Writable } from 'svelte/store'
	import { page } from '$app/stores'
	import type { ProjectList } from '$lib/types/projectList'
	// import { goto } from '$app/navigation'
	import {
		Drawer,
		CloseButton,
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte'

	export let projectList: ProjectList

	let hidden: boolean
	let path = $page.url.pathname
	let params = $page.url.searchParams.get('project')
	let activeUrl: string

	$: {
		if (path && params) {
			activeUrl = `${path}?project=${params}`
			console.log(activeUrl)
		}
	}

	// export let projectStore: Writable<string>
	// const searchParams = new URLSearchParams()

	// function go(projectSlug: string) {
	// 	searchParams.set('project', projectSlug)
	// 	goto(`?${searchParams.toString()}`)
	// }

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	}
</script>

<button
	on:click={() => (hidden = false)}
	class="absolute lg:text-7xl md:text-5xl text-3xl z-30 p-1 border-4 top-1 left-1 inverted-text"
>
	JD
</button>

<Drawer transitionType="fly" {transitionParams} bind:hidden id="sidebar1">
	<Sidebar {activeUrl}>
		<SidebarWrapper class="bg-white">
			<SidebarGroup class="w-full">
				<SidebarItem label="INFO" class="text-xl" on:click={() => (hidden = true)}></SidebarItem>
				<SidebarItem label="INSTAGRAM" class="text-xl" on:click={() => (hidden = true)}
				></SidebarItem>
			</SidebarGroup>
			<SidebarGroup border>
				{#each projectList as project}
					<SidebarItem
						label={project.title}
						href={project.slug}
						class="text-xl"
						on:click={() => (hidden = true)}
					></SidebarItem>
				{/each}
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</Drawer>

<!-- on:click={() => projectStore.set(project.slug)} -->
<!-- on:click={() => $page.url.searchParams.set('project', project.slug)} -->
<!-- <CloseButton on:click={() => (hidden = true)} class="mb-4 justify-self-end" /> -->

<style>
	.inverted-text {
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		background-clip: text;
		background-color: white;
		mix-blend-mode: difference;
		position: absolute;

		/* font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
		text-align: center;
		text-justify: center;
	}
</style>

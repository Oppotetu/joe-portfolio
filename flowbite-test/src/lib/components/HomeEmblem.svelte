<script lang="ts">
	import { sineIn } from 'svelte/easing'
	import type { ProjectList } from '$lib/types/projectList'
	import { Drawer, Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte'
	import { activeStore } from '$lib/utils/stores'

	export let projectList: ProjectList

	let hidden: boolean

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

<Drawer
	class="border-r border-gray-200"
	transitionType="fly"
	backdrop={false}
	{transitionParams}
	bind:hidden
	id="sidebar1"
>
	<Sidebar activeUrl={$activeStore} class="w-full">
		<SidebarWrapper class="bg-white">
			<SidebarGroup>
				<SidebarItem label="INFO" class="text-xl" on:click={() => (hidden = true)}></SidebarItem>
				<SidebarItem label="INSTAGRAM" class="text-xl" on:click={() => (hidden = true)}
				></SidebarItem>
			</SidebarGroup>
			<SidebarGroup border>
				{#each projectList as project}
					<SidebarItem
						label={project.title}
						href={project.slug}
						class="text-xl px-0"
						on:click={() => (hidden = true)}
						on:click={() => activeStore.set(project.slug)}
					></SidebarItem>
				{/each}
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</Drawer>

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

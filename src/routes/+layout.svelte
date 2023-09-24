<script lang="ts">
	import { goto } from '$app/navigation'
	import '../app.postcss'
	import { AppBar, LightSwitch, Modal, Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
	import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton'
	import { initializeStores } from '@skeletonlabs/skeleton'

	initializeStores()
	const drawerStore = getDrawerStore()

	export let data
	let { projects } = data

	// import function to register Swiper custom elements
	import { register } from 'swiper/element/bundle'
	// register Swiper custom elements
	register()
</script>

<Modal />
<Drawer>
	{#if $drawerStore.id === 'menu'}
		<ul class="list p-4 space-y-2">
			<li><a href="/">Instagram</a></li>
			<li class="float-right pt-2"><LightSwitch /></li>
			{#each projects as project}
				<li>
					<button
						class="h4"
						on:click={() => drawerStore.close()}
						on:click={() => goto(`#${project.project}`)}>{project.title}</button
					>
				</li>
			{/each}
		</ul>
	{/if}
</Drawer>

<!-- <div class="absolute items-center top-4 left-4 space-x-4 flex flex-row">
	<a class="h1 hover-underline-animation z-50" href="/">Joey_Crakc</a>
	{#if $page.url.pathname == '/'}
		<a class="h1 hover-underline-animation z-50" href="info">Info</a>
		<LightSwitch />
	{/if}
</div> -->

<!-- <div class="h-32 bg-transparent flex items-center flex-row p-4 space-x-4"> -->
<!-- <AppBar>
	<svelte:fragment slot="lead">
		<button class="h3">Joey_Crakc</button>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<LightSwitch />
	</svelte:fragment>
</AppBar> -->
<!-- </div> -->

<slot />

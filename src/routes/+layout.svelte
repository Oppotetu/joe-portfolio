<script lang="ts">
	import { goto } from '$app/navigation'
	import type { Project } from '$lib/types/project'
	import '../app.postcss'
	import { AppBar, LightSwitch, Modal, Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
	import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton'
	import { initializeStores } from '@skeletonlabs/skeleton'

	initializeStores()
	const drawerStore = getDrawerStore()

	export let data
	let projects: Project[] = data.projects

	// // import function to register Swiper custom elements
	// import { register } from 'swiper/element/bundle'
	// // register Swiper custom elements
	// register()
</script>

<Modal />

<slot />

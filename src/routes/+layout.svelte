<script lang="ts">
	import { goto } from '$app/navigation'
	import InfoModal from '$lib/components/InfoModal.svelte'
	import ProjectModal from '$lib/components/ProjectModal.svelte'
	import type { Project } from '$lib/types/project'
	import '../app.postcss'
	import { AppBar, LightSwitch, Modal, Drawer, getDrawerStore } from '@skeletonlabs/skeleton'
	import type { DrawerSettings, DrawerStore, ModalComponent } from '@skeletonlabs/skeleton'
	import { initializeStores } from '@skeletonlabs/skeleton'

	initializeStores()
	// const drawerStore = getDrawerStore()

	export let data
	let projects: Project[] = data.projects
</script>

<Modal />

<slot />

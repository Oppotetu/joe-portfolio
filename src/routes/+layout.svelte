<script lang="ts">
	import '../app.postcss'
	import { Modal } from '@skeletonlabs/skeleton'
	import { initializeStores } from '@skeletonlabs/skeleton'

	initializeStores()
	// const drawerStore = getDrawerStore()

	// export let data
	// let projects: Project[] = data.projects
</script>

<Modal />

<slot />

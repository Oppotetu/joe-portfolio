<script lang="ts">
	import Swiper from '$lib/components/Swiper.svelte'

	export let data
	$: project = data.project
</script>

<Swiper {project}></Swiper>

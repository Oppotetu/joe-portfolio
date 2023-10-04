<script lang="ts">
	import type { Project } from '$lib/types/project'
	import { onMount } from 'svelte'

	export let project: Project

	const serverDate = project.publisert
	const dateObj = new Date(serverDate)
	const dateOptions = { day: '2-digit', month: 'long', year: 'numeric' }
	const formattedDate = dateObj.toLocaleDateString('en-US', dateOptions)

	// onMount(() => {
	// 	document.getElementById('modal-div')?.addEventListener('keydown', function (e) {
	// 		if (e.key == 'ArrowDown') {
	// 			console.log(e.key)
	// 		}
	// 	})
	// })
</script>

<div class="flex flex-col p-4">
	{#if project.title}
		<h1 class="h1 pb-6">{project.title}</h1>
	{/if}
	{#if project.authors}
		<div class="grid grid-cols-2">
			{#each project.authors as author}
				<p>{author}</p>
			{/each}
		</div>
	{/if}
	<br />
	{#if project.oppsummering}
		<p>{project.oppsummering}</p>
	{/if}
	<br />
	{#if formattedDate}
		<p>Publication date: {formattedDate}</p>
	{/if}
	{#if project.squareFootage}
		<p>Square Footage: {project.squareFootage}</p>
	{/if}
</div>

<script lang="ts">
	import type { Project } from '$lib/types/project'

	export let project: Project
	// let { title, authors, oppsummering, publisert, squareFootage } = project
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
	<!-- {#if oppsummering}
  <p>{oppsummering}</p>
  {/if} -->
	<br />
	{#if project.publisert}
		<p>Publication date: {project.publisert}</p>
	{/if}
	{#if project.squareFootage}
		<p>Square Footage: {project.squareFootage}</p>
	{/if}
</div>

<script lang="ts">
	import { urlFor } from '$lib/config/images'
	import type { Image } from '$lib/types/image'

	export let image: Image
</script>

<a href={`${image.project}/#slide${image.index}`} class="card-hover h-max">
	<img
		class="h-auto max-w-full"
		src={image.image && urlFor(image.image).auto('format').fit('max').width(720).url()}
		alt={image.slug}
	/>
</a>

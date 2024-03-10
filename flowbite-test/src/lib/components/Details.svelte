<script>
	import { SpeedDial, SpeedDialButton } from 'flowbite-svelte'
	import { Drawer, Button, CloseButton } from 'flowbite-svelte'
	import { sineIn } from 'svelte/easing'
	import SpeedDialCustom from './SpeedDialCustom.svelte'

	let hidden = true
	let open = false
	const handleClick = () => {
		console.log('handling click')
		hidden = false
		open = true
	}

	let transitionParams = {
		x: 320,
		duration: 200,
		easing: sineIn
	}
</script>

<SpeedDialCustom
	{handleClick}
	bind:open
	trigger="click"
	color="light"
	defaultClass="absolute end-2 top-2 z-[100]"
></SpeedDialCustom>

<!-- <Drawer transitionType="fly" placement="right" {transitionParams} bind:hidden id="sidebar2">
	<div class="flex items-center">
		<CloseButton on:click={handleClose} class="mb-4 dark:text-white" />
	</div>
	<p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
		Supercharge your hiring by taking advantage of our <a
			href="/"
			class="text-primary-600 underline dark:text-primary-500 hover:no-underline"
		>
			limited-time sale
		</a>
		for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design
		job board.
	</p>
</Drawer> -->

<!-- <SpeedDial
	bind:open
	trigger="click"
	color="light"
	defaultClass="absolute end-6 bottom-6 z-50"
	on:click={() => (open = false)}
	on:click={() => console.log('hello')}
>
	<SpeedDialButton name="Share">
		<p>hello</p>
	</SpeedDialButton>
	<SpeedDialButton name="Print">
		<p>hello again</p>
	</SpeedDialButton>
	<SpeedDialButton name="Download">
		<p>hello wordl</p>
	</SpeedDialButton>
	<SpeedDialButton name="Copy">
		<p>yoho</p>
	</SpeedDialButton>
</SpeedDial> -->

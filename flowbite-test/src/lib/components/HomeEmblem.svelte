<script>
	import { Drawer, Button, CloseButton } from 'flowbite-svelte'
	// import { InfoCircleSolid, ArrowRightOutline } from 'flowbite-svelte-icons'
	import { sineIn } from 'svelte/easing'
	let hidden1 = true
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	}
</script>

<div class="bg-white h-full w-full absolute">
	<button
		on:click={() => (hidden1 = false)}
		class="absolute lg:text-7xl md:text-5xl text-3xl z-30 border-4 top-1 left-1 inverted-text"
	>
		JOHANNES
	</button>
</div>

<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden1} id="sidebar1">
	<ul class="flex flex-col">
		<li class="flex items-center">
			<h2 class="">Info</h2>
			<CloseButton
				on:click={() => (hidden1 = true)}
				class="mb-4 justify-self-end dark:text-white"
			/>
		</li>
		<li>
			<h2>hellolhello</h2>
		</li>

		<li>
			<h2>hellolhello</h2>
		</li>
		<li>
			<h2>hellolhello</h2>
		</li>
		<li>
			<h2>hellolhello</h2>
		</li>
	</ul>

	<!-- <div class="flex items-center"> -->
	<!-- 	<h5 -->
	<!-- 		id="drawer-label" -->
	<!-- 		class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400" -->
	<!-- 	> -->
	<!-- 		Info -->
	<!-- 	</h5> -->
	<!-- 	<CloseButton on:click={() => (hidden1 = true)} class="mb-4 dark:text-white" /> -->
	<!-- </div> -->
	<!-- <p class="mb-6">heyhey</p> -->
	<!-- <div class="grid grid-cols-2 gap-4"> -->
	<!-- 	<Button color="light" href="/">button</Button> -->
	<!-- 	<Button href="/" class="px-4">button</Button> -->
	<!-- </div> -->
</Drawer>

<style>
	.inverted-text {
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		background-clip: text;
		background-color: white;
		mix-blend-mode: difference;
		position: absolute;

		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		text-align: center;
	}
</style>

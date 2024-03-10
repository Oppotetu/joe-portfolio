<script context="module" lang="ts">
	import type { Placement } from '@floating-ui/dom'

	export interface SpeedCtxType {
		pill: boolean
		tooltip: Placement | 'none'
		textOutside: boolean
	}
</script>

<script lang="ts">
	import { twMerge } from 'tailwind-merge'
	import Popper from 'flowbite-svelte/Popper.svelte'
	// import Popper from '$lib/components/Popper.svelte'
	import { setContext } from 'svelte'
	// import GradientButton from '$lib/buttons/GradientButton.svelte'
	import { Drawer, Button, CloseButton } from 'flowbite-svelte'
	import { sineIn } from 'svelte/easing'

	let n = Date.now()

	function generateId() {
		return (++n).toString(36)
	}

	export let defaultClass: string = 'fixed end-6 bottom-6'
	export let popperDefaultClass: string = 'flex items-center mb-4 gap-2'
	export let placement: Placement = 'top'
	export let pill: boolean = true
	export let tooltip: Placement | 'none' = 'left'
	export let trigger: 'hover' | 'click' = 'hover'
	export let textOutside: boolean = false
	export let id: string = generateId()
	export let name: string = 'Open actions menu'
	export let checked: boolean = false

	let open: boolean = false
	let hidden: boolean = true

	const handleClick = () => {
		if (open === false) {
			open = true
			hidden = false
		} else {
			open = false
			hidden = true
		}
	}
	const showHandler = (ev: Event) => {
		open = ev.type === 'click' ? !open : true
	}

	setContext<SpeedCtxType>('speed-dial', { pill, tooltip, textOutside })

	let divClass: string
	$: divClass = twMerge(defaultClass, 'group', $$props.class)

	let poperClass: string
	$: poperClass = twMerge(
		popperDefaultClass,
		['top', 'bottom'].includes(placement.split('-')[0]) && 'flex-col'
	)

	let transitionParams = {
		x: 320,
		duration: 200,
		easing: sineIn
	}
</script>

<div class={divClass}>
	<Button
		on:click={handleClick}
		{pill}
		{name}
		aria-controls={id}
		aria-expanded={open}
		{...$$restProps}
		class="!p-3 "
		{checked}
	>
		<slot name="icon">
			<svg
				aria-hidden="true"
				class="w-8 h-8 transition-transform group-hover:rotate-45"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 6v6m0 0v6m0-6h6m-6 0H6"
				/>
			</svg>
		</slot>
		<span class="sr-only">{name}</span>
	</Button>

	<Drawer
		transitionType="fly"
		placement="right"
		backdrop={false}
		{transitionParams}
		bind:hidden
		id="sidebar2"
		class="-z-10 border-l border-gray-200"
	>
		<p class="mb-6 mt-20 text-sm text-gray-500 dark:text-gray-400">
			Supercharge your hiring by taking advantage of our <a
				href="/"
				class="text-primary-600 underline dark:text-primary-500 hover:no-underline"
			>
				limited-time sale
			</a>
			for Flowbite Docs + Job Board. Unlimited access to over 190K top-ranked candidates and the #1 design
			job board.
		</p>
	</Drawer>

	<!-- <Popper
		{id}
		{trigger}
		arrow={false}
		color="none"
		activeContent
		{placement}
		class={poperClass}
		bind:open
	>
		<slot />
	</Popper> -->
</div>

<!--
@component
[Go to docs](https://flowbite-svelte.com/)
## Props
@prop export let defaultClass: string = 'fixed end-6 bottom-6';
@prop export let popperDefaultClass: string = 'flex items-center mb-4 gap-2';
@prop export let placement: Placement = 'top';
@prop export let pill: boolean = true;
@prop export let tooltip: Placement | 'none' = 'left';
@prop export let trigger: 'hover' | 'click' | 'focus' = 'hover';
@prop export let textOutside: boolean = false;
@prop export let id: string = generateId();
@prop export let name: string = 'Open actions menu';
@prop export let gradient: boolean = false;
@prop export let open: boolean = false;
-->

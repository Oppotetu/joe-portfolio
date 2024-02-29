<script lang="ts">
	import { onMount } from 'svelte'

	export let next

	onMount(() => {
		var circle = document.querySelector<HTMLElement>('.circle')

		if (circle) {
			circle.style.transform = 'translate(-9999px, -9999px)'
		}

		// var boxes = document.querySelectorAll<HTMLElement>('.box')

		document.addEventListener('mousemove', function (event) {
			var isInBox = false

			if (next.contains(event.target)) {
				isInBox = true
				return
			}

			// Check if the event target is inside any of the boxes

			// boxes?.forEach((el: any) => {
			// 	if (el.contains(event.target)) {
			// 		isInBox = true
			// 		return
			// 	}
			// })

			// for (var i = 0; i < boxes.length; i++) {
			// 	if (boxes[i].contains(event.target)) {
			// 		isInBox = true
			// 		break
			// 	}
			// }
			if (isInBox) {
				if (circle) {
					circle.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
				}
			} else {
				if (circle) {
					// Move the circle out of the viewport
					circle.style.transform = 'translate(-9999px, -9999px)'
				}
			}
		})
	})
</script>

<div class="circle" />

<style>
	.circle {
		position: fixed;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		z-index: 9999;
		pointer-events: none;
		transform: translate(-50%, -50%);

		-webkit-background-clip: border-box;
		background-clip: border-box;

		background-color: red;
		mix-blend-mode: difference;
	}
</style>

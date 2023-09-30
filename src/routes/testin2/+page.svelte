<script lang="ts">
	import { onMount } from 'svelte'

	onMount(() => {
		var circle = document.querySelector('.circle')
		var square = document.querySelector('.square')

		square.addEventListener('mouseenter', function () {
			circle.style.display = 'block'
		})

		square.addEventListener('mouseleave', function () {
			circle.style.display = 'none'
		})

		document.addEventListener('mousemove', function (e) {
			if (square.contains(e.target)) {
				circle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
			} else {
				circle.style.transform = 'translate(-9999px, -9999px)' // Move the circle out of the viewport
			}
		})

		// let circle = document.querySelector('.circle')

		// document.addEventListener('mousemove', function (e) {
		// 	circle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
		// })
	})
</script>

<div class="circle" />
<div class="square absolute top-5 left-5 h-96 w-96 bg-red-400" />

<style>
	.circle {
		position: fixed;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: red;
		z-index: 9999;
		pointer-events: none;
		transform: translate(-50%, -50%);
	}
</style>

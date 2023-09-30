<script lang="ts">
	import { onMount } from 'svelte'

	onMount(() => {
		var circle = document.querySelector('.circle')
		document.addEventListener('mousemove', function (e) {
			circle.style.left = e.clientX + 'px'
			circle.style.top = e.clientY + 'px'
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
		background-color: red;
		z-index: 9999;
		pointer-events: none; /* ensures that the circle doesn't interfere with mouse events */
	}
</style>

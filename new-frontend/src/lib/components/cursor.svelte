<script lang="ts">
  import { onMount } from 'svelte'

  onMount(() => {
    var circle = document.querySelector<HTMLElement>('.circle')

    if (circle) {
      circle.style.transform = 'translate(-9999px, -9999px)'
    }

    var boxes = document.querySelectorAll<HTMLElement>('.box')

    document.addEventListener('mousemove', function (event) {
      var isInBox = false
      // Check if the event target is inside any of the boxes
      boxes?.forEach((el: any) => {
        if (el.contains(event.target)) {
          isInBox = true
          return
        }
      })
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
<button class="box" />
<button class="box" />

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

    background-color: white;
    mix-blend-mode: difference;
  }
  .box {
    cursor: none;
  }

  .box {
    content: '';
  }

  .up-b,
  .down-b {
    left: 48%;
    transform: translate(-50%);
    width: 20rem;
    height: 7rem;
  }

  .up-b {
    top: 0;
  }

  .down-b {
    top: 87%;
  }

  .prev-b,
  .next-b {
    top: 50%;
    transform: translateY(-50%);
    width: 6rem;
    height: 20rem;
  }

  .prev-b {
    left: 0;
  }

  .next-b {
    right: 0;
  }
</style>

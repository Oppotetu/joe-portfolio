<script>
</script>

<button class="lg:text-7xl md:text-5xl text-3xl border-4 top-1 left-1 z-30 inverted-text">
  <slot />
</button>

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

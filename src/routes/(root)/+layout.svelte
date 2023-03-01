<script lang="ts">
  import '../../app.css';
  import Menu from '$lib/components/Menu.svelte';
  import Blob from '$lib/components/Blob.svelte';
</script>

<svelte:head>
  <title>Kush</title>
</svelte:head>
<Menu />
<div id="container">
  <div class="backdrop" />
  <Blob />
</div>
<slot />

<style>
  :global(body) {
    background-color: #1d1d1f;
    color: #ffffff;
    margin: 0;
    padding: 0;
    overflow-y: overlay;
    font-family: sans-serif;
    font-size: 1.2rem;
  }

  /* change scrollbar */
  :global(body::-webkit-scrollbar) {
    display: none;
  }
  :global(body) {
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }

  #container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    overflow: hidden;
    z-index: -1;
  }
  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(7vmax);
  }
</style>

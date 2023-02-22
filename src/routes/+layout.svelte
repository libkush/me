<script lang="ts">
  import Menu from '$lib/components/Menu.svelte';
</script>

<svelte:head>
  <title>Kush</title>
</svelte:head>
<Menu />
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
</style>

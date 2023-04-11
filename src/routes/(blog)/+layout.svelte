<script lang="ts">
  import '../../app.postcss';
  import '../../prism.css';
  import { page } from '$app/stores';
  import Menu from '$lib/components/Menu.svelte';
</script>

<Menu />
<div class="flex flex-col min-h-screen ">
  <div class="flex flex-col flex-grow w-full px-4 py-16 md:py-2">
    <main
      class="flex flex-col flex-grow w-full mx-auto"
      class:max-w-2xl={!$page.data.layout?.fullWidth}
    >
      <slot />
    </main>
  </div>
</div>

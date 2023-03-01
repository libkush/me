<script lang="ts">
  import '../../app.css';
  import '../../prism.css';
  import { page } from '$app/stores';
  import { name } from '$lib/info';
  import Menu from '$lib/components/Menu.svelte';
</script>

<Menu />
<div class="flex flex-col min-h-screen ">
  <div class="flex flex-col flex-grow w-full px-4 py-16 md:py-2">
    <header class="flex items-center  w-full max-w-2xl py-4 mx-auto lg:pb-8">
      <a
        class="text-lg text-center font-bold sm:text-2xl !text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-400"
        href="/"
      >
        {name}
      </a>
    </header>
    <main
      class="flex flex-col flex-grow w-full mx-auto"
      class:max-w-2xl={!$page.data.layout?.fullWidth}
    >
      <slot />
    </main>
  </div>
</div>

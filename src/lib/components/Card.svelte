<script land="ts">
  export let as = 'div';
  export let href = undefined;
  let _class = undefined;
  export { _class as class };
</script>

<svelte:element
  this={as}
  data-sveltekit-preload-data="hover"
  class={['flex flex-col items-start group', _class].join(' ')}
  class:postcard={$$slots.title}
>
  <slot name="eyebrow" />
  {#if $$slots.title}
    <div class="text-base font-semibold tracking-tight">
      {#if href}
        <a {href} data-sveltekit-preload-data="hover">
          <span class="absolute z-20 inset-y-0 inset-x-0" />
          <span class="relative z-10">
            <slot name="title" />
          </span>
        </a>
      {:else}
        <slot name="title" />
      {/if}
    </div>
  {/if}

  {#if $$slots.description}
    <div class="relative z-10 flex-1 text-sm" class:mt-2={!!$$slots.title}>
      <slot name="description" />
    </div>
  {/if}

  {#if $$slots.actions}
    <div aria-hidden="true" class="relative z-10 flex items-center mt-4">
      <slot name="actions" />
    </div>
  {/if}
</svelte:element>

<style lang="postcss">
  .postcard {
    @apply p-8 m-0 rounded-xl -translate-y-2 bg-rosePine-overlay relative border-solid border-r-[1px] border-b-[1px] border-black/30;
  }
  .postcard:after {
    content: '';
    height: 100px;
    width: 1px;
    right: -1px;
    top: 65%;
    @apply absolute transition-[top,opacity] opacity-0 ease-in-out duration-700 bg-gradient-to-b from-transparent via-rosePine-love to-transparent;
  }
  .postcard:after {
    top: 65%;
    opacity: 0;
  }

  .postcard:hover:after {
    top: 25%;
    opacity: 1;
  }
</style>

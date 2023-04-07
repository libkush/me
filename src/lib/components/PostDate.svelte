<script lang="ts">
  import { format, parseISO } from 'date-fns';

  export let decorate: any;
  export let post: App.BlogPost;
  export let collapsed = false;

  let _class: string;
  export { _class as class };
</script>

<div
  class={['relative z-10 font-bold mb-3 flex text-zinc-300', _class].join(' ')}
  class:pb-2={decorate}
>
  {#if decorate}
    <span class="absolute inset-x-0 bottom-0 flex items-center" aria-hidden="true">
      <span class="h-[0.05rem] md:w-3/4 w-full rounded-full bg-zinc-100/40" />
    </span>
  {/if}
  <div class="flex" class:flex-col={!collapsed}>
    <time datetime={post.date}>
      {format(new Date(parseISO(post.date)), 'MMMM d, yyyy').toLowerCase()}
    </time>
  </div>
</div>

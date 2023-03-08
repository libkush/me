<script lang="ts">
  import PostPreview from '$lib/components/PostPreview.svelte';
  import PostDate from '$lib/components/PostDate.svelte';
  import InfiniteScroll from 'svelte-infinite-scroll';
  import { onMount } from 'svelte';

  type Data = {
    posts: App.BlogPostWithNextAndPrevious[];
  };

  let page = 1;
  let posts: Data['posts'] = [];
  let newBatch: Data['posts'] = [];

  async function fetchData() {
    const response = (await fetch(`/api/posts?page=${page}`).then((res) =>
      res.json()
    )) as App.APIResponse;
    newBatch = response.posts;
  }

  onMount(() => {
    fetchData();
  });

  $: posts = [...posts, ...newBatch];
</script>

<div class="flex flex-col h-screen flex-grow w-full sm:m-auto gap-8">
  <section class="w-full h-full">
    <div class="posts p-6 pt-16 overflow-x-hidden max-h-full flex flex-col">
      {#each posts as post}
        <article
          class="md:border-l pb-8 pt-8 md:pl-6 md:border-zinc-100/40 md:w-3/5 m-auto grid items-start grid-cols-4 gap-8"
        >
          <PostDate class="flex-col hidden md:flex text-sm" {post} decorate />
          <div class="col-span-4 md:col-span-3">
            <PostPreview {post}>
              <slot slot="eyebrow">
                <PostDate class="md:hidden" {post} collapsed decorate />
              </slot>
            </PostPreview>
          </div>
        </article>
      {/each}
      <InfiniteScroll
        hasMore={newBatch.length ? true : false}
        threshold={100}
        on:loadMore={() => {
          page++;
          console.log('loading');
          fetchData();
        }}
      />
    </div>
  </section>
</div>

<style>
  .posts {
    overflow-y: overlay;
  }
  /* change scrollbar */
  .posts::-webkit-scrollbar {
    width: 0.3rem;
  }
  .posts::-webkit-scrollbar-thumb {
    background: #ca60ff;
  }
</style>

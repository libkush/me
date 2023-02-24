<script lang="ts">
  import Blob from '$lib/components/Blob.svelte';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  import PostsList from '$lib/components/PostsList.svelte';
  import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte';
  let interval: null | NodeJS.Timer = null;
  const cool = (event: any) => {
    let iteration = 0;
    interval ? clearInterval(interval) : null;
    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split('')
        .map((letter: any, index: number) => {
          if (index < iteration) {
            return event.target.dataset.value[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join('');
      if (iteration >= event.target.dataset.value.length) {
        interval ? clearInterval(interval) : null;
      }
      iteration += 1 / 3;
    }, 30);
  };
  export let data: { posts: App.BlogPostWithNextAndPrevious[] };
</script>

<section class="hero">
  <h1>HI, I'M</h1>
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <h1 style="color: #66ffa3" on:mousemove={cool} data-value="KUSH PATEL">KUSH PATEL</h1>
  <span />
</section>
<div class="flex flex-col flex-grow w-3/4 m-auto gap-8 pb-16">
  <section class="w-full">
    <div class="flex items-center justify-between gap-4 mb-8">
      <h2 class="text-sm font-medium sm:text-base text-zinc-500 dark:text-zinc-400">
        Recently Published
      </h2>
      <a href="/posts" class="flex items-center gap-1 text-sm font-medium text-teal-500"
        >View All <ArrowRightIcon class="w-4 h-4" /></a
      >
    </div>
    <PostsList posts={data.posts} />
  </section>
</div>
<div id="container">
  <div class="backdrop" />
  <Blob />
</div>

<style>
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
    backdrop-filter: blur(8vmax);
  }
  .hero {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0rem;
    justify-content: center;
    align-items: center;
  }
  h1 {
    font-family: 'Space Mono', monospace;
    font-size: clamp(3rem, 10vw, 10rem);
    font-weight: 800;
    color: white;
    border-radius: clamp(0.4rem, 0.75vw, 1rem);
    margin: 0;
  }
</style>

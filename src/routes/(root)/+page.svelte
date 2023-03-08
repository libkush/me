<script lang="ts">
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  import PostsList from '$lib/components/PostsList.svelte';
  import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte';
  import Typewriter from 'svelte-typewriter';
  import SocialLinks from '$lib/components/SocialLinks.svelte';
  import Blob from '$lib/components/Blob.svelte';
  import { name, bio } from '$lib/info';
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
  export let data: { posts: App.BlogPost[] };
</script>

<svelte:head>
  <title>{name}</title>
  <meta name="description" content={bio} />
  <meta property="og:description" content={bio} />
</svelte:head>

<Blob />
<section class="md:h-screen h-[50vh] w-full flex flex-col gap-0 justify-center items-center">
  <h1>HI, I'M</h1>
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <h1 style="color: #67e8f9" on:mousemove={cool} data-value={name.toUpperCase()}>
    {name.toUpperCase()}
  </h1>
  <div class="typewriter text-white flex flex-row text-xl gap-1">
    <Typewriter interval={70} mode="loop">
      <span>exploring</span>
      <span>learning</span>
      <span>creating</span>
      <span>breaking</span>
    </Typewriter>
    <span>stuff.</span>
  </div>
  <SocialLinks />
</section>
<div class="flex flex-col flex-grow sm:w-3/5 sm:m-auto m-6 gap-8 pb-16">
  <section class="w-full">
    <div class="flex items-center justify-between gap-4 mb-8">
      <h2 class="text-xl font-medium sm:text-base text-zinc-200">Recently Published</h2>
      <a href="/posts" class="flex items-center gap-1 text-base font-medium text-cyan-500"
        >View All <ArrowRightIcon class="w-4 h-4" /></a
      >
    </div>
    <PostsList posts={data.posts} />
  </section>
</div>

<style>
  .typewriter {
    --cursor-color: #ffffff;
    --cursor-width: 0.2rem;
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

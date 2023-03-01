<script lang="ts">
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  import PostsList from '$lib/components/PostsList.svelte';
  import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte';
  import Typewriter from 'svelte-typewriter';
  import Blob from '$lib/components/Blob.svelte';
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

<Blob />
<section class="hero">
  <h1>HI, I'M</h1>
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <h1 style="color: #67e8f9" on:mousemove={cool} data-value="KUSH PATEL">KUSH PATEL</h1>
  <div class="typewriter text-white flex flex-row text-xl gap-1">
    <Typewriter interval={70} mode="loop">
      <span>exploring</span>
      <span>learning</span>
      <span>creating</span>
      <span>breaking</span>
    </Typewriter>
    <span>stuff.</span>
  </div>
  <div class="social flex flex-row gap-6 m-8">
    <svg
      stroke-width="2.05"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="currentColor"
      ><path
        d="M8 10h8M8 14h4M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      /></svg
    >
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"
      ><path
        d="M16 22.027v-2.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 00-1.5-3.75 5.07 5.07 0 00-.09-3.77s-1.18-.35-3.91 1.48a13.38 13.38 0 00-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 005 5.797a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 00-.94 2.58v2.87M9 20.027c-3 .973-5.5 0-7-3"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      /></svg
    >
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"
      ><path
        d="M7 9l5 3.5L17 9"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      /><path
        d="M2 17V7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2z"
        stroke="currentColor"
      /></svg
    >
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"
      ><path
        d="M5.5 16c5 2.5 8 2.5 13 0M15.5 17.5l1 2s4.171-1.328 5.5-3.5c0-1 .53-8.147-3-10.5-1.5-1-4-1.5-4-1.5l-1 2h-2"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      /><path
        d="M8.528 17.5l-1 2s-4.171-1.328-5.5-3.5c0-1-.53-8.147 3-10.5 1.5-1 4-1.5 4-1.5l1 2h2"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      /><path
        d="M8.5 14c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2zM15.5 14c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      /></svg
    >
  </div>
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
  .hero {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0rem;
    justify-content: center;
    align-items: center;
  }
  /* change for small screens */
  @media (max-width: 640px) {
    .hero {
      height: 50vh;
    }
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

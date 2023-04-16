<script lang="ts">
  import Typed from 'typed.js';
  import PostsList from '$lib/components/PostsList.svelte';
  import { onMount } from 'svelte';
  import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte';
  import uptime from '$lib/uptime';
  import { name, bio, firstName, lastName, dob, discordURL, githubURL, website } from '$lib/info';
  const { years, months, days } = uptime(dob);
  export let data: { posts: App.BlogPost[] };
  const strings = ['explore', 'learn', 'break', 'create'];
  onMount(() => {
    const _ = new Typed('#type', {
      strings,
      loop: true,
      typeSpeed: 40,
      backSpeed: 40,
      backDelay: 1500,
      cursorChar: '_',
      smartBackspace: true
    });
  });
</script>

<svelte:head>
  <title>{name}</title>
  <meta name="description" content={bio} />
  <meta property="og:description" content={bio} />
</svelte:head>

<section
  class="md:w-3/5 md:h-screen md:m-auto md:p-0 py-24 px-8 flex flex-col gap-0 justify-center items-center"
>
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <div class="w-full flex md:flex-row flex-col items-center justify-center">
    <div class="text-rosePine-text w-full text-7xl font-[800] leading-tight">
      <h1>
        {firstName}
      </h1>
      <h1>
        {lastName}
      </h1>
      <br />
      <p class="text-2xl font-light text-rosePine-iris"><i>»[…] student, developer, etc.</i></p>
    </div>
    <div
      class="font-bold py-4 px-8 leading-6 text-lg w-full sm:m-auto m-6 rounded-lg bg-rosePine-overlay"
    >
      <pre class="py-4 px-0 ">
<strong class="text-rosePine-love">~</strong> fetch

<strong class="text-rosePine-love">kush@arch</strong>
uptime    {years}y, {months}m, {days}d
locale    en_IN
pkgs      <a class="text-rosePine-rose" href={githubURL}>git</a>, <a
          class="text-rosePine-rose"
          href={discordURL}>dc</a
        >, <a class="text-rosePine-rose" href="{website}talk">tok</a>
smtp      kush@kush.in

<strong class="text-rosePine-love">~</strong> <span id="type" />

</pre>
    </div>
  </div>
</section>
<div class="flex flex-col flex-grow sm:w-3/5 sm:m-auto m-6 gap-8 pb-16">
  <section class="w-full">
    <div class="flex items-center justify-between gap-8 p-0 mx-0 mb-8">
      <span class="text-xl text-rosePine-iris">recently published</span>
      <a href="/posts" class="flex items-center gap-1 text-xl text-rosePine-foam"
        >view all <ArrowRightIcon class="w-4 h-4" /></a
      >
    </div>
    <PostsList posts={data.posts} />
  </section>
</div>

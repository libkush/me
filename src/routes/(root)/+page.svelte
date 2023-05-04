<script lang="ts">
  import Typed from 'typed.js';
  import PostsList from '$lib/components/PostsList.svelte';
  import { onMount } from 'svelte';
  import ArrowRightIcon from '$lib/components/ArrowRightIcon.svelte';
  import uptime from '$lib/uptime';
  import {
    name,
    bio,
    firstName,
    lastName,
    dob,
    discordURL,
    githubURL,
    website,
    email
  } from '$lib/info';
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
  class="flex flex-col items-center justify-center gap-0 px-8 py-24 md:m-auto md:h-screen md:w-3/5 md:p-0"
>
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <div class="flex w-full flex-col items-center justify-center md:flex-row">
    <div class="w-full text-7xl font-[800] leading-tight text-rosePine-text">
      <h1>
        {firstName}
      </h1>
      <h1>
        {lastName}
      </h1>
      <br />
      <p class="text-2xl font-light text-rosePine-iris"><i>»[…] student, developer, etc.</i></p>
    </div>
    <div class="terminal">
      <pre>
<strong>~</strong> fetch

<strong>kush@arch</strong>
uptime    {years}y, {months}m, {days}d
locale    en_IN
pkgs      <a href={githubURL}>git</a>, <a href={discordURL}>dc</a>, <a href="{website}talk">tok</a>
smtp      <a href="mailto:{email}">{email}</a>

<strong>~</strong> <span id="type" />

</pre>
    </div>
  </div>
</section>
<div class="m-6 flex flex-grow flex-col gap-8 pb-16 sm:m-auto sm:w-3/5">
  <section class="w-full">
    <div class="mx-0 mb-8 flex items-center justify-between gap-8 p-0">
      <span class="text-xl text-rosePine-iris">recently published</span>
      <a href="/posts" class="flex items-center gap-1 text-xl text-rosePine-foam"
        >view all <ArrowRightIcon class="h-4 w-4" /></a
      >
    </div>
    <PostsList posts={data.posts} />
  </section>
</div>

<style lang="postcss">
  .terminal {
    @apply relative m-6 w-full rounded-lg border-b-[1px] border-r-[1px] border-solid border-black/30 bg-rosePine-overlay px-8 py-4 text-lg font-bold leading-6 sm:m-auto;
  }
  .terminal pre {
    @apply px-0 py-4;
  }
  .terminal a {
    @apply text-rosePine-rose;
  }
  .terminal:after {
    content: '';
    height: 100px;
    width: 1px;
    right: -1px;
    top: 65%;
    @apply absolute bg-gradient-to-b from-transparent via-rosePine-love to-transparent opacity-0 transition-[top,opacity] duration-700 ease-in-out;
  }
  .terminal:after {
    top: 65%;
    opacity: 0;
  }

  .terminal:hover:after {
    top: 25%;
    opacity: 1;
  }
  strong {
    @apply text-rosePine-love;
  }
</style>

<script lang="ts">
  import Blob from '$lib/Blob.svelte';
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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
</script>

<section class="hero">
  <h1>HI, I'M</h1>
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <h1 style="color: #b0f6ff;" on:mousemove={cool} data-value="KUSH PATEL">KUSH PATEL</h1>
</section>
<div style="height: 100vh" />
<div id="container">
  <div class="backdrop" />
  <Blob />
</div>
<nav class="menu">
  <svg
    width="2rem"
    height="2rem"
    stroke-width="2.05"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    ><path
      d="M3 5h8M3 12h13M3 19h18"
      stroke="#ffffff"
      stroke-width="2.05"
      stroke-linecap="round"
      stroke-linejoin="round"
    /></svg
  >
</nav>

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
    backdrop-filter: blur(7vmax);
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

  .menu {
    position: absolute;
    top: 0;
    left: 0;
    padding: 1rem;
    display: flex;
  }
  h1 {
    font-family: 'Space Mono', monospace;
    font-size: clamp(3rem, 10vw, 10rem);
    color: white;
    border-radius: clamp(0.4rem, 0.75vw, 1rem);
    margin: 0;
  }
</style>

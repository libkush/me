<script>
  import { fly } from 'svelte/transition';
  let open = false;
  let activeIndex;
  const toggle = () => {
    open = !open;
  };
</script>

<nav data-open={open} class:close={open}>
  <button on:click={toggle}>
    <svg
      class="hamburger"
      width="3rem"
      height="3rem"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect class="top" x="20" y="29" width="60" height="7.85106" fill="#fff" />
      <rect class="middle" x="20" y="45.5745" width="45" height="7.85106" fill="#fff" />
      <rect class="bottom" x="20" y="62.1489" width="30" height="7.85106" fill="#fff" />
    </svg>
  </button>
</nav>
{#if open}
  <div id="menu" data-active-index={activeIndex} transition:fly>
    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
    <div id="menu-items">
      <div
        on:mouseover={() => {
          activeIndex = 0;
        }}
        class="menu-item"
      >
        Home
      </div>
      <div
        on:mouseover={() => {
          activeIndex = 1;
        }}
        class="menu-item"
      >
        Posts
      </div>
      <div
        on:mouseover={() => {
          activeIndex = 2;
        }}
        class="menu-item"
      >
        About
      </div>
      <div
        on:mouseover={() => {
          activeIndex = 3;
        }}
        class="menu-item"
      >
        Talk
      </div>
    </div>
    <div id="menu-background-pattern" />
  </div>
{/if}

<style>
  #menu {
    background-color: #1d1d1f;
    align-items: center;
    display: flex;
    height: 100vh;
    width: 100vw;
    z-index: 99;
    position: fixed;
  }

  #menu-items {
    margin-left: clamp(4rem, 20vw, 48rem);
    position: relative;
    z-index: 2;
  }

  #menu[data-active-index='0'] > #menu-background-pattern {
    background-position: 0% -25%;
  }

  #menu[data-active-index='1'] > #menu-background-pattern {
    background-position: 0% -50%;
  }

  #menu[data-active-index='2'] > #menu-background-pattern {
    background-position: 0% -75%;
  }

  #menu[data-active-index='3'] > #menu-background-pattern {
    background-position: 0% -100%;
  }

  #menu-background-pattern {
    background-image: radial-gradient(rgba(0, 180, 177, 0.1) 9%, transparent 9%);
    background-position: 0% 0%;
    background-size: 12vmin 12vmin;
    height: 100vh;
    left: 0px;
    position: absolute;
    top: 0px;
    transition: opacity 800ms ease, background-size 800ms ease, background-position 800ms ease;
    width: 100vw;
    z-index: 1;
  }

  #menu-items:hover ~ #menu-background-pattern {
    background-size: 11vmin 11vmin;
    opacity: 0.5;
  }

  #menu-items:hover > .menu-item {
    opacity: 0.3;
  }

  #menu-items:hover > .menu-item:hover {
    opacity: 1;
  }

  .menu-item {
    color: white;
    cursor: pointer;
    display: block;
    font-family: 'Noto Sans Mono', monospace;
    font-size: clamp(3rem, 8vw, 8rem);
    padding: clamp(0.25rem, 0.5vw, 1rem) 0rem;
    text-decoration: none;
    transition: opacity 400ms ease;
  }
  nav[data-open='true'] {
    position: fixed;
  }

  nav {
    z-index: 100;
    position: absolute;
  }
  button {
    background: none;
    border: none;
    outline: none;
    position: absolute;
    top: 0;
    left: 0;
    padding: 1rem;
    display: flex;
    z-index: 99;
  }
  svg {
    cursor: pointer;
  }
  svg rect {
    transition: all 0.3s ease-in-out;
  }
  .close .middle {
    x: 0;
    opacity: 0;
  }
  .close .top {
    transform: rotate(45deg);
    transform-origin: center top;
    x: 50px;
    y: 35px;
  }
  .close .bottom {
    transform: rotate(-45deg);
    transform-origin: center top;
    width: 60px;
    x: -20px;
    y: 25px;
  }
</style>

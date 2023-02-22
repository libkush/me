<script lang="ts">
  import { spline } from '$lib/spline';
  import { createNoise2D } from 'simplex-noise';
  import { onMount } from 'svelte';

  let startColor = 'hsl(0, 100%, 75%)';
  let stopColor = 'hsl(0, 100%, 75%)';

  let blob: SVGElement | null = null;
  let path: SVGPathElement | null = null;

  function createPoints() {
    const points = [];
    const numPoints = 6;
    const angleStep = (Math.PI * 2) / numPoints;
    const rad = 75;

    for (let i = 1; i <= numPoints; i++) {
      const theta = i * angleStep;

      const x = 100 + Math.cos(theta) * rad;
      const y = 100 + Math.sin(theta) * rad;

      points.push({
        x: x,
        y: y,
        originX: x,
        originY: y,
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000
      });
    }

    return points;
  }

  function map(n: number, start1: number, end1: number, start2: number, end2: number) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  }

  const noise2D = createNoise2D();
  function noise(x: number, y: number) {
    return noise2D(x, y);
  }

  let hueNoiseOffset = 0;
  let noiseStep = 0.003;

  const points = createPoints();
  onMount(() => {
    window.onpointermove = (event) => {
      const { clientX, clientY } = event;
      blob?.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`
        },
        { duration: 3000, fill: 'forwards' }
      );
    };
    (function animate() {
      path?.setAttribute('d', spline(points, 1, true));

      for (let i = 0; i < points.length; i++) {
        const point = points[i];

        const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
        const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
        const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
        const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);

        point.x = x;
        point.y = y;

        point.noiseOffsetX += noiseStep;
        point.noiseOffsetY += noiseStep;
      }

      const hueNoise = noise(hueNoiseOffset, hueNoiseOffset);
      const hue = map(hueNoise, -1, 1, 0, 360);

      startColor = `hsl(${hue}, 100%, 75%)`;
      stopColor = `hsl(${hue + 90}, 100%, 75%)`;

      hueNoiseOffset += noiseStep / 3;

      requestAnimationFrame(animate);
    })();
  });
</script>

<svg
  class="blob"
  style="--startColor:{startColor};--stopColor:{stopColor}"
  bind:this={blob}
  viewBox="0 0 200 200"
>
  <defs>
    <linearGradient id="gradient" gradientTransform="rotate(90)">
      <stop id="gradientStop1" offset="0%" stop-color="var(--startColor)" />
      <stop id="gradientStop2 " offset="100%" stop-color="var(--stopColor)" />
    </linearGradient>
  </defs>
  <path bind:this={path} d="" fill="url('#gradient')" />
</svg>

<style>
  .blob {
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    border-radius: 50%;
    height: 50vmax;
    aspect-ratio: 1;
    translate: -50% -50%;
    opacity: 0.5;
    z-index: -1;
  }
  /* dont show on mobile screens */
  @media (max-width: 600px) {
    .blob {
      display: none;
    }
  }
</style>

<style>
  .tick {
    font-size: 0.725em;
    font-weight: 200;
  }

  line,
  .tick line {
    stroke: #aaa;
    stroke-dasharray: 2;
  }

  .tick text {
    fill: #666;
  }

  .baseline {
    stroke-dasharray: 0;
  }
</style>

<script>
  import { getContext } from "svelte";

  const { width, height, xScale, yScale } = getContext("LayerCake");

  export let gridlines = true;
  export let formatTick = d => d;
  export let ticks = undefined;
  export let tickNumber = undefined;

  $: tickVals = ticks || $yScale.ticks(tickNumber);
</script>

<g class="axis y-axis">
  {#each tickVals as tick, i}
    <g
      class="tick tick-{tick}"
      transform="translate({$xScale.range()[0]},{$yScale(tick)})">
      {#if gridlines !== false}
        <line y1="0" y2="0" x1="0" x2="{$width}"></line>
      {/if}
      <text y="4" x="-16" text-anchor="middle">{formatTick(tick * 1000)}</text>
    </g>
  {/each}
</g>

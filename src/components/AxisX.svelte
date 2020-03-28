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
    fill: #2a2a2a;
    font-weight: 400;
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

  $: tickVals = ticks || $xScale.ticks(tickNumber);
</script>

<g class="axis x-axis">
  {#each tickVals as tick, i}
    <g
      class="tick tick-{tick}"
      transform="translate({$xScale(tick)},{$yScale.range()[0] + 16})">
      <text
        y="0"
        x="{i === 0 ? 0 : 4}"
        text-anchor="{i === 0 ? 'start' : 'end'}">
        {formatTick(tick)}
      </text>
    </g>
  {/each}
</g>

<style>
  rect {
    stroke: white;
  }
  .cases,
  .casesCapita {
    fill: #666;
  }
  .deaths,
  .deathsCapita {
    fill: #c30;
  }
</style>

<script>
  import { getContext } from "svelte";
  const { data, xGet, yGet, xScale, width, height } = getContext("LayerCake");

  export let toggle;

  $: w = $xScale.bandwidth();

  $: calcH = d => {
    const h = $height - $yGet(d);
    return 2 + h;
  };
</script>

<g class="days">
  {#each $data as d, i (d.index)}
    <g class="day" transform="translate({$xGet(d)}, 0)">
      <rect
        class="{toggle}"
        x="0"
        y="{$yGet(d) - 1}"
        width="{w}"
        height="{calcH(d)}"></rect>
    </g>
  {/each}
</g>

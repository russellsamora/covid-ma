<style>
  rect {
    stroke: none;
  }
</style>

<script>
  import { getContext } from "svelte";
  const { data, xGet, yScale, xScale, width, height } = getContext("LayerCake");

  $: w = $xScale.bandwidth();

  $: {
    console.log({ $width, $height });
  }

  $: calcY = d => {
    return $yScale(d[y]);
  };

  $: calcH = d => {
    const h = $height - $yScale(d[y]);
    return h;
  };

  export let y;
  export let fill = "#666";
</script>

<g class="days">
  {#each $data as d, i (d.index)}
    <g class="day" transform="translate({$xGet(d)}, 0)">
      <rect {fill} x="0" y="{calcY(d)}" width="{w}" height="{calcH(d)}"></rect>
    </g>
  {/each}
</g>

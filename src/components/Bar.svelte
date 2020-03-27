<style>
  rect {
    stroke: none;
  }
</style>

<script>
  import { getContext } from "svelte";
  const { data, xGet, yScale, xScale, height } = getContext("LayerCake");
  $: w = $xScale.bandwidth();
  function calcY(d) {
    return $yScale(d[y]);
  }

  function calcH(d) {
    return $height - $yScale(d[y]);
  }

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

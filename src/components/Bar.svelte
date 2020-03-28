<style>
  rect {
    stroke: none;
  }
</style>

<script>
  import { getContext } from "svelte";
  const { data, xGet, yGet, xScale, width, height } = getContext("LayerCake");

  $: w = $xScale.bandwidth();

  $: calcH = d => {
    const h = $height - $yGet(d);
    return h;
  };

  export let fill = "#666";
</script>

<g class="days">
  {#each $data as d, i (d.index)}
    <g class="day" transform="translate({$xGet(d)}, 0)">
      <rect {fill} x="0" y="{$yGet(d)}" width="{w}" height="{calcH(d)}"></rect>
    </g>
  {/each}
</g>

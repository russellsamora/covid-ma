<style>
  p {
    position: absolute;
    transform: translate(0, -125%);
    font-size: 12px;
    margin: 0;
    background: #fff;
    padding: 0;
    line-height: 1;
    color: #666;
    font-weight: bold;
    /* text-shadow: 0 0 3px #fff; */
  }
  .Berkshire {
    color: #c3c;
  }
</style>

<script>
  import { getContext } from "svelte";

  const { data, x, width, xGet, yGet } = getContext("LayerCake");

  $: max = v => v[v.length - 1];
  $: right = values => $width - $xGet(max(values));
  $: top = values => $yGet(max(values));
</script>

{#each $data as d (d.key)}
  <p class="{d.key}" style="top:{top(d.value)}px;right:{right(d.value)}px;">
    {d.key}
  </p>
{/each}

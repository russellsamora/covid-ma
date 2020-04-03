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
    text-align: center;
    /* text-shadow: 0 0 3px #fff; */
  }
  .Berkshire {
    color: var(--highlight);
  }
</style>

<script>
  import { getContext } from "svelte";

  const { data, x, width, xGet, yGet, xScale } = getContext("LayerCake");
  export let key;
  export let toggle;
  export let formatTickY = d => d;
  export let i;

  const suffix = {
    casesCapita: "cases per 1,000",
    cases: "total cases",
    deathsCapita: "deaths per 1,000",
    deaths: "total deaths",
    casesNew: "new cases each day",
    deathsNew: "new deaths each day"
  };

  $: d = $data[$data.length - 1];
  $: text = formatTickY(d[toggle]);
  $: top = $yGet(d);
  $: right = $width - $xGet(d) - $xScale.bandwidth();
</script>

<p class="{key}" style="top:{top}px;right:{right}px;">
  {text} {i === 0 ? suffix[toggle] : ''}
</p>

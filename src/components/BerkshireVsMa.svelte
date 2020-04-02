<style>
  .chart {
    margin: 1rem auto;
    width: 100%;
    max-width: 685px;
  }
  figure {
    padding: 0 1rem;
    display: block;
    margin: 0;
    visibility: hidden;
  }
  figure.visible {
    visibility: visible;
  }
</style>

<script>
  import Line from "./Line.svelte";
  import LineLabel from "./LineLabel.svelte";
  import AxisY from "./AxisY.svelte";
  import AxisX from "./AxisX.svelte";
  import {
    LayerCake,
    Svg,
    Html,
    flatten,
    calcExtents,
    uniques
  } from "layercake";
  import { descending } from "d3-array";
  import { format } from "d3-format";

  export let data;
  export let xScale;
  export let xDomain;
  export let formatTickX;

  const PAD = 8;
  const RATIO = 3;

  let padding = { top: PAD, right: PAD, bottom: PAD * 3, left: PAD };
  let chartW;
  let visible;
  let toggle = "deathsCapita";

  $: flatData = flatten(data.map(d => d.value));
  $: extents = calcExtents(flatData, fields);

  $: fields = [
    { field: "x", accessor: d => d.index },
    { field: "y", accessor: d => d[toggle] }
  ];

  $: chartH = Math.max(120, Math.floor(chartW / RATIO));
  $: visible = !!chartW;
  $: yDomain = [0, extents.y[1]];

  function formatTickY(d) {
    return format(",")(d);
  }
</script>

<p class="center">
  <select bind:value="{toggle}">
    <option value="deathsCapita">Cumulative deaths per 1,000 residents</option>
    <option value="casesCapita">Cumulative cases per 1,000 residents</option>
  </select>
</p>

<div class="chart" class:visible>
  <figure class:visible style="height: {chartH}px;" bind:clientWidth="{chartW}">
    {#if visible}
      <LayerCake
        {xScale}
        {xDomain}
        {yDomain}
        {padding}
        x="dateF"
        y="{toggle}"
        {data}>
        <Svg>
          <AxisX
            ticks="{[xDomain[0], xDomain[xDomain.length - 1]]}"
            formatTick="{formatTickX}" />
          <AxisY tickNumber="{5}" formatTick="{formatTickY}" />
          <Line {toggle} />
        </Svg>
        <Html>
          <LineLabel />
        </Html>
      </LayerCake>
    {/if}
  </figure>
</div>

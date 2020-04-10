<style>
  section {
    display: block;
  }
  .chart {
    margin: 0 auto;
    width: 100%;
    max-width: var(--maxWidth);
    user-select: none;
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
  h3 {
    margin-bottom: 0.5rem;
  }
  @media only screen and (min-width: 960px) {
    section {
      display: none;
    }
  }
</style>

<script>
  import { onMount } from "svelte";
  import Bar from "./Bar.svelte";
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";
  import PeakLabel from "./PeakLabel.svelte";
  import {
    LayerCake,
    Svg,
    Html,
    flatten,
    calcExtents,
    uniques
  } from "layercake";
  import { ascending, descending } from "d3-array";
  import { format } from "d3-format";

  export let data;
  export let xScale;
  export let xDomain;
  export let formatTickX;

  const PAD = 8;
  const RATIO = 3;
  const BP = 960;
  const START = new Date("2020-03-03");

  let padding = { top: PAD * 3, right: PAD, bottom: PAD * 3, left: PAD };
  let chartW;
  let visible;
  let classA = true;
  let classB = true;
  let toggle = "deathsNew";
  $: flatData = data.filter(d => d.dateF >= START);
  $: extents = calcExtents(flatData, fields);
  $: fields = [
    { field: "x", accessor: d => d.dayIndex },
    { field: "y", accessor: d => d[toggle] }
  ];

  $: chartH = 200;
  $: visible = !!chartW;
  $: yDomain = [0, extents.y[1]];
  $: {
    const u = uniques(flatData.map(d => d.date)).map(d => new Date(d));
    u.sort(ascending);
    xDomain = u;
  }

  $: chartData = data.filter(v => v.dateF >= START);

  function formatTickY(d) {
    return format(",")(d);
  }
</script>

<section>
  <div class="chart" class:visible>
    <h3>Reported COVID-19 deaths each day in Massachusetts</h3>
    <figure
      class:visible
      style="height: {chartH}px;"
      bind:clientWidth="{chartW}">
      {#if visible}
        <LayerCake
          {xScale}
          {xDomain}
          {yDomain}
          {padding}
          x="dateF"
          y="{toggle}"
          data="{chartData}">
          <Svg>
            <AxisX
              ticks="{[xDomain[0], xDomain[xDomain.length - 1]]}"
              formatTick="{formatTickX}"
              bar="{true}" />
            <AxisY tickNumber="{4}" formatTick="{formatTickY}" />
            <Bar {toggle} key="Mass." />
          </Svg>
          <Html>
            <PeakLabel key="Mass." {toggle} {formatTickY} />
          </Html>
        </LayerCake>
      {/if}
    </figure>
  </div>
</section>

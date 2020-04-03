<style>
  .charts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 3rem;
  }
  .chart {
    margin: 1rem 0;
    width: 50%;
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
  h5 {
    margin: 0;
    color: var(--gray);
  }
  .Berkshire {
    color: var(--highlight);
  }
  @media only screen and (min-width: 700px) {
    .chart {
      width: 25%;
    }
  }
  @media only screen and (min-width: 900px) {
    .chart {
      width: 20%;
    }
  }
  @media only screen and (min-width: 1100px) {
    .chart {
      width: 16.25%;
    }
  }
  @media only screen and (min-width: 1300px) {
    .chart {
      width: 13.33%;
    }
  }
</style>

<script>
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
  import { descending } from "d3-array";
  import { format } from "d3-format";

  export let data;
  export let xScale;
  export let xDomain;
  export let formatTickX;

  const PAD = 8;
  const RATIO = 3;

  let padding = { top: PAD * 2, right: PAD, bottom: PAD * 3, left: PAD };
  let chartW;
  let visible;
  let toggle = "casesCapita";

  $: flatData = flatten(data.map(d => d.value));
  $: extents = calcExtents(flatData, fields);

  $: fields = [
    { field: "x", accessor: d => d.index },
    { field: "y", accessor: d => d[toggle] }
  ];

  $: chartH = Math.max(120, Math.floor(chartW / RATIO));
  $: visible = !!chartW;
  $: yDomain = [0, extents.y[1]];

  $: if (data) {
    data.sort((a, b) =>
      descending(
        a.value[a.value.length - 1][toggle],
        b.value[b.value.length - 1][toggle]
      )
    );
    data = data;
  }

  function formatTickY(d) {
    if (toggle.includes("Capita")) return format(".01f")(d);
    return format(",")(d);
  }
</script>

<p class="center">
  <select bind:value="{toggle}">
    <option value="casesCapita">Cumulative cases per 1,000 residents</option>
    <option value="cases">Cumulative cases (total)</option>
    <option value="deathsCapita">Cumulative deaths per 1,000 residents</option>
    <option value="deaths">Cumulative deaths (total)</option>
    <option value="casesNew">New cases each day</option>
    <option value="deathsNew">New deaths each day</option>
  </select>
</p>

<div class="charts" class:visible>
  {#each data.filter(d => d.key !== 'Unknown') as { key, value }, i (key)}
    <div class="chart">
      <h5 class="center {key}">{key}</h5>
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
            data="{value}">
            <Svg>
              <AxisX
                ticks="{[xDomain[0], xDomain[xDomain.length - 1]]}"
                formatTick="{formatTickX}" />
              <AxisY baseline="true" />
              <Bar {toggle} {key} />
            </Svg>
            <Html>
              <PeakLabel {key} {toggle} {formatTickY} {i} />
            </Html>
          </LayerCake>
        {/if}
      </figure>
    </div>
  {/each}
</div>

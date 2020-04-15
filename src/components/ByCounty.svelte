<style>
  section {
    display: none;
  }
  .charts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    max-width: var(--maxWidth);
  }
  .chart {
    width: 13.33%;
    user-select: none;
  }
  figure {
    padding: 0 0.5rem;
    display: block;
    margin: 0;
    visibility: hidden;
  }
  figure.visible {
    visibility: visible;
  }
  select {
    font-size: 1em;
    font-weight: 600;
    font-family: var(--font);
    padding: 0;
    line-height: 1;
    background: var(--white);
    outline: none;
    margin: 0 0.25em;
  }
  h5 {
    margin: 0;
    color: var(--black);
  }
  .Berkshire {
    color: var(--highlightText);
  }

  @media only screen and (min-width: 960px) {
    section {
      display: block;
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
  import { ascending, descending } from "d3-array";
  import { format } from "d3-format";

  export let data;
  export let xScale;
  export let xDomain;
  export let formatTickX;

  const PAD = 8;
  const RATIO = 3;
  const START = new Date("2020-03-15");
  const BP = 960;

  let padding = { top: PAD * 3, right: 0, bottom: PAD * 3, left: 0 };
  let chartW;
  let sectionW;
  let visible;
  let settingA = "cases";
  let settingB = "Capita";

  $: toggle = `${settingA}${settingB}`;
  $: flatData = flatten(data.map(d => d.value)).filter(d => d.dateF >= START);
  $: extents = calcExtents(flatData, fields);

  $: fields = [
    { field: "x", accessor: d => d.dateF },
    { field: "y", accessor: d => d[toggle] }
  ];

  $: chartH = 100;
  $: visible = !!chartW && !!sectionW && sectionW > BP;
  $: yDomain = [0, extents.y[1]];
  $: {
    const u = uniques(flatData.map(d => d.date)).map(d => new Date(d));
    u.sort(ascending);
    xDomain = u;
  }

  $: chartData = data.map(d => ({
    ...d,
    value: d.value.filter(v => v.dateF >= START)
  }));

  $: if (chartData) {
    chartData.sort((a, b) =>
      descending(
        a.value[a.value.length - 1][toggle],
        b.value[b.value.length - 1][toggle]
      )
    );
    chartData = chartData;
  }

  function formatTickY(d) {
    if (toggle.includes("Capita")) return format(".0f")(d);
    return format(",")(d);
  }
</script>

<section bind:offsetWidth="{sectionW}">
  <h3>
    Cumulative COVID-19
    <select bind:value="{settingA}">
      <option value="cases">cases</option>
      <option value="deaths">deaths</option>
    </select>
    by county
    <select bind:value="{settingB}">
      <option value="">(raw numbers)</option>
      <option value="Capita">(population adjusted)</option>
    </select>
  </h3>
  <div class="charts" class:visible>
    {#each chartData as { key, value }, i (key)}
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
                  formatTick="{formatTickX}"
                  bar="{true}"
                  index="{i}" />
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
</section>

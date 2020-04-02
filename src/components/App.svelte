<style>
  /* vars defined in public/assets/global.css */
  h1 {
    font-size: 1.5em;
  }

  .charts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
  h3 {
    margin: 0;
  }
  h1 {
    margin-bottom: 0;
  }
  p {
    margin: 0.5rem 0;
  }
  .center {
    text-align: center;
  }
  @media only screen and (min-width: 960px) {
    .chart {
      width: 25%;
    }
  }
</style>

<script>
  import { onMount } from "svelte";
  import { LayerCake, Svg, flatten, calcExtents, uniques } from "layercake";
  import { min, range, sum, descending } from "d3-array";
  import { nest } from "d3-collection";
  import { format } from "d3-format";
  import { csvParse } from "d3-dsv";
  import { scaleBand } from "d3-scale";
  import Bar from "./Bar.svelte";
  import AxisY from "./AxisY.svelte";
  import AxisX from "./AxisX.svelte";
  import population from "../data/population-ma.csv";
  import maData from "../data/ma.csv";

  // const { width, height } = getContext("LayerCake");

  const MONTHS = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "June",
    "July",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec."
  ];

  const PAD = 8;
  const RATIO = 2;
  const MS_IN_DAY = 86400000;

  let padding = { top: PAD, right: PAD, bottom: PAD * 2, left: PAD };
  let flatData = [];
  let chartW;
  let visible;
  let toggle = "casesCapita";

  $: chartH = Math.max(150, Math.floor(chartW / RATIO));
  $: visible = !!chartW;

  $: fields = [
    { field: "x", accessor: d => d.index },
    { field: "y", accessor: d => d[toggle] }
  ];
  $: countyData = maData ? clean(maData) : [];
  $: extents = calcExtents(flatData, fields);
  $: yDomain = [0, extents.y[1]];
  $: xScale = scaleBand().padding(0);
  $: xDomain = uniques(flatData.map(d => d.dateF));

  $: if (countyData) {
    countyData.sort((a, b) =>
      descending(
        a.value[a.value.length - 1][toggle],
        b.value[b.value.length - 1][toggle]
      )
    );
    countyData = countyData;
  }

  function formatTickX(d) {
    return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
  }

  async function loadRecentData() {
    try {
      const url =
        "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv";
      const res = await fetch(url);
      const text = await res.text();
      const raw = csvParse(text);
      return raw;
    } catch (err) {
      console.log(err);
    }
  }

  function perCapita(v, d) {
    const m = population.find(p => p.county === d.county);
    if (m) return (+d[v] / +m.population) * 1000;
    return null;
  }

  function clean(raw) {
    const march = new Date("2020-03-01");
    const c = raw
      .filter(d => d.state === "Massachusetts")
      .map(d => ({
        ...d,
        cases: +d.cases,
        deaths: +d.deaths,
        casesCapita: perCapita("cases", d),
        deathsCapita: perCapita("deaths", d),
        dateF: new Date(d.date)
      }))
      .filter(d => !["Unknown", "Dukes and Nantucket"].includes(d.county))
      .filter(v => v.dateF - march >= 0);

    const start = min(c, d => d.dateF);

    flatData = c.map(d => ({
      ...d,
      dayIndex: Math.floor((d.dateF - start) / MS_IN_DAY)
    }));

    const nested = nest()
      .key(d => d.county)
      .rollup(values => {
        const vals = values.map((v, i) => ({ ...v, index: i }));
        // const casesTotal = sum(vals.map(v => v.cases));
        // const casesCapitaTotal = sum(vals.map(v => v.casesCapita));
        return vals;
      })
      .entries(flatData);

    // nested.sort((a, b) => descending(a.value[toggle], b.value[toggle]));
    return nested;
  }

  onMount(async () => {
    // chartH = chartW;
    // maData = await loadRecentData();
    // const x = Math.max(...data.map(d => d.x));
    // const y = Math.max(...data.map(d => d.y));
    // ratio = x / y;
    // loaded = true;
  });
</script>

<h1 class="center">Massachusetts Covid-19 Cases</h1>
<p class="center">
  Cumulative
  <select bind:value="{toggle}">
    <option value="casesCapita">cases per 1,000 residents</option>
    <option value="cases">cases (total)</option>
    <option value="deathsCapita">deaths per 1,000 residents</option>
    <option value="deaths">deaths (total)</option>
  </select>
  by county
</p>

<div class="charts" class:visible>
  {#each countyData as { key, value }, i (key)}
    <div class="chart">
      <h3 class="center">{key}</h3>
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
              <AxisY tickNumber="{5}" />
              <Bar />
            </Svg>
          </LayerCake>
        {/if}
      </figure>
    </div>
  {/each}
</div>

<p class="center">
  Data source:
  <a href="https://github.com/nytimes/covid-19-data">NYT</a>
</p>
<p class="center">
  By
  <a href="https://twitter.com/codenberg">Russell Goldenberg</a>
</p>

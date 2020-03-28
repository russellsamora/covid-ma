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
    margin: 0;
    padding: 0;
    width: 25%;
  }
  figure {
    display: block;
    margin: 0;
    height: 100%;
  }
  h3 {
    margin: 0;
  }

  .center {
    text-align: center;
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
  const RATIO = 1;
  const MS_IN_DAY = 86400000;
  const EXTENT_FIELDS = [
    { field: "x", accessor: d => d.index },
    { field: "y", accessor: d => d.casesCapita }
  ];

  let padding = { top: PAD, right: PAD, bottom: PAD * 2, left: PAD };
  let flatData = [];
  let chartW = 250;

  $: chartH = chartW;

  // $: mapH = mapW ? Math.floor(mapW / ratio) : 320;
  // $: scatterH = scatterW || 320;

  $: countyData = maData ? clean(maData) : [];
  $: extents = calcExtents(flatData, EXTENT_FIELDS);
  $: yDomain = [0, extents.y[1]];
  $: xScale = scaleBand().padding(0.1);
  // $: xDomain = range(xDomain[1] + 1);
  $: xDomain = uniques(flatData.map(d => d.dateF));

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
      .filter(d => d.county !== "Unknown");

    const start = min(c, d => d.dateF);

    flatData = c.map(d => ({
      ...d,
      dayIndex: Math.floor((d.dateF - start) / MS_IN_DAY)
    }));

    const nested = nest()
      .key(d => d.county)
      .rollup(values => {
        const vals = values.map((v, i) => ({ ...v, index: i }));
        const total = sum(vals.map(v => v.casesCapita));
        const daily = vals.filter(v => v.dateF - march >= 0);
        return { daily, total };
      })
      .entries(flatData);

    nested.sort((a, b) => descending(a.value.total, b.value.total));
    return nested;
  }

  onMount(async () => {
    // maData = await loadRecentData();
    // const x = Math.max(...data.map(d => d.x));
    // const y = Math.max(...data.map(d => d.y));
    // ratio = x / y;
    // loaded = true;
  });
</script>

<h1 class="center">Massachusetts Covid-19 Cases</h1>
<p class="center">Cumulative cases each day by county per 1,000 residents</p>

<div class="charts">
  {#each countyData as { key, value }, i (key)}
    <div class="chart" bind:offsetWidth="{chartW}">
      <h3 class="center">{key}</h3>
      <figure style="height: {chartH}px;">
        <LayerCake
          height="{chartH}"
          width="{chartW}"
          {xScale}
          {xDomain}
          {yDomain}
          {padding}
          x="dateF"
          data="{value.daily}">
          <Svg>
            <AxisX
              ticks="{[xDomain[0], xDomain[xDomain.length - 1]]}"
              formatTick="{formatTickX}" />
            <AxisY tickNumber="{5}" />
            <Bar y="casesCapita" />
            <!-- <Bar y="deathsCapita" fill="red" /> -->
          </Svg>
        </LayerCake>
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

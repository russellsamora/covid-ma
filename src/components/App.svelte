<style>
  /* vars defined in public/assets/global.css */
  h1 {
    text-align: center;
  }

  .chart {
    max-width: 640px;
    position: relative;
    margin: 3rem auto;
  }
  table {
    max-width: 640px;
    margin: 0 auto;
    width: 100%;
  }
  tr:nth-child(even) {
    background-color: #eee;
  }
  td,
  th {
    padding: 0.5em;
    border: none;
  }
  tr td:nth-child(1),
  tr th:nth-child(1) {
    text-align: left;
  }
  tr td:nth-child(n + 1),
  tr th:nth-child(n + 1) {
    text-align: right;
  }
  .center {
    text-align: center;
  }
</style>

<script>
  import { onMount } from "svelte";
  import { LayerCake, Html } from "layercake";
  import Map from "./Map.svelte";
  import population from "../data/population.csv";
  import grid from "../data/grid.csv";
  import raw from "../data/raw.json";
  import { descending } from "d3-array";
  // import { scale } from 'd3-scale';
  // import wordmarkSvg from "../svg/wordmark.svg";
  // import user from "tabler-icons/icons/user.svg";

  let loaded;
  let data;
  let chartW;
  let ratio = 1;
  let toggle = "capita_test";

  $: chartH = Math.floor(chartW / ratio);
  $: desc = toggle === "capita_test" ? "Total Tests" : "Positive Tests";
  $: if (data) {
    data.sort((a, b) => descending(a[toggle], b[toggle]));
    data = data;
  }

  async function loadRecentData() {
    try {
      const url = "https://covidtracking.com/api/states";
      const res = await fetch(url);
      const text = await res.text();
      const raw = JSON.parse(text);
      return raw;
      return true;
    } catch (err) {
      console.log(err);
    }

    // if (res.ok) {
    // 	return text;
    // } else {
    // 	throw new Error(text);
    // }
  }
  function join(latest) {
    const out = population
      .map(p => {
        const m = latest.find(d => d.state === p.state) || {};
        const g = grid.find(d => d.code === p.state) || {};
        return {
          ...p,
          ...m,
          ...g
        };
      })
      .filter(d => d.x)
      .map(d => ({
        ...d,
        capita_test: d.total ? d.total / +d.population : null,
        capita_pos: d.positive ? d.positive / +d.population : null,
        x: +d.x,
        y: +d.y
      }));

    return out;
  }
  onMount(() => {
    // const raw  = loadRecentData();
    data = join(raw);
    const x = Math.max(...data.map(d => d.x));
    const y = Math.max(...data.map(d => d.y));
    ratio = x / y;
    loaded = true;
  });
</script>

<h1>Covid-19 Cases by State Per Capita</h1>

{#if data}
  <p class="description center">
    <select bind:value="{toggle}">
      <option value="capita_test">Total Tests</option>
      <option value="capita_pos">Positive Tests</option>
    </select>
    per capita
  </p>
  <figure class="chart" style="height: {chartH}px;" bind:clientWidth="{chartW}">
    <LayerCake {data} x="x" y="y">
      <Html>
        <Map {toggle} />
      </Html>
    </LayerCake>
  </figure>

  <h3 class="center">Cases per 1 million residents</h3>
  <table>
    <thead>
      <tr>
        <th>State</th>
        <th>Total Tests</th>
        <th>Positive Tests</th>
      </tr>
    </thead>
    <tbody>
      {#each data as d (d.code)}
        <tr>
          <td>{d.state}</td>
          <td>{Math.round(d.capita_test * 1000000)}</td>
          <td>{Math.round(d.capita_pos * 1000000)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<p class="source center">
  <a href="https://covidtracking.com/">Data Source</a>
</p>

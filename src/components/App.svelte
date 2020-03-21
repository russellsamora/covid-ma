<style>
  /* vars defined in public/assets/global.css */
  h1 {
    text-align: center;
  }

  figure {
    max-width: 540px;
    min-height: 320px;
    position: relative;
    margin: 3rem auto;
  }
  .center {
    text-align: center;
  }
  svg {
    width: 100%;
    height: 100%;
  }
</style>

<script>
  import { onMount } from "svelte";
  import { LayerCake, Html, Svg } from "layercake";
  import Map from "./Map.svelte";
  import Scatter from "./Scatter.svelte";
  import AxisX from "./AxisX.svelte";
  import AxisY from "./AxisY.svelte";
  import Table from "./Table.svelte";
  import population from "../data/population.csv";
  import grid from "../data/grid.csv";
  // import raw from "../data/raw.json";
  import { descending } from "d3-array";
  import { format } from "d3-format";
  // import { scale } from 'd3-scale';
  // import wordmarkSvg from "../svg/wordmark.svg";
  // import user from "tabler-icons/icons/user.svg";

  const PAD = 16;

  let loaded;
  let data;
  let mapW;
  let scatterW;
  let ratio = 1;
  let toggle = "capita_test";

  $: mapH = mapW ? Math.floor(mapW / ratio) : 320;
  $: scatterH = scatterW || 320;

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
        percent: d.total ? d.positive / d.total : null,
        x: +d.x,
        y: +d.y
      }));

    return out;
  }
  onMount(async () => {
    const raw = await loadRecentData();
    data = join(raw);
    const x = Math.max(...data.map(d => d.x));
    const y = Math.max(...data.map(d => d.y));
    ratio = x / y;
    loaded = true;
  });
</script>

<h1>Covid-19 Cases by State</h1>

{#if data}
  <p class="description center">
    <select bind:value="{toggle}">
      <option value="capita_test">Total tests</option>
      <option value="capita_pos">Positive tests capita</option>
      <option value="total">Total tests</option>
      <option value="positive">Positive tests</option>
      <option value="percent">% positive</option>
    </select>
  </p>

  <figure style="height: {mapH}px;" bind:clientWidth="{mapW}">
    <LayerCake {data} x="x" y="y">
      <Html>
        <Map {toggle} />
      </Html>
    </LayerCake>
  </figure>

  <Table {data} />

  <h3 class="center">Tests Per Capita vs. Total Tests</h3>
  <figure style="height: {scatterH}px;" bind:clientWidth="{scatterW}">
    <LayerCake
      padding="{{ top: PAD, right: PAD, bottom: PAD, left: PAD * 2 }}"
      x="total"
      y="capita_test"
      xPadding="{[PAD, PAD]}"
      yPadding="{[PAD, PAD]}"
      {data}>

      <Svg>
        <AxisX formatTick="{format('.0s')}" />
        <AxisY formatTick="{format('.2f')}" />
        <Scatter />
      </Svg>
    </LayerCake>
  </figure>
{/if}

<p class="source center">
  <a href="https://covidtracking.com/">Data Source</a>
</p>

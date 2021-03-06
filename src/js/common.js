import * as d3 from 'd3';

// Quantiles of repetition score
const pctiles = {
  .1: 0.181736,
  .5: 0.258959,
  1 : 0.298361,
  10: 0.5388,
  50: 0.9733,
  90: 1.467,
  99: 1.9997,
  99.5: 2.147265,
  99.9: 2.695442,
};

const rscore_cmap = d3.scaleSequential(d3.interpolateViridis)
  .domain([pctiles[99.5], pctiles[.5]])

function round(x, places=2) {
  let n = Math.pow(10, places);
  return Math.round(x*n)/n;
}

// actually fraction <1, not pct
function rscore_to_pct(rscore) {
  // using rscore gives the raw size as % of compressed (generally > 100%),
  // using -rscore gives compressed size as % of raw (< 100)
  return 1 - Math.pow(2, -rscore);
}

function pct_to_rscore(pct) {
  let frac = pct/100;
  return -1 * Math.log2(1-frac);
}

function rscore_to_readable(rscore, places=0) {
  const formatter = d3.format('.0%');
  return formatter(rscore_to_pct(rscore));
}


export {rscore_to_readable, rscore_to_pct, pct_to_rscore, pctiles, rscore_cmap,
};

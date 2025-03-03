export const usageToCost = (
  usage: number,
  rate: number[],
  range: number[],
): number => {
  if (isNaN(usage)) {
    return Infinity;
  }
  let cost = 0;
  for (let i = rate.length - 1; i >= 0; i--) {
    const e = range[i];
    if (usage > e) {
      const excess = usage - e;
      cost += excess * rate[i];
      usage = e;
    }
  }
  return cost;
};

export const costToUsage = (
  cost: number,
  rate: number[],
  range: number[],
): number => {
  if (isNaN(cost)) {
    return Infinity;
  }
  let usage = 0;
  for (let i = 0; i < rate.length; i++) {
    if (cost <= 0) {
      break;
    }
    if (i === rate.length - 1) {
      usage += cost / rate[i];
      break;
    }
    const max = rate[i] * range[i + 1] - range[i];
    if (cost > max) {
      cost -= max;
      usage += range[i + 1];
    } else {
      usage += cost / rate[i];
      break;
    }
  }
  return usage;
};

export const calcRange = (from: number, to: number, price: number) => {
  if (isNaN(to)) {
    return Infinity;
  }
  return (to - from) * price;
};

export const getPlot = (rate: number[], range: number[]) => {
  const graph = [];
  for (let i = 0; i < 5000; i += 10) {
    graph.push([i, costToUsage(i, rate, range)]);
  }
  return graph;
};

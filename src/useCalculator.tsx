import React from "react";
import { DataType, PlotType } from "./types";

export default function useCalculator(init: DataType) {
  const [data, setData] = React.useState<DataType>(init);
  const [calc, setCalc] = React.useState({ usage: "0", cost: "0" });
  const [plotData, setPlotData] = React.useState<PlotType>([]);

  const usageToCost = React.useCallback(
    (usage: number): number => {
      if (isNaN(usage)) {
        return 0;
      }
      let cost = 0;
      for (let i = data.rate.length - 1; i >= 0; i--) {
        const e = data.range[i];
        if (usage > e) {
          const excess = usage - e;
          cost += excess * data.rate[i];
          usage = e;
        }
      }
      return cost;
    },
    [data.range, data.rate],
  );

  const costToUsage = (cost: number): number => {
    if (isNaN(cost)) {
      return 0;
    }
    let usage = 0;
    for (let i = 0; i < data.rate.length; i++) {
      if (cost <= 0) {
        break;
      }
      if (i === data.rate.length - 1) {
        usage += cost / data.rate[i];
        break;
      }
      const max = (data.range[i + 1] - data.range[i]) * data.rate[i];
      if (cost > max) {
        cost -= max;
        usage += data.range[i + 1] - data.range[i];
      } else {
        usage += cost / data.rate[i];
        break;
      }
    }
    return usage;
  };

  const plotGraph = React.useCallback(() => {
    const graph = [];
    const x = [...data.range.filter((n) => !isNaN(n))];
    const max = Math.max(...x);
    if (data.range.at(-1) == 0) {
      x[x.length - 1] = max * 1.2;
    }
    for (const i of x) {
      graph.push({ cost: usageToCost(i), usage: i });
    }
    setPlotData(graph);
  }, [data.range, usageToCost]);

  React.useEffect(() => {
    plotGraph();
  }, [plotGraph]);

  const updateValue = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.type === "keydown" && (e as React.KeyboardEvent).key !== "Enter") {
      return;
    }
    e.currentTarget.blur();
    const { name, value } = e.currentTarget;
    const [type, index] = name.split("-", 2);
    const i = parseInt(index);
    const v = parseFloat(value);
    if (type == "rate") {
      const newRate = data.rate.slice();
      newRate[i] = v || 0;
      if (newRate[i] === data.rate[i]) {
        return;
      }
      setData((prev) => ({
        ...prev,
        rate: newRate,
      }));
      setCalc({ usage: "0", cost: "0" });
    } else if (type == "range") {
      const newRange = data.range.slice();
      newRange[i] = v;
      if (newRange[i] === data.range[i]) {
        return;
      }
      for (let i = 1; i < newRange.length; i++) {
        if (i == newRange.length - 1) {
          // if newRange[i] is NaN, ternary below evaluates false, order is important
          newRange[i] = newRange[i] > newRange[i - 1] ? newRange[i] : 0;
          break;
        }
        if (newRange[i] < newRange[i - 1]) {
          newRange[i] = newRange[i - 1];
        }
      }

      setData((prev) => ({
        ...prev,
        range: newRange,
      }));
      setCalc({ usage: "0", cost: "0" });
    }
    e.currentTarget.value = String(v);
  };

  const updateUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === "unit") {
      setData((prev) => ({
        ...prev,
        unit: value,
      }));
    }
    if (name === "price") {
      setData((prev) => ({
        ...prev,
        price: value,
      }));
    }
  };

  const calculate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const v = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    if (name === "usage") {
      setCalc({
        usage: value,
        cost: String(usageToCost(v)),
      });
    } else if (name === "cost") {
      setCalc({
        usage: String(costToUsage(v)),
        cost: value,
      });
    }
  };

  const makePretty = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.type === "keydown" && (e as React.KeyboardEvent).key !== "Enter") {
      return;
    }
    e.currentTarget.blur();
    const { name, value } = e.currentTarget;
    setCalc((prev) => ({
      ...prev,
      [name]: String(isNaN(parseFloat(value)) ? 0 : parseFloat(value)),
    }));
  };

  const addRow = () => {
    setData((prev) => ({
      ...prev,
      rate: [...prev.rate, 0],
      range: [...prev.range, 0],
    }));
  };

  const deleteRow = () => {
    setData((prev) => ({
      ...prev,
      rate: prev.rate.length > 1 ? prev.rate.slice(0, -1) : [],
      range: prev.range.length > 1 ? prev.range.slice(0, -1) : [],
    }));
  };

  return {
    data,
    plotData,
    calc,
    plotGraph,
    updateUnit,
    updateValue,
    addRow,
    deleteRow,
    calculate,
    makePretty,
  };
}

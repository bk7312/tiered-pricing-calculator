import React from "react";
import { templateData } from "./constants";
import LineGraph from "./Graph";
import useCalculator from "./useCalculator";

function App() {
  const [edit, setEdit] = React.useState(false);

  const {
    data,
    plotData,
    calc,
    updateUnit,
    plotGraph,
    makePretty,
    calculate,
    addRow,
    deleteRow,
    updateValue,
  } = useCalculator(templateData.auIncTax);

  const handleEdit = () => {
    if (edit === true) {
      plotGraph();
    }
    setEdit(!edit);
  };

  return (
    <>
      <div className="flex min-h-full flex-col items-center justify-center p-2 sm:p-4">
        <h1 className="mb-4 text-xl font-semibold sm:text-3xl">
          Tiered Pricing Calculator
        </h1>
        <form className="grid w-full max-w-md grid-cols-3 gap-4 rounded-xl border border-slate-700 p-4 sm:gap-x-2">
          <p className="max-w-32 border-b-1 border-slate-400 px-2 py-1">from</p>
          {edit ? (
            <>
              <input
                value={data.unit}
                onChange={updateUnit}
                id="unit"
                name="unit"
                placeholder="kWh"
                className="max-w-20 rounded-lg px-2 py-1 text-gray-900 outline outline-gray-400 focus-visible:outline-2 focus-visible:outline-blue-500"
              />
              <input
                value={data.price}
                onChange={updateUnit}
                id="price"
                name="price"
                placeholder="$"
                className="max-w-20 rounded-lg px-2 py-1 text-gray-900 outline outline-gray-400 focus-visible:outline-2 focus-visible:outline-blue-500"
              />
            </>
          ) : (
            <>
              <p className="max-w-32 border-b-1 border-slate-400 px-2 py-1">
                to {data.unit ? `(${data.unit})` : ""}
              </p>
              <p className="max-w-32 border-b-1 border-slate-400 px-2 py-1">
                {data.price ? `${data.price}` : "cost"}/
                {data.unit ? `${data.unit}` : "unit"}
              </p>
            </>
          )}

          {data.rate.map((rate, i) => (
            <React.Fragment key={i}>
              <p className="w-32 px-2 py-1">{data.range[i]}</p>
              {edit ? (
                <input
                  type="number"
                  defaultValue={data.range[i + 1]}
                  id={`range-${i + 1}`}
                  name={`range-${i + 1}`}
                  className="max-w-32 rounded-lg px-2 py-1 text-gray-900 outline outline-gray-400 focus-visible:outline-2 focus-visible:outline-blue-500"
                  min={0}
                  onBlur={updateValue}
                  onKeyDown={updateValue}
                />
              ) : (
                <p className="px-2 py-1">{data.range[i + 1] || Infinity}</p>
              )}
              {edit ? (
                <input
                  type="number"
                  defaultValue={rate}
                  id={`rate-${i}`}
                  name={`rate-${i}`}
                  className="max-w-32 rounded-lg px-2 py-1 text-gray-900 outline outline-gray-400 focus-visible:outline-2 focus-visible:outline-blue-500"
                  min={0}
                  onBlur={updateValue}
                  onKeyDown={updateValue}
                />
              ) : (
                <p className="px-2 py-1">{rate}</p>
              )}
            </React.Fragment>
          ))}
        </form>
        <div className="flex w-full max-w-md px-1 pt-4">
          <div className="flex w-full items-center justify-end gap-2">
            {edit ? (
              <>
                <button
                  onClick={addRow}
                  className="w-14 rounded-lg bg-slate-100 py-1 outline disabled:cursor-not-allowed"
                  disabled={!edit}
                >
                  Add
                </button>
                <button
                  onClick={deleteRow}
                  className="w-14 rounded-lg bg-slate-100 py-1 outline disabled:cursor-not-allowed"
                  disabled={!edit}
                >
                  Del
                </button>
              </>
            ) : (
              <div className="flex w-full max-w-md gap-4 justify-self-start">
                <label className="flex items-center gap-2">
                  {data.unit ? `${data.unit}` : "Usage"}{" "}
                  <input
                    value={calc.usage}
                    onChange={calculate}
                    onBlur={makePretty}
                    onKeyDown={makePretty}
                    id="usage"
                    name="usage"
                    disabled={edit}
                    className="w-full max-w-32 rounded-lg px-2 py-1 text-gray-900 outline outline-gray-400 focus-visible:outline-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:bg-slate-200"
                  />
                </label>
                <label className="flex items-center gap-2">
                  {data.price ? `${data.price}` : "Cost"}{" "}
                  <input
                    value={calc.cost}
                    onChange={calculate}
                    onBlur={makePretty}
                    onKeyDown={makePretty}
                    id="cost"
                    name="cost"
                    disabled={edit}
                    className="w-full max-w-32 rounded-lg px-2 py-1 text-gray-900 outline outline-gray-400 focus-visible:outline-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:bg-slate-200"
                  />
                </label>
              </div>
            )}
            <button
              onClick={handleEdit}
              className="w-14 rounded-lg bg-slate-100 py-1 outline"
            >
              {edit ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        <LineGraph data={plotData} unit={data.unit} price={data.price} />
        <footer className="mt-auto">
          <span>A tiered pricing calculator</span> •{" "}
          <a
            href="https://github.com/bk7312/tiered-pricing-calculator"
            target="_blank"
          >
            source
          </a>
        </footer>
      </div>
    </>
  );
}

export default App;

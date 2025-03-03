import React from "react";
// import { costToUsage, getPlot, usageToCost } from "./utils";

type DataType = {
  rate: number[];
  range: number[];
  undo: { action: string; value: number }[];
};

function App() {
  const [edit, setEdit] = React.useState(false);
  const [data, setData] = React.useState<DataType>({
    rate: [0.01, 0.08, 0.1, 0.12],
    range: [0, 600, 2000, 4000],
    undo: [],
  });

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleEdit = () => {
    if (edit == true) {
      updateForm();
    }
    setEdit(!edit);
  };

  const updateForm = (): boolean => {
    if (formRef.current) {
      const formElements = formRef.current.elements;
      const dataCopy: DataType = JSON.parse(JSON.stringify(data));
      for (const element of formElements) {
        if (element instanceof HTMLInputElement && element.name) {
          const [type, index] = element.name.split("-", 2);
          const i = Number(index);
          // dataCopy[(type as "rate") || "range"][i] = parseFloat(element.value);
          if (type == "rate") {
            dataCopy.rate[i] = parseFloat(element.value);
          } else if (type == "range") {
            dataCopy.range[i] = parseFloat(element.value);
          }
        }
      }
      setData(dataCopy);
      return true;
    }
    return true;
  };

  return (
    <>
      <div className="flex min-h-full flex-col items-center justify-center border p-2 sm:p-4">
        <h1 className="mb-6 text-xl font-semibold sm:text-3xl">
          Tiered Pricing Calculator
        </h1>
        <div>
          <div className="flex justify-between border p-2 sm:p-6">
            <p>from - to - price/percentage</p>
            <button onClick={handleEdit}>{edit ? "Save" : "Edit"}</button>
          </div>
          <form
            className="grid grid-cols-3 gap-x-1 gap-y-2 border p-4 sm:gap-x-2"
            ref={formRef}
          >
            <p>From</p>
            <p>To</p>
            <p>Price per unit</p>
            {data.rate.map((rate, i) => (
              <React.Fragment key={i}>
                <p>{data.range[i]}</p>
                {edit ? (
                  <input
                    type="number"
                    defaultValue={data.range[i + 1]}
                    id={`range-${i + 1}`}
                    name={`range-${i + 1}`}
                    className="bg-red-200"
                  />
                ) : (
                  <p>{data.range[i + 1] || Infinity}</p>
                )}
                {edit ? (
                  <input
                    type="number"
                    defaultValue={rate}
                    id={`rate-${i}`}
                    name={`rate-${i}`}
                    className="bg-red-200"
                    min={0}
                  />
                ) : (
                  <p>{rate}</p>
                )}
              </React.Fragment>
            ))}
          </form>
        </div>
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

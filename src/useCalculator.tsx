// import React from "react";

// type DataType = {
//   rate: string[];
//   range: string[];
// };

// function useCalculator() {
//   const [data, setData] = React.useState<DataType>({
//     rate: ["0.01", "0.08", "0.1", "0.12"],
//     range: ["0", "600", "2000", "4000"],
//   });

//   const updateForm = () => {
//     if (formRef.current) {
//       const formElements = formRef.current.elements;
//       const dataCopy: DataType = JSON.parse(JSON.stringify(data));
//       for (const element of formElements) {
//         if (element instanceof HTMLInputElement && element.name) {
//           const [type, index] = element.name.split("-", 2);
//           const i = Number(index);
//           console.log(index, i, element.name);
//           if (type == "rate") {
//             dataCopy.rate[i] = element.value;
//             console.log("rate", dataCopy.rate[i], element.value, dataCopy.rate);
//           } else if (type == "range") {
//             dataCopy.range[i] = element.value;
//           }
//         }
//       }
//       console.log(dataCopy, data);
//       setData(dataCopy);
//     }
//   };

//   return {
//     data,
//     updateData
//   };
// }

// export default useCalculator;

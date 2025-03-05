export type DataType = {
  name: string;
  rate: number[];
  range: number[];
  unit: string;
  price: string;
  src: string;
};

export type PlotType = {
  usage: number;
  cost: number;
}[];

import { DataType } from "./types";

export const templateData: Record<string, DataType> = {
  bnElec: {
    name: "Brunei residential electricity pricing",
    rate: [0.01, 0.08, 0.1, 0.12],
    range: [0, 600, 2000, 4000, 0],
    unit: "kWh",
    price: "$",
    src: "https://www.des.gov.bn/SitePages/tariff.aspx",
  },
  myElec: {
    name: "Malaysia TNB residential electricity pricing",
    rate: [0.218, 0.334, 0.516, 0.546, 0.571],
    range: [0, 200, 300, 600, 900, 0],
    unit: "kWh",
    price: "MYR",
    src: "https://www.tnb.com.my/residential/pricing-tariffs",
  },
  auIncTax: {
    name: "Australia Income Tax for residents 2025",
    rate: [0, 0.16, 0.3, 0.37, 0.45],
    range: [0, 18200, 45000, 135000, 190000, 0],
    unit: "AUD",
    price: "%",
    src: "https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents#ato-Australianresidenttaxrates2020to2025",
  },
  empty: {
    name: "",
    rate: [],
    range: [],
    unit: "",
    price: "",
    src: "",
  },
};

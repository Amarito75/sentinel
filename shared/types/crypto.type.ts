export type Crypto = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  change: number;
  marketCap: number;
  volume: number;
};

export type Exchange = {
  id: string;
  type: "Add" | "Sell";
  date: string;
  price: number;
  tokenFrom: number;
  tokenTo: number;
  quantity: number;
};

import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_CRYPTO_API_KEY;
const baseUrl =
  "https://min-api.cryptocompare.com/data/asset/v1/data/by/symbol";

export async function getCoinList() {
  try {
    const response = await axios.get(
      `https://min-api.cryptocompare.com/data/blockchain/list?api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching coin list:", error);
    throw error;
  }
}

export async function getAssetsBySymbol(symbol: string) {
  try {
    const response = await axios.get(
      `https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=${symbol}&api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching coin list:", error);
    throw error;
  }
}

export async function getAssetBySymbol(symbol: string) {
  try {
    const response = await axios.get(
      `${baseUrl}?asset_symbol=${symbol}&api_key=${apiKey}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching asset data:", error);
    throw error;
  }
}

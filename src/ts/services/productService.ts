import axios from "axios";
import { IProduct } from "../models/IProduct";

export const getProducts = async (searchText: string) => {
  try {
    const response = await axios.get<IProduct[]>(
      `https://medieinstitutet-wie-products.azurewebsites.net/api/search?searchtext=${searchText}`
    );

    if (response.status === 200) {
      return response.data;
    }

    return [];
  } catch (err) {
    throw err;
  }
};

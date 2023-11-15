import { IProduct } from "./models/IProduct";

export const productSort = (movies: IProduct[], desc: boolean = true) => {
  return movies.sort((a: IProduct, b: IProduct) => {
    if (desc) {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;

      return 0;
    } else {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;

      return 0;
    }
  });
};

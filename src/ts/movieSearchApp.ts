import { IProduct } from "./models/IProduct";
import { getProducts } from "./services/productService";

let products: IProduct[] = [];

export const init = () => {
  document
    .getElementById("searchform")
    ?.addEventListener("submit", (e: SubmitEvent) => {
      e.preventDefault();
      handleSearch();
    });

  const sortButton = document.getElementById("sort") as HTMLButtonElement;
  sortButton.classList.toggle("invisible");
};

const handleSearch = async () => {
  let searchText = (document.getElementById("searchText") as HTMLInputElement)
    .value;

  let container: HTMLDivElement = document.getElementById(
    "searchresult"
  ) as HTMLDivElement;

  container.innerHTML = "";

  try {
    products = await getProducts(searchText);

    if (products.length > 0) {
      (document.getElementById("sort") as HTMLButtonElement).classList.toggle(
        "invisible"
      );
      createHtml(products, container);
    } else {
      displayNoResult(container);
    }
  } catch {
    displayNoResult(container);
  }
};

export const createHtml = (products: IProduct[], container: HTMLDivElement) => {
  for (let i = 0; i < products.length; i++) {
    let movie = document.createElement("div");
    let title = document.createElement("h3");
    const imageContainer = document.createElement("div");
    let img = document.createElement("img");

    movie.classList.add("movie");

    title.className = "movie__title";
    title.innerHTML = products[i].name;

    imageContainer.className = "movie__image";
    img.src = products[i].imageUrl;
    img.alt = products[i].name;

    imageContainer.appendChild(img);
    movie.appendChild(title);
    movie.appendChild(imageContainer);

    container.appendChild(movie);
  }
};

export const displayNoResult = (container: HTMLDivElement) => {
  let noMessage = document.createElement("p");

  noMessage.innerHTML = "Inga sökresultat att visa";

  container.appendChild(noMessage);
};

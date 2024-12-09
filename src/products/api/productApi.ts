import axios from "axios";

const productApi = axios.create({
  baseURL: "https://fuzzy-space-telegram-9wxqjv9gwrh7x4x-3100.app.github.dev",
});

export { productApi };

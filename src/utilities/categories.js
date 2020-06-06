import { createContext } from "react";

let categories = { currentValue: "%", success: false, data: [] };
const CategoryContext = createContext(categories);

fetch("/categories")
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      categories = {
        currentValue: "%",
        success: false,
        data: [],
      };
    }
  })
  .then(
    (data) =>
      (categories = {
        currentValue: "%",
        success: true,
        data,
      })
  )
  .catch(
    () =>
      (categories = {
        currentValue: "%",
        success: false,
        data: [],
      })
  );

export default CategoryContext;

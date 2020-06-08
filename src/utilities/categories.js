import { createContext, useState, useEffect } from "react";

const CategoryContext = createContext();

const useCategories = () => {
  const [categories, setCategories] = useState({
    currentValue: "%",
    success: false,
    data: [],
  });
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          setCategories((prevState) => ({
            ...prevState,
            success: false,
            data: [],
          }));
        }
      })
      .then((data) =>
        setCategories((prevState) => ({
          ...prevState,
          success: true,
          data,
        }))
      )
      .catch(() =>
        setCategories((prevState) => ({
          ...prevState,
          success: false,
          data: [],
        }))
      );
  }, []);
  return { categories, setCategories };
};

export default CategoryContext;
export { useCategories };

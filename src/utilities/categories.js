import { useState, useEffect } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState({
    data: [],
    success: false,
    currentValue: "%",
  });

  useEffect(() => {
    fetch("/categories")
      .then((data) => data.json())
      .then((json) => {
        if (json.success) {
          setCategories((prevState) => ({
            ...prevState,
            data: json.data,
            success: true,
          }));
        } else {
          setCategories((prevState) => ({
            ...prevState,
            data: [],
            success: false,
          }));
        }
      })
      .catch(() =>
        setCategories((prevState) => ({
          ...prevState,
          data: [],
          success: false,
        }))
      );
  }, []);

  return [categories, setCategories];
};

export default useCategories;

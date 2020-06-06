import { useState, useEffect } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState({
    data: [],
    success: false,
    currentValue: "%",
  });

  useEffect(() => {
    fetch("/categories")
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
        setCategories((prevState) => ({ ...prevState, success: true, data }))
      )
      .catch(() =>
        setCategories((prevState) => ({
          ...prevState,
          success: false,
          data: [],
        }))
      );
  }, []);

  return [categories, setCategories];
};

export default useCategories;

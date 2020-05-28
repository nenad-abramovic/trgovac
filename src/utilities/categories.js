import { useState, useEffect } from "react";

const useCategories = () => {
  const message = "Грешка при добављању категорија са сервера.";
  const [categories, setCategories] = useState({
    message,
    success: false,
  });

  const getCategories = () => {
    fetch("/categories")
      .then((data) => data.json())
      .then((json) => {
        if (json.success) {
          setCategories({ data: json.data, success: true });
        } else {
          setCategories({ message, success: false });
        }
      })
      .catch(() => setCategories({ message, success: false }));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
};

export default useCategories;

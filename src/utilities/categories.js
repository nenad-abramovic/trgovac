import { useState, useEffect } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/categories')
      .then(data => data.json())
      .then(json => {
        if (json.success) {
          setCategories(json.data);
        } else {
          setCategories(['Нема категорија...']);
        }
      })
      .catch(() => setCategories(['Нема категорија...']));
  }, []);

  return categories;
}

export default useCategories;
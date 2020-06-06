import React from "react";
import styles from "./CategoryList.module.css";
import useCategories from "../utilities/categories";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useCategories();

  const handleClick = (currentValue) => {
    setCategories((prevState) => ({
      ...prevState,
      currentValue,
    }));
  };

  return (
    <nav className={styles.categories}>
      <h3 className={styles.title}>Категорије</h3>
      <ul>
        {categories.success ? (
          categories.data.map((category) => (
            <li key={category.category_uuid}>
              <Link to="/" onClick={() => handleClick(category.name)}>
                {category.name}
              </Link>
            </li>
          ))
        ) : (
          <li>Нема категорија...</li>
        )}
      </ul>
    </nav>
  );
};

export default CategoryList;

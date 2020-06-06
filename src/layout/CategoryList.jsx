import React, { useContext } from "react";
import styles from "./CategoryList.module.css";
import CategoryContext from "../utilities/categories";
import { useHistory } from "react-router-dom";

const CategoryList = () => {
  const history = useHistory();
  const { categories, setCategories } = useContext(CategoryContext);

  const handleClick = (currentValue) => {
    setCategories((prevState) => ({ ...prevState, currentValue }));
    history.push("/");
  };

  return (
    <nav className={styles.categories}>
      <h3 className={styles.title}>Категорије</h3>
      <ul>
        {categories.success ? (
          categories.data.map((category) => (
            <li
              key={category.category_uuid}
              onClick={() => handleClick(category.name)}
            >
              {category.name}
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

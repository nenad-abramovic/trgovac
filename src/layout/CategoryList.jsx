import React from "react";
import styles from "./CategoryList.module.css";
import useCategories from "../utilities/categories";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const categories = useCategories();

  return (
    <nav className={styles.categories}>
      <h3 className={styles.title}>категорије</h3>
      <ul>
        {categories.success ? (
          categories.data.map((category) => (
            <li>
              <Link
                to={{ pathname: "/", state: { category: category.name } }}
                key={category.category_uuid}
              >
                {category.name}
              </Link>
            </li>
          ))
        ) : (
          <li>{categories.message}</li>
        )}
      </ul>
    </nav>
  );
};

export default CategoryList;

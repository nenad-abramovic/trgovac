import React from 'react';
import styles from './CategoryList.module.css';
import useCategories from '../utilities/categories';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const categories = useCategories();
  return (
    <nav className={styles.categories}>
      <h3 className={styles.title}>категорије</h3>
      <ul>
        {
          categories.map(category => (
            <Link to={{pathname:'/', state: { category: category.name }}} key={category.category_uuid}>{category.name}</Link>
          ))
        }
      </ul>
    </nav>
  );
}

export default CategoryList;